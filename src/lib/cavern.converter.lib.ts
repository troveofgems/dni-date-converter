import Big from "big.js";

import {GorahyanInterface} from "../interfaces/gorahyan.interface";
import DniMonthConstants from "../constants/dni.month.constants";
import { deAdjustForLeapSeconds } from "./leap.second.lib";
import UtilsLib from "./utils.lib";

export function _getVaileeId(vaileeName: string): number {
    let id: number;
    try {
        let dniMonthData = DniMonthConstants.filter((item) => item.vaileeNameText === vaileeName);
        id = dniMonthData[0].id;
    } catch(err) {
        throw new Error("Error processing vailee name.");
    }
    return id;
}

export default function CavernConverterLib(gorahyan: GorahyanInterface) {
    function setCavernTimeArtifactsByString(cavernDateTime: string, gorahyan: GorahyanInterface) {
        const
            splitOnBE = cavernDateTime.includes("BE"),
            parsedData = cavernDateTime.split(splitOnBE ? "BE" : "DE"),
            requestedDate = parsedData[0].split(" "),
            requestedTime = parsedData[1].split(":");

        let // Convert strings To ints and store them against the class object.
            hahr        = parseInt(requestedDate[2]),
            vailee      = _getVaileeId(requestedDate[0]),
            yahr        = parseInt(requestedDate[1]),
            gartahvo    = parseInt(requestedTime[0]),
            tahvo       = parseInt(requestedTime[1]),
            gorahn      = parseInt(requestedTime[2]),
            prorahn     = parseInt(requestedTime[3]);

        gorahyan.conversionArtifacts.cavern.bigs.hahr = Big(hahr);
        gorahyan.conversionArtifacts.cavern.bigs.vailee.id = Big(vailee);
        gorahyan.conversionArtifacts.cavern.bigs.yahr = Big(yahr);
        gorahyan.conversionArtifacts.cavern.bigs.gartahvo = Big(gartahvo);
        gorahyan.conversionArtifacts.cavern.bigs.tahvo = Big(tahvo);
        gorahyan.conversionArtifacts.cavern.bigs.gorahn = Big(gorahn);
        gorahyan.conversionArtifacts.cavern.bigs.prorahn = Big(prorahn);

        gorahyan.conversionArtifacts.cavern.readonly.hahr = hahr;
        gorahyan.conversionArtifacts.cavern.readonly.vailee.id = vailee;
        gorahyan.conversionArtifacts.cavern.readonly.yahr = yahr;
        gorahyan.conversionArtifacts.cavern.readonly.gartahvo = gartahvo;
        gorahyan.conversionArtifacts.cavern.readonly.tahvo = tahvo;
        gorahyan.conversionArtifacts.cavern.readonly.prorahn = prorahn;
    }
    function _toCavernDateTimeString(dateTimeString: Date) {
        dateTimeString.setUTCMinutes(dateTimeString.getUTCMinutes() - (7 * 60));
        return dateTimeString.toDateString() + " " +
            UtilsLib().padValue(dateTimeString.getUTCHours()) + ":" +
            UtilsLib().padValue(dateTimeString.getUTCMinutes()) + ":" +
            UtilsLib().padValue(dateTimeString.getUTCSeconds()) + " GMT-0700";
    }

    const _convertCavernTimestampToSurface = function (cavernTimeStamp: string) {
        setCavernTimeArtifactsByString(cavernTimeStamp, gorahyan);

        const
            {
                refProrahnteePerHahr, prorahnteePerHahr,
                msPerProrahn
            } = gorahyan.dniConstants.bigs,
            {
                prorahn, gorahn, tahvo, gartahvo, yahr, vailee, hahr
            } = gorahyan.conversionArtifacts.cavern.bigs,
            {
                goranShift, tahvoShift, gartahvoShift, yahrShift, vaileeShift, hahrShift
            } = gorahyan.dniConstants.bigs.deltas,
            {
                elapsedSecondsAtConvergence
            } = gorahyan.conversionArtifacts.surface.bigs.timeDeltas;

        // Convert current values for D'ni date to prorahntee (essentially, time since 1 Leefo 0 DE 0:0:0:0)
        let prorahnteeDelta = prorahn
            .plus(gorahn.times(goranShift))
            .plus(tahvo.times(tahvoShift))
            .plus(gartahvo.times(gartahvoShift));

        if(cavernTimeStamp.includes("DE")) {
            prorahnteeDelta = prorahnteeDelta.plus(yahr.minus(1).times(yahrShift));
            prorahnteeDelta = prorahnteeDelta.plus(vailee.id.times(vaileeShift));
            prorahnteeDelta = prorahnteeDelta.plus(hahr.times(prorahnteePerHahr));
        } else {
            prorahnteeDelta = prorahnteeDelta.plus(yahr.minus(1).times(yahrShift));
            prorahnteeDelta = prorahnteeDelta.plus(vailee.id.times(2265625));
            prorahnteeDelta = prorahnteeDelta.plus(hahr.times(prorahnteePerHahr).times(-1));
        }

        // Subtract from reference date prorahntee
        let deltaBetweenDates = refProrahnteePerHahr.minus(prorahnteeDelta);
        // Multiply by milliseconds per prorahn
        let deltaDifference = deltaBetweenDates.times(msPerProrahn);
        // Subtract milliseconds from reference timestamp
        deltaDifference = elapsedSecondsAtConvergence.minus(deltaDifference);
        // Convert new delta value to surface date (UTC)
        let surfaceDate = new Date(deltaDifference.toNumber());
        // Account for leap seconds in more contemporary dates
        surfaceDate = new Date(deAdjustForLeapSeconds(Big(surfaceDate.getTime()), gorahyan));

        let localDateTimeString = new Date(surfaceDate).setUTCMinutes(surfaceDate.getUTCMinutes());

        return {
            utc: surfaceDate.toUTCString(),
            cavern: _toCavernDateTimeString(surfaceDate),
            local: new Date(localDateTimeString).toString()
        };
    }
    return {
        convertCavernTimestampToSurface: _convertCavernTimestampToSurface
    }
}