import Big from "big.js";
import DniGorahyan from "../index";
import DniMonthConstants from "../constants/dni.month.constants";
import UtilsLib from "./utils.lib";
import { deAdjustForLeapSeconds } from "./leap.second.lib";

/**
 * Default File Export
 * */
export default function convertCavernTimestampToSurfaceTimestamps(dniGorahyan: DniGorahyan) {
    const { convertCavernTimestampToSurface } = CavernConverterLib(dniGorahyan);
    return convertCavernTimestampToSurface;
}

/**
 * Helper Exports
 * */
function setCavernTimeArtifactsByString(cavernDateTime: string, dniGorahyan: DniGorahyan) {
    // Store Requested Translation Date
    dniGorahyan.userProvidedCavernTS = cavernDateTime;

    const
        splitOnBE = cavernDateTime.includes("BE"),
        parsedData = cavernDateTime.split(splitOnBE ? "BE" : "DE"),
        requestedDate = parsedData[0].split(" "),
        requestedTime = parsedData[1].split(":");

    let // Convert strings To ints and store them against the class object.
        hahr        = parseInt(requestedDate[2]),
        vailee      = _getVaileeId(requestedDate[0]),
        yahr        = parseInt(requestedDate[1]),
        gahrtahvo   = parseInt(requestedTime[0]),
        tahvo       = parseInt(requestedTime[1]),
        gorahn      = parseInt(requestedTime[2]),
        prorahn     = parseInt(requestedTime[3]);

    dniGorahyan.timeFragment = {
        type: "hahr",
        value: hahr,
        source: "cavern"
    };
    dniGorahyan.vaileetee = vailee;
    dniGorahyan.timeFragment = {
        type: "yahr",
        value: yahr,
        source: "cavern"
    };
    dniGorahyan.timeFragment = {
        type: "gahrtahvo",
        value: gahrtahvo,
        source: "cavern"
    };
    dniGorahyan.timeFragment = {
        type: "tahvo",
        value: tahvo,
        source: "cavern"
    };
    dniGorahyan.timeFragment = {
        type: "gorahn",
        value: gorahn,
        source: "cavern"
    };
    dniGorahyan.timeFragment = {
        type: "prorahn",
        value: prorahn,
        source: "cavern"
    };
}

/**
 * Internal File Methods
 * */
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

function CavernConverterLib(dniGorahyan: DniGorahyan) {

    function _toCavernDateTimeString(dateTimeString: Date) {
        dateTimeString.setUTCMinutes(dateTimeString.getUTCMinutes() - (7 * 60));
        return dateTimeString.toDateString() + " " +
            UtilsLib().padValue(dateTimeString.getUTCHours()) + ":" +
            UtilsLib().padValue(dateTimeString.getUTCMinutes()) + ":" +
            UtilsLib().padValue(dateTimeString.getUTCSeconds()) + " GMT-0700";
    }

    const _convertCavernTimestampToSurface = function (cavernTimeStamp: string) {
        setCavernTimeArtifactsByString(cavernTimeStamp, dniGorahyan);

        // Convert current values for D'ni date to prorahntee (essentially, time since 1 Leefo 0 DE 0:0:0:0)
        let prorahnteeDelta = Big(dniGorahyan.prorahntee)
            .plus(Big(dniGorahyan.gorahntee).times(dniGorahyan.GORAHN_SHIFT_BIG))
            .plus(Big(dniGorahyan.tahvotee).times(dniGorahyan.TAHVO_SHIFT_BIG))
            .plus(Big(dniGorahyan.gahrtahvotee).times(dniGorahyan.GAHRTAHVO_SHIFT_BIG));

        if(cavernTimeStamp.includes("DE")) {
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.yahrtee).minus(1).times(dniGorahyan.YAHR_SHIFT_BIG));
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.vaileetee).times(dniGorahyan.VAILEE_SHIFT_BIG));
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.hahrtee).times(dniGorahyan.PRORAHNTEE_PER_HAHR_BIG));
        } else {
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.yahrtee).minus(1).times(dniGorahyan.YAHR_SHIFT_BIG));
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.vaileetee).times(2265625));
            prorahnteeDelta = prorahnteeDelta
                .plus(Big(dniGorahyan.hahrtee).times(dniGorahyan.PRORAHNTEE_PER_HAHR_BIG).times(-1));
        }

        // Subtract from reference date prorahntee
        let deltaBetweenDates = dniGorahyan.REF_PRORAHNTEE_PER_HAHR_BIG.minus(prorahnteeDelta);
        // Multiply by milliseconds per prorahn
        let deltaDifference = deltaBetweenDates.times(dniGorahyan.EARTH_MS_PER_PRORAHNTEE_BIG);
        // Subtract milliseconds from reference timestamp
        deltaDifference = Big(dniGorahyan.elapsedTimeAtConvergence).minus(deltaDifference);
        // Convert new delta value to surface date (UTC)
        let surfaceDate = new Date(deltaDifference.toNumber());
        // Account for leap seconds in more contemporary dates
        surfaceDate = new Date(deAdjustForLeapSeconds(Big(surfaceDate.getTime()), dniGorahyan.gorahyan));

        let localDateTimeString = new Date(surfaceDate).setUTCMinutes(surfaceDate.getUTCMinutes());

        dniGorahyan.systemProvidedCavernTS = {
            utc: surfaceDate.toUTCString(),
            cavern: _toCavernDateTimeString(surfaceDate),
            local: new Date(localDateTimeString).toString()
        };

        return dniGorahyan;
    }
    return {
        convertCavernTimestampToSurface: _convertCavernTimestampToSurface
    }
}