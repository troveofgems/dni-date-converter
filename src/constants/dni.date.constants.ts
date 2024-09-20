import Big from 'big.js';
import "./date.constants";
import {DniDatetimeConstantsInterface} from "../interfaces/dni.datetime.constants.interface";
import {
    CONVERGENCE_YEAR,
    CONVERGENCE_MONTH,
    CONVERGENCE_DAY,
    CONVERGENCE_HOUR,
    CONVERGENCE_MINUTE,
    CONVERGENCE_SECOND,
    EARTH_CONVERGENCE_DATE_STRING,
    DNI_CONVERGENCE_DATE_STRING,
    DNI_HAHR_CONVERGENCE_START,
    EARTH_MS_PER_DNI_HAHR,
    EARTH_MS_PER_PRORAHN,
    PRORAHNTEE_ELAPSED_SINCE_CONVERGENCE,
    EARTH_MS_ELAPSED_SINCE_CONVERGENCE,
    PRORAHNTEE_PER_HAHR,
    HAHR_SHIFT,
    VAILEE_SHIFT,
    YAHR_SHIFT,
    GAHRTAHVO_SHIFT,
    PAHRTAHVO_SHIFT,
    TAHVO_SHIFT,
    GORAHN_SHIFT,
    FIRST_CONTROL_TEST_VALUE,
    SECOND_CONTROL_TEST_VALUE,
    THIRD_CONTROL_TEST_VALUE,
    FOURTH_CONTROL_TEST_VALUE,
    FIFTH_CONTROL_TEST_VALUE,
    SIXTH_CONTROL_TEST_VALUE,
    PRORAHN_MIN,
    PRORAHN_MAX,
    GORAHN_MIN,
    GORAHN_MAX,
    TAHVO_MIN,
    TAHVO_MAX,
    GAHRTAHVO_MIN,
    GAHRTAHVO_MAX,
    YAHR_MIN,
    YAHR_MAX,
    VAILEE_MIN,
    VAILEE_MAX,
    PAHRTAHVO_MIN,
    PAHRTAHVO_MAX,
    DNI_HOLIDAY_NEW_YEAR,
    DNI_HOLIDAY_FIRST_FEAST_OF_THE_MAKER,
    DNI_HOLIDAY_COMMON_LIBRARY_OPENING,
    DNI_HOLIDAY_SECOND_FEAST_OF_THE_MAKER,
    DNI_HOLIDAY_DAY_OF_DANCING,
    DNI_HOLIDAY_FIRST_ARRIVAL_OF_THE_GREAT_KING,
    DNI_HOLIDAY_THIRD_FEAST_OF_THE_MAKER,
    DNI_HOLIDAY_CORONATION_OF_KING_KERATH,
    DNI_HOLIDAY_DESC__FEAST_OF_THE_MAKER,
    DNI_HOLIDAY_DESC__DNI_NEW_YEAR,
    DNI_HOLIDAY_DESC__COMMON_LIBRARY_OPENING,
    DNI_HOLIDAY_DESC__DAY_OF_DANCING,
    DNI_HOLIDAY_DESC__FIRST_ARRIVAL_OF_THE_GREAT_KING,
    DNI_HOLIDAY_DESC__CORONATION_OF_KING_KERATH,
    THE_FALL,
    THE_FALL__DESC
} from "./date.constants";

export default function DniGorahyanConstants(): DniDatetimeConstantsInterface {
    const convergenceTimes = setConvergenceTimes();
    return {
        controls: {
            calendarConvergence: {
                dni: {
                    STRING_CONSTANT: DNI_CONVERGENCE_DATE_STRING
                },
                earth: {
                    STRING_CONSTANT: EARTH_CONVERGENCE_DATE_STRING,
                    DATE_CONSTANT: new Date(EARTH_CONVERGENCE_DATE_STRING),
                    convergenceTimes
                }
            },
            constants: {
                bigs: {
                    msPerHahr: Big(EARTH_MS_PER_DNI_HAHR),
                    refDniHahr: Big(DNI_HAHR_CONVERGENCE_START),
                    prorahnteePerHahr: Big(PRORAHNTEE_PER_HAHR),
                    refProrahnteePerHahr: Big(PRORAHNTEE_ELAPSED_SINCE_CONVERGENCE),
                    msPerProrahn: Big(EARTH_MS_PER_PRORAHN),
                    msElapsedSinceConvergence: Big(EARTH_MS_ELAPSED_SINCE_CONVERGENCE),
                    deltas: {
                        hahrShift: Big(HAHR_SHIFT),
                        vaileeShift: Big(VAILEE_SHIFT),
                        yahrShift: Big(YAHR_SHIFT),
                        gahrtahvoShift: Big(GAHRTAHVO_SHIFT),
                        pahrtahvoShift: Big(PAHRTAHVO_SHIFT),
                        tahvoShift: Big(TAHVO_SHIFT),
                        gorahnShift: Big(GORAHN_SHIFT)
                    }
                },
                readonly: {
                    msPerHahr: EARTH_MS_PER_DNI_HAHR,
                    refDniHahr: DNI_HAHR_CONVERGENCE_START,
                    prorahnteePerHahr: PRORAHNTEE_PER_HAHR,
                    refProrahnteePerHahr: PRORAHNTEE_ELAPSED_SINCE_CONVERGENCE,
                    msPerProrahn: EARTH_MS_PER_PRORAHN,
                    msElapsedSinceConvergence: EARTH_MS_ELAPSED_SINCE_CONVERGENCE,
                    deltas: {
                        hahrShift: HAHR_SHIFT,
                        vaileeShift: VAILEE_SHIFT,
                        yahrShift: YAHR_SHIFT,
                        gahrtahvoShift: GAHRTAHVO_SHIFT,
                        pahrtahvoShift: PAHRTAHVO_SHIFT,
                        tahvoShift: TAHVO_SHIFT,
                        gorahnShift: GORAHN_SHIFT
                    }
                },
                limits: {
                    prorahn: {
                        min: PRORAHN_MIN,
                        max: PRORAHN_MAX
                    },
                    gorahn: {
                        min: GORAHN_MIN,
                        max: GORAHN_MAX
                    },
                    tahvo: {
                        min: TAHVO_MIN,
                        max: TAHVO_MAX
                    },
                    pahrtahvo: {
                        min: PAHRTAHVO_MIN,
                        max: PAHRTAHVO_MAX
                    },
                    gahrtahvo: {
                        min: GAHRTAHVO_MIN,
                        max: GAHRTAHVO_MAX
                    },
                    yahr: {
                        min: YAHR_MIN,
                        max: YAHR_MAX
                    },
                    vailee: {
                        min: VAILEE_MIN,
                        max: VAILEE_MAX
                    }
                }
            },
            generated: {
                artifacts: {
                    sourceTimestamp: "",
                    timestampConvertedTo: ""
                },
                bigs: {
                    hahrtee: Big(0),
                    vaileetee: Big(0),
                    yahrtee: Big(0),
                    gahrtahvotee: Big(0),
                    pahrtahvotee: Big(0),
                    tahvotee: Big(0),
                    gorahntee: Big(0),
                    prorahntee: Big(0)
                },
                readonly: {
                    hahrtee: 0,
                    vaileetee: 0,
                    yahrtee: 0,
                    gahrtahvotee: 0,
                    pahrtahvotee: 0,
                    tahvotee: 0,
                    gorahntee: 0,
                    prorahntee: 0
                }
            },
            tests: {
                firstControlTestValue: FIRST_CONTROL_TEST_VALUE,
                secondControlTestValue: SECOND_CONTROL_TEST_VALUE,
                thirdControlTestValue: THIRD_CONTROL_TEST_VALUE,
                fourthControlTestValue: FOURTH_CONTROL_TEST_VALUE,
                fifthControlTestValue: FIFTH_CONTROL_TEST_VALUE,
                sixthControlTestValue: SIXTH_CONTROL_TEST_VALUE,
                results: {
                    runtimeMetrics: {
                        elapsedTimeMessage: "",
                        elapsedTimeInMS: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    },
                    firstTest: "",
                    secondTest: "",
                    thirdTest: "",
                    fourthTest: {},
                    fifthTest: {},
                    sixthTest: {}
                }
            },
            importantDates: {
                holidays: {
                    firstFeastOfTheMaker: {
                        date: DNI_HOLIDAY_FIRST_FEAST_OF_THE_MAKER,
                        description: DNI_HOLIDAY_DESC__FEAST_OF_THE_MAKER
                    },
                    secondFeastOfTheMaker: {
                        date: DNI_HOLIDAY_SECOND_FEAST_OF_THE_MAKER,
                        description: DNI_HOLIDAY_DESC__FEAST_OF_THE_MAKER
                    },
                    thirdFeastOfTheMaker: {
                        date: DNI_HOLIDAY_THIRD_FEAST_OF_THE_MAKER,
                        description: DNI_HOLIDAY_DESC__FEAST_OF_THE_MAKER
                    },
                    newYear: {
                        date: DNI_HOLIDAY_NEW_YEAR,
                        description: DNI_HOLIDAY_DESC__DNI_NEW_YEAR
                    },

                    commonLibraryOpening: {
                        date: DNI_HOLIDAY_COMMON_LIBRARY_OPENING,
                        description: DNI_HOLIDAY_DESC__COMMON_LIBRARY_OPENING
                    },
                    dayOfDancing: {
                        date: DNI_HOLIDAY_DAY_OF_DANCING,
                        description: DNI_HOLIDAY_DESC__DAY_OF_DANCING
                    },
                    firstArrivalOfTheGreatKing: {
                        date: DNI_HOLIDAY_FIRST_ARRIVAL_OF_THE_GREAT_KING,
                        description: DNI_HOLIDAY_DESC__FIRST_ARRIVAL_OF_THE_GREAT_KING
                    },
                    coronationOfKingKerath: {
                        date: DNI_HOLIDAY_CORONATION_OF_KING_KERATH,
                        description: DNI_HOLIDAY_DESC__CORONATION_OF_KING_KERATH
                    }
                },
                misc: {
                    theFall: {
                        date: THE_FALL,
                        description: THE_FALL__DESC
                    }
                }
            }
        },
    };
}

function setConvergenceTimes() {
    // Converts Convergence Date to UTC
    let utc_convergence = new Date(Date
        .UTC(
            CONVERGENCE_YEAR,
            CONVERGENCE_MONTH - 1,
            CONVERGENCE_DAY,
            CONVERGENCE_HOUR,
            CONVERGENCE_MINUTE,
            CONVERGENCE_SECOND
        ));

    // Converts UTC to Cavern Local Time (GMT-0700)
    let cavern_convergence = new Date(utc_convergence);
    cavern_convergence.setHours(cavern_convergence.getHours() - 7);

    // Converts UTC to Local
    const local_convergence = new Date(utc_convergence);
    local_convergence.setTime(local_convergence.getTime() - (7 * 60 * 60 * 1000)); // Subtract hours from UTC timestamp

    return {
        utc: utc_convergence,
        cavern: cavern_convergence,
        local: local_convergence,
    }
}