import {DniDatetimeConstantsInterface} from "./dni.datetime.constants.interface";
import {LeapSecondInterface} from "./leap.second.interface";

export interface GorahyanInterface { // Translation: [Gorahyan - D'ni For "Clock"]
    dniConstants: DniDatetimeConstantsInterface,
    _leapSeconds: LeapSecondInterface,
    cavern: {
        convertedTimestamp: string
    },
    surface: {
        currentTS: Date;
        requestedTSTranslation: string | null;
    }
    conversionArtifacts: {
        cavern: {
            bigs: {
                hahr: Big,
                vailee: {
                    id: Big,
                    text: string,
                    dniFontMappingText: string
                },
                yahr: Big,
                gartahvo: Big,
                tahvo: Big,
                gorahn: Big,
                prorahn: Big,
                timeDeltasCalculated: {
                    earthDelta: Big,
                    hahrShiftedDelta: Big,
                    prorahnteeDelta: Big,
                    vaileeShiftedDelta: Big,
                    yahrShiftedDelta: Big,
                    gartahvoShiftedDelta: Big,
                    tahvoShiftedDelta: Big,
                    goranShiftedDelta: Big
                }
            },
            readonly: {
                hahr: number,
                vailee: {
                    id: number,
                    text: string,
                    dniFontMappingText: string
                },
                yahr: number,
                gartahvo: number,
                tahvo: number,
                gorahn: number,
                prorahn: number,
                timeDeltasCalculated: {
                    earthDelta: number,
                    hahrShiftedDelta: number,
                    prorahnteeDelta: number,
                    vaileeShiftedDelta: number,
                    yahrShiftedDelta: number,
                    gartahvoShiftedDelta: number,
                    tahvoShiftedDelta: number,
                    goranShiftedDelta: number
                }
            }
        },
        surface: {
            bigs: {
                year: Big,
                month: {
                    id: Big,
                    text: string
                },
                day: Big,
                hour: Big,
                minute: Big,
                second: Big,
                millisecond: Big,
                timeDeltas: {
                    elapsedSecondsAtConvergence: Big,
                    elapsedSecondsForGivenDate: Big
                }
            },
            readonly: {
                year: number,
                month: {
                    id: number,
                    text: string
                },
                day: number,
                hour: number,
                minute: number,
                second: number,
                millisecond: number,
                timeDeltas: {
                    elapsedSecondsAtConvergence: number,
                    elapsedSecondsForGivenDate: number
                }
            }
        }
    },
}