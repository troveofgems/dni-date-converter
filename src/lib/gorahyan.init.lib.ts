import Big from "big.js";
import {DniGorahyan} from "../index";
import {GorahyanInterface} from "../interfaces/gorahyan.interface";

// Functions Called During Init
import DniGorahyanConstants from "../constants/dni.date.constants";
import {attachLeapSecondData} from "./leap.second.lib";

// Functions Attached During Init
import convertSurfaceTimestampToDniCavernTimestamp, {setSurfaceTimeArtifactsByString} from "./surface.converter.lib";
import convertCavernTimestampToSurfaceTimestamps from "./cavern.converter.lib";
import UtilsLib from "./utils.lib";

/** Initializes the request for a DniGorahyan Object.
 *
 * @param dniGorahyan
 *
 * @description
 * - Sets D'ni Time Conversion Constants & Initial Values, Processes the LeapEpoch List, and sets D'ni Calendar
 * Convergence DateTime Artifacts based on the Gregorian Date Constant
 * - Attaches the Class Converter and Test Methods
 */
export function init(dniGorahyan: DniGorahyan): DniGorahyan {
    // Set the Gorahyan
    dniGorahyan.gorahyan = setGorahyan();

    // Set The Converter Methods
    dniGorahyan.converters = mountConverterMethods(dniGorahyan);

    // Set The Test Methods
    dniGorahyan.tests = mountTestMethods(dniGorahyan.gorahyan);

    // Run Convergence Conversion
    const {
        STRING_CONSTANT: EARTH_CALENDAR_CONVERGENCE_STRING
    } = dniGorahyan.gorahyan.dniConstants.controls.calendarConvergence.earth;
    dniGorahyan.elapsedTimeAtConvergence = setSurfaceTimeArtifactsByString(EARTH_CALENDAR_CONVERGENCE_STRING, dniGorahyan);

    return dniGorahyan;
}

function setGorahyan() {
    const
        _leapSeconds = attachLeapSecondData(),
        dniConstants = DniGorahyanConstants();

    return {
        _leapSeconds,
        dniConstants,
        timestampArtifacts: {
            cavern: {
                providedTimestamps: {
                  byUser: "",
                  fromSystem: {}
                },
                bigs: {
                        hahr: Big(0),
                        vailee: {
                            id: Big(0),
                            text: "",
                            dniFontMappingText: ""
                        },
                        yahr: Big(0),
                        gahrtahvo: Big(0),
                        tahvo: Big(0),
                        gorahn: Big(0),
                        prorahn: Big(0),
                        timeDeltasCalculated: {
                            earthDelta: Big(0),
                            hahrShiftedDelta: Big(0),
                            prorahnteeDelta: Big(0),
                            vaileeShiftedDelta: Big(0),
                            yahrShiftedDelta: Big(0),
                            gahrtahvoShiftedDelta: Big(0),
                            tahvoShiftedDelta: Big(0),
                            gorahnShiftedDelta: Big(0)
                        }
                    },
                readonly: {
                        hahr: 0,
                        vailee: {
                            id: 0,
                            text: "",
                            dniFontMappingText: ""
                        },
                        yahr: 0,
                        gahrtahvo: 0,
                        tahvo: 0,
                        gorahn: 0,
                        prorahn: 0,
                        timeDeltasCalculated: {
                            earthDelta: 0,
                            hahrShiftedDelta: 0,
                            prorahnteeDelta: 0,
                            vaileeShiftedDelta: 0,
                            yahrShiftedDelta: 0,
                            gahrtahvoShiftedDelta: 0,
                            tahvoShiftedDelta: 0,
                            gorahnShiftedDelta: 0
                        }
                    }
            },
            surface: {
                providedTimestamps: {
                  byUser: "",
                  fromSystem: ""
                },
                bigs: {
                        year: Big(0),
                        month: {
                            id: Big(0),
                            text: ""
                        },
                        day: Big(0),
                        hour: Big(0),
                        minute: Big(0),
                        second: Big(0),
                        millisecond: Big(0),
                        timeDeltas: {
                            elapsedSecondsAtConvergence: Big(0),
                            elapsedSecondsForGivenDate: Big(0)
                        }
                    },
                readonly: {
                        year: 0,
                        month: {
                            id: 0,
                            text: ""
                        },
                        day: 0,
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0,
                        timeDeltas: {
                            elapsedSecondsAtConvergence: 0,
                            elapsedSecondsForGivenDate: 0
                        }
                    }
            }
        }
    };
}
function mountConverterMethods(dniGorahyan: DniGorahyan) {
    return  {
        surfaceToCavern: convertSurfaceTimestampToDniCavernTimestamp(dniGorahyan),
        cavernToSurface: convertCavernTimestampToSurfaceTimestamps(dniGorahyan)
    };
}
function mountTestMethods(gorahyan: GorahyanInterface) {
    const
        runControlTests = () => {
            const
                utils = UtilsLib(),
                testStart = new Date(),
                {
                   firstControlTestValue, secondControlTestValue, thirdControlTestValue,
                   fourthControlTestValue, fifthControlTestValue, sixthControlTestValue
                } = gorahyan.dniConstants.controls.tests;

            // Use: Surface DateTime String
            let
                first_test: DniGorahyan | string | null = new DniGorahyan(),
                first_test_results = first_test.converters.surfaceToCavern(firstControlTestValue);

            let
                second_test: DniGorahyan | string | null = new DniGorahyan(),
                second_test_results = second_test.converters.surfaceToCavern(secondControlTestValue);

            let
                third_test: DniGorahyan | string | null = new DniGorahyan(),
                third_test_results = third_test.converters.surfaceToCavern(thirdControlTestValue);

            let
                fourth_test: DniGorahyan | string | null = new DniGorahyan(),
                fourth_test_results = fourth_test.converters.cavernToSurface(fourthControlTestValue);

            let
                fifth_test: DniGorahyan | string | null = new DniGorahyan(),
                fifth_test_results = fifth_test.converters.cavernToSurface(fifthControlTestValue);

            let
                sixth_test: DniGorahyan | string | null = new DniGorahyan(),
                sixth_test_results = sixth_test.converters.cavernToSurface(sixthControlTestValue);

            const runtimeMetrics = utils.calculateElapsedRuntimeOfControlTests(testStart, new Date());

            return {
                runtimeMetrics,
                generated: {
                    first_test_results,
                    second_test_results,
                    third_test_results,
                    fourth_test_results,
                    fifth_test_results,
                    sixth_test_results
                }
            };
        },
        simulateCatastrophicInitFailure = () => {
            // @ts-ignore
            gorahyan = null;
            throw new Error("Class Init Failed. Unable to set methods or properties");
        }

    return  {
        runControlTests,
        simulateCatastrophicInitFailure
    };
}