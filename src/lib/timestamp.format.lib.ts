import DniGorahyan from "../index";
import UtilsLib from "./utils.lib";
import { setNthBell } from "./surface.converter.lib";

const { padValue } = UtilsLib();

export const TimestampFormatLoaders = (dniGorahyan: DniGorahyan) => {
    const dniDateTimeStringFormatter = function(): string {
        let
            constructedBell = "",
            paddedTahvo = padValue(dniGorahyan.tahvotee),
            paddedGorahn = padValue(dniGorahyan.gorahntee),
            paddedProrahn = padValue(dniGorahyan.prorahntee),
            dateIsBE = dniGorahyan.hahrtee < 0,
            resolvedVaileeText = dniGorahyan.useDniFontMapping ?
                dniGorahyan.vaileeDniFontMappingName : dniGorahyan.vaileeTextName,
            hahrteeShift = dateIsBE ?
                (dniGorahyan.hahrtee * -1) : dniGorahyan.hahrtee,
            epochStamp = (dateIsBE && dniGorahyan.useDniFontMapping) ?
                " be" : dateIsBE ?
                    " BE" : dniGorahyan.useDniFontMapping ? " de" : " DE";

        // Set Time and Date String
        let
            constructedTime = dniGorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn,
            constructedDate = resolvedVaileeText + " " + dniGorahyan.yahrtee + ", " + hahrteeShift + epochStamp;

        if(dniGorahyan.includeNthBell || dniGorahyan.outputType === 0) {
            constructedBell = setNthBell(dniGorahyan.pahrtahvotee);
            constructedBell += dniGorahyan.useDniFontMapping ? " bell, " : " Bell, ";
        }

        switch(dniGorahyan.outputType) {
            case 0:
                return `${constructedBell}${constructedTime}, ${constructedDate}`;
            case 1:
                return `${constructedDate} ${constructedTime}`;
            case 2:
                return `${constructedTime}, ${constructedDate}`;
            default:
                return `${constructedBell}${constructedTime}, ${constructedDate}`;
        }
    }

    return {
        dniDateTimeStringFormatter
    };
}