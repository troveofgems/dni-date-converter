import Big from "big.js";
import {DniGorahyan} from "../index";
import {GorahyanInterface} from "../interfaces/gorahyan.interface";

// Functions Called During Init
import DniDateTimeConstants from "../constants/dni.date.constants";
import {attachLeapSecondData} from "./leap.second.lib";

// Functions Attached During Init
import convertSurfaceTimestampToDniCavernTimestamp, { setSurfaceTimeArtifactsByString } from "./surface.converter.lib";
import convertCavernTimestampToSurfaceTimestamps from "./cavern.converter.lib";

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
    dniGorahyan.converters = setConverterMethods(dniGorahyan.gorahyan);

    // Set The Test Methods
    dniGorahyan.tests = setTestMethods(dniGorahyan.gorahyan);

    testForFailedInit(dniGorahyan);

    return dniGorahyan;
}

export function testForFailedInit(dniGorahyan: DniGorahyan, jestForceError = false): Error | void {
    if(!dniGorahyan.gorahyan || !dniGorahyan.converters || !dniGorahyan.tests || jestForceError) {
        throw new Error("Class Init Failed. Unable to set methods or properties");
    }
}
function setGorahyan() {
    const
        _leapSeconds = attachLeapSecondData(),
        dniConstants = DniDateTimeConstants(),
        gorahyan = {
            _leapSeconds,
            dniConstants,
            cavern: {
                convertedTimestamp: ""
            },
            surface: {
                currentTS: new Date()
            },
            conversionArtifacts: {
                cavern: {
                    bigs: {
                        hahr: Big(0),
                        vailee: {
                            id: Big(0),
                            text: "",
                            dniFontMappingText: ""
                        },
                        yahr: Big(0),
                        gartahvo: Big(0),
                        tahvo: Big(0),
                        gorahn: Big(0),
                        prorahn: Big(0),
                        timeDeltasCalculated: {
                            earthDelta: Big(0),
                            hahrShiftedDelta: Big(0),
                            prorahnteeDelta: Big(0),
                            vaileeShiftedDelta: Big(0),
                            yahrShiftedDelta: Big(0),
                            gartahvoShiftedDelta: Big(0),
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
                        gartahvo: 0,
                        tahvo: 0,
                        gorahn: 0,
                        prorahn: 0,
                        timeDeltasCalculated: {
                            earthDelta: 0,
                            hahrShiftedDelta: 0,
                            prorahnteeDelta: 0,
                            vaileeShiftedDelta: 0,
                            yahrShiftedDelta: 0,
                            gartahvoShiftedDelta: 0,
                            tahvoShiftedDelta: 0,
                            gorahnShiftedDelta: 0
                        }
                    }
                },
                surface: {
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
        },
        { earthConvergenceDateTimeString } = dniConstants.dates.calendarConvergence,
        elapsedSecondsAtConvergence = setSurfaceTimeArtifactsByString(earthConvergenceDateTimeString, gorahyan);

    // Set Surface Date Time Convergence Artifacts
    gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence =
        Big(elapsedSecondsAtConvergence);
    gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence =
        elapsedSecondsAtConvergence;

    return  gorahyan;
}
function setConverterMethods(gorahyan: GorahyanInterface) {
    return  {
        surfaceToCavern: convertSurfaceTimestampToDniCavernTimestamp(gorahyan),
        cavernToSurface: convertCavernTimestampToSurfaceTimestamps(gorahyan)
    };
}
function setTestMethods(gorahyan: GorahyanInterface) {
    const
        runControlTests = () => {
            const
                testStart = new Date(),
                {
                    earthConvergenceDateTimeString: FIRST_CONTROL_TEST_VALUE
                } = gorahyan.dniConstants.dates.calendarConvergence,
                SECOND_CONTROL_TEST_VALUE = new Date(FIRST_CONTROL_TEST_VALUE),
                THIRD_CONTROL_TEST_VALUE = null,
                FOURTH_CONTROL_TEST_VALUE = "Leefo 1 9647 DE 0:00:00:00",
                FIFTH_CONTROL_TEST_VALUE = "Leevofo 8 9798 DE 2:13:00:00",
                SIXTH_CONTROL_TEST_VALUE = "Leevosahn 5 9000 BE 1:05:06:07";

            // Use: Surface DateTime String
            let
                first_test: DniGorahyan | string | null = new DniGorahyan(),
                first_test_results = first_test.converters.surfaceToCavern(FIRST_CONTROL_TEST_VALUE);

            let
                second_test: DniGorahyan | string | null = new DniGorahyan(),
                second_test_results = second_test.converters.surfaceToCavern(SECOND_CONTROL_TEST_VALUE);

            let
                third_test: DniGorahyan | string | null = new DniGorahyan(),
                third_test_results = third_test.converters.surfaceToCavern(THIRD_CONTROL_TEST_VALUE);

            let
                fourth_test: DniGorahyan | string | null = new DniGorahyan(),
                fourth_test_results = fourth_test.converters.cavernToSurface(FOURTH_CONTROL_TEST_VALUE);

            let
                fifth_test: DniGorahyan | string | null = new DniGorahyan(),
                fifth_test_results = fifth_test.converters.cavernToSurface(FIFTH_CONTROL_TEST_VALUE);

            let
                sixth_test: DniGorahyan | string | null = new DniGorahyan(),
                sixth_test_results = sixth_test.converters.cavernToSurface(SIXTH_CONTROL_TEST_VALUE);

            const runtimeMetrics = calculateElapsedRuntimeOfControlTests(testStart, new Date());

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
function calculateElapsedRuntimeOfControlTests(testStart: Date, testEnd: Date) {
    const
        elapsedTimeInMS = testEnd.getTime() - testStart.getTime(),
        seconds = Math.floor(elapsedTimeInMS / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        elapsedTimeMessage = `Elapsed time to run tests: ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${elapsedTimeInMS} milliseconds`;

    return {
        elapsedTimeMessage,
        elapsedTimeInMS,
        hours,
        minutes,
        seconds
    }
}