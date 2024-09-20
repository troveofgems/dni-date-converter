import {DniDatetimeConstantsInterface} from "./dni.datetime.constants.interface";
import {LeapSecondInterface} from "./leap.second.interface";

// Translation: [Gorahyan - D'ni For "Clock"]
export interface GorahyanInterface {
    dniConstants: DniDatetimeConstantsInterface,
    _leapSeconds: LeapSecondInterface,
    timestampArtifacts: {
        cavern: {
            providedTimestamps: {
                byUser: string,
                fromSystem: object,
                outputType: string | number
            },
            bigs: {
                hahr: Big,
                vailee: {
                    id: Big,
                    text: string,
                    dniFontMappingText: string
                },
                yahr: Big,
                gahrtahvo: Big,
                pahrtahvo: Big,
                tahvo: Big,
                gorahn: Big,
                prorahn: Big,
                timeDeltasCalculated: {
                    earthDelta: Big,
                    hahrShiftedDelta: Big,
                    prorahnteeDelta: Big,
                    vaileeShiftedDelta: Big,
                    yahrShiftedDelta: Big,
                    gahrtahvoShiftedDelta: Big,
                    tahvoShiftedDelta: Big,
                    gorahnShiftedDelta: Big
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
                gahrtahvo: number,
                pahrtahvo: number,
                tahvo: number,
                gorahn: number,
                prorahn: number,
                timeDeltasCalculated: {
                    earthDelta: number,
                    hahrShiftedDelta: number,
                    prorahnteeDelta: number,
                    vaileeShiftedDelta: number,
                    yahrShiftedDelta: number,
                    gahrtahvoShiftedDelta: number,
                    tahvoShiftedDelta: number,
                    gorahnShiftedDelta: number
                }
            }
        },
        surface: {
            providedTimestamps: {
                byUser: Date | string,
                fromSystem: string,
                outputType: string | number
            },
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
    outputSettings: {
        useDniFontMapping: boolean;
        includeNthBell: boolean;
        timestampFormat: Function;
    }
}