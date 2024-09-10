import Big from "big.js";
import DniDateTimeConstants from "../constants/dni.date.constants";
import {GorahyanInterface} from "../interfaces/gorahyan.interface";

import {attachLeapSecondData} from "./leap.second.lib";
import SurfaceConverterLib from "./surface.converter.lib";

export default function GorahyanInitLib(DEBUG: boolean = false) {
    const dateTimeOfConvergence = "1991-04-21T09:54:00"; // This is Cavern Local
    return  {
        _leapSeconds: attachLeapSecondData(),
        dniConstants: DniDateTimeConstants(),
        cavern: {
            convertedTimestamp: ""
        },
        surface: {
            currentTS: new Date(),
            requestedTSTranslation: DEBUG ? dateTimeOfConvergence : null,
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
                        goranShiftedDelta: Big(0)
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
                        goranShiftedDelta: 0
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
    }
}

export function setConvergenceTimeArtifacts(gorahyan: GorahyanInterface) {
    const
        surfaceConverter = SurfaceConverterLib(gorahyan),
        { setSurfaceTimeArtifactsByString } = surfaceConverter,
        { earthConvergenceDateTimeString } = gorahyan.dniConstants.dates.calendarConvergence

    const elapsedSecondsAtConvergence = setSurfaceTimeArtifactsByString(earthConvergenceDateTimeString);

    gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence =
        Big(elapsedSecondsAtConvergence);
    gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence =
        elapsedSecondsAtConvergence;

    return gorahyan;
}