import {DniGorahyan} from "../index";
import UtilsLib from "./utils.lib";
import { setNthBell } from "./surface.converter.lib";

const { padValue } = UtilsLib();

export const TimestampFormats = {
    guildOfArchivists: {
        type_0: function(gorahyan: DniGorahyan): string {
            let
                constructedDate = "",
                constructedTime = "",
                paddedTahvo = padValue(gorahyan.tahvotee),
                paddedGorahn = padValue(gorahyan.gorahntee),
                paddedProrahn = padValue(gorahyan.prorahntee),
                dateIsBE = gorahyan.hahrtee < 0,
                resolvedVaileeText = gorahyan.useDniFontMapping ? gorahyan.vaileeDniFontMappingName : gorahyan.vaileeTextName,
                hahrteeShift = dateIsBE ? (gorahyan.hahrtee * -1) : gorahyan.hahrtee,
                epochStamp = dateIsBE ? " BE " : " DE ";

            // Set Time and Date String
            constructedTime = gorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
            constructedDate = resolvedVaileeText + " " + gorahyan.yahrtee + " " + hahrteeShift + epochStamp;

            // outputs => "L[ee/E]fo 1 9647 DE 0:00:00:00"
            return `${constructedDate}${constructedTime}`;
        },
        type_1: function(gorahyan: DniGorahyan): string {
            let
                constructedDate = "",
                constructedTime = "",
                paddedTahvo = padValue(gorahyan.tahvotee),
                paddedGorahn = padValue(gorahyan.gorahntee),
                paddedProrahn = padValue(gorahyan.prorahntee),
                dateIsBE = gorahyan.hahrtee < 0,
                resolvedVaileeText = gorahyan.useDniFontMapping ? gorahyan.vaileeDniFontMappingName : gorahyan.vaileeTextName,
                hahrteeShift = dateIsBE ? (gorahyan.hahrtee * -1) : gorahyan.hahrtee,
                epochStamp = dateIsBE ? " BE" : " DE";

            // Set Time and Date String
            constructedTime = gorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
            constructedDate = resolvedVaileeText + " " + gorahyan.yahrtee + ", " + hahrteeShift + epochStamp;

            // outputs => "00:00:00:00, L[ee/E]fo 1, 9647 DE"
            return `${constructedTime}, ${constructedDate}`;
        }
    },
    troveOfGems: {
        type_0: function(gorahyan: DniGorahyan): string {
            let
                constructedDate = "",
                constructedTime = "",
                constructedBell = setNthBell(gorahyan.pahrtahvotee),
                paddedTahvo = padValue(gorahyan.tahvotee),
                paddedGorahn = padValue(gorahyan.gorahntee),
                paddedProrahn = padValue(gorahyan.prorahntee),
                dateIsBE = gorahyan.hahrtee < 0,
                resolvedVaileeText = gorahyan.useDniFontMapping ? gorahyan.vaileeDniFontMappingName : gorahyan.vaileeTextName,
                hahrteeShift = dateIsBE ? (gorahyan.hahrtee * -1) : gorahyan.hahrtee,
                epochStamp = dateIsBE ? " BE" : " DE";

            // Set Time and Date String
            constructedTime = gorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
            constructedDate = resolvedVaileeText + " " + gorahyan.yahrtee + ", " + hahrteeShift + epochStamp;

            // outputs => "nth Bell, 00:00:00:00, L[ee/E]fo 1, 9647 DE"
            return gorahyan.includeNthBell ?
                `${constructedBell}, ${constructedTime}, ${constructedDate}` :
                `${constructedTime}, ${constructedDate}`;
        }
    }
};