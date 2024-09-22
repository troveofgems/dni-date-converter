import Big from "big.js";
import DniGorahyan from "../index";

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
    dniGorahyan.tests = mountTestMethods(dniGorahyan);

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
                  fromSystem: {
                      utc: "",
                      cavern: "",
                      local: ""
                  },
                  outputType: 0
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
                        pahrtahvo: Big(0),
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
                        pahrtahvo: 0,
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
                    fromSystem: "",
                    outputType: 0
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
        },
        outputSettings: {
            useDniFontMapping: false,
            includeNthBell: true,
            timestampFormat: 0, // Default Trove of Gems D'ni DateTime Format
        }
    };
}
function mountConverterMethods(dniGorahyan: DniGorahyan) {
    return  {
        surfaceToCavern: convertSurfaceTimestampToDniCavernTimestamp(dniGorahyan),
        cavernToSurface: convertCavernTimestampToSurfaceTimestamps(dniGorahyan)
    };
}
function mountTestMethods(dniGorahyan: DniGorahyan) {
    const
        runControlTests = () => {
            const _storeResults = function(testResult: any, testNumber: string) {
                dniGorahyan.nthControlTestResult = {
                    testResult,
                    testNumber
                };
            }

            const
                utils = UtilsLib(),
                testStart = new Date(),
                {
                   firstControlTestValue, secondControlTestValue, thirdControlTestValue,
                   fourthControlTestValue, fifthControlTestValue, sixthControlTestValue,
                } = dniGorahyan.gorahyan.dniConstants.controls.tests;

            let
                first_test:     DniGorahyan | string | null = new DniGorahyan(),
                second_test:    DniGorahyan | string | null = new DniGorahyan(),
                third_test:     DniGorahyan | string | null = new DniGorahyan(),
                fourth_test:    DniGorahyan | string | null = new DniGorahyan(),
                fifth_test:     DniGorahyan | string | null = new DniGorahyan(),
                sixth_test:     DniGorahyan | string | null = new DniGorahyan(),
                seventh_test:   DniGorahyan | string | null = new DniGorahyan(),
                eighth_test:    DniGorahyan | string | null = new DniGorahyan(),
                ninth_test:     DniGorahyan | string | null = new DniGorahyan(),
                tenth_test:     DniGorahyan | string | null = new DniGorahyan(),
                eleventh_test:  DniGorahyan | string | null = new DniGorahyan(),
                twelfth_test:   DniGorahyan | string | null = new DniGorahyan();

            // Run All Default Class Tests
            let first_test_result = first_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(first_test_result.systemProvidedSurfaceTS, "first");

            let second_test_result = second_test.converters.surfaceToCavern(secondControlTestValue);
            _storeResults(second_test_result.systemProvidedSurfaceTS, "second");

            let third_test_result = third_test.converters.surfaceToCavern(thirdControlTestValue);
            _storeResults(third_test_result.systemProvidedSurfaceTS, "third");

            let fourth_test_result = fourth_test.converters.cavernToSurface(fourthControlTestValue);
            _storeResults(fourth_test_result.systemProvidedCavernTS, "fourth");

            let fifth_test_result = fifth_test.converters.cavernToSurface(fifthControlTestValue);
            _storeResults(fifth_test_result.systemProvidedCavernTS, "fifth");

            let sixth_test_result = sixth_test.converters.cavernToSurface(sixthControlTestValue);
            _storeResults(sixth_test_result.systemProvidedCavernTS, "sixth");

            // Test Class Option Changes - Timestamp Formats
            seventh_test.switchTimestampFormatter(1);
            let seventh_test_result = seventh_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(seventh_test_result.systemProvidedSurfaceTS, "seventh");

            eighth_test.switchTimestampFormatter(2);
            let eighth_test_result = eighth_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(eighth_test_result.systemProvidedSurfaceTS, "eighth");

            // Test Class Option Changes - Font Formats
            ninth_test.useDniFontMapping = true;
            let ninth_test_result = ninth_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(ninth_test_result.systemProvidedSurfaceTS, "ninth");

            tenth_test.useDniFontMapping = true;
            tenth_test.switchTimestampFormatter(1);
            let tenth_test_result = tenth_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(tenth_test_result.systemProvidedSurfaceTS, "tenth");

            eleventh_test.useDniFontMapping = true;
            eleventh_test.switchTimestampFormatter(2);
            let eleventh_test_result = eleventh_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(eleventh_test_result.systemProvidedSurfaceTS, "eleventh");

            // Test Default Switch
            twelfth_test.switchTimestampFormatter(3); // Invalid Type
            twelfth_test.includeNthBell = true;
            let twelfth_test_result = twelfth_test.converters.surfaceToCavern(firstControlTestValue);
            _storeResults(twelfth_test_result.systemProvidedSurfaceTS, "twelfth");

            dniGorahyan.runtimeMetrics = utils.calculateElapsedRuntimeOfControlTests(testStart, new Date());
            Object.freeze(dniGorahyan.gorahyan.dniConstants.controls.tests.results);

            return dniGorahyan;
        },
        simulateCatastrophicInitFailure = () => {
            // @ts-ignore
            dniGorahyan.gorahyan = null;
            throw new Error("Class Init Failed. Unable to set methods or properties");
        }

    return  {
        runControlTests,
        simulateCatastrophicInitFailure
    };
}