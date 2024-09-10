import Big from "big.js";

import {GorahyanInterface} from "../interfaces/gorahyan.interface";
import DniMonthConstants from "../constants/dni.month.constants";

import Utils from "./utils.lib";
import {AdjustForLeapSeconds} from "./leap.second.lib";

export default function SurfaceConverterLib(gorahyan: GorahyanInterface) {
    const { safeDateOperation, safeStringOperation, padValue } = Utils();

    const _setSurfaceTimeArtifactsByString = function(surfaceDateTime: string) {
        const
            parsedData = surfaceDateTime.split("T"),
            requestedDate = parsedData[0].split("-"),
            requestedTime = parsedData[1].split(":");

        let // Convert strings To ints and store them against the class object.
            year    = parseInt(requestedDate[0]),
            month   = parseInt(requestedDate[1]),
            day     = parseInt(requestedDate[2]),
            hour    = parseInt(requestedTime[0]),
            minute  = parseInt(requestedTime[1]),
            second  = parseInt(requestedTime[2]);

        gorahyan.conversionArtifacts.surface.bigs.year = Big(year);
        gorahyan.conversionArtifacts.surface.bigs.month.id = Big(month);
        gorahyan.conversionArtifacts.surface.bigs.day = Big(day);
        gorahyan.conversionArtifacts.surface.bigs.hour = Big(hour);
        gorahyan.conversionArtifacts.surface.bigs.minute = Big(minute);
        gorahyan.conversionArtifacts.surface.bigs.second = Big(second);

        gorahyan.conversionArtifacts.surface.readonly.year = year;
        gorahyan.conversionArtifacts.surface.readonly.month.id = month;
        gorahyan.conversionArtifacts.surface.readonly.day = day;
        gorahyan.conversionArtifacts.surface.readonly.hour = hour;
        gorahyan.conversionArtifacts.surface.readonly.minute = minute;
        gorahyan.conversionArtifacts.surface.readonly.second = second;

        let dt = new Date(year, month - 1, day);
        dt.setUTCHours(hour);
        dt.setUTCMinutes(minute + (7 * 60));
        dt.setUTCSeconds(second);
        let temp = Date.parse(dt.toISOString());

        return AdjustForLeapSeconds(Big(temp), gorahyan);
    }
    const _setSurfaceTimeArtifactsByDateObject = function(surfaceDateTime: Date) {
        console.log("Process User Provided DateTime Object...", surfaceDateTime);
        let dt = new Date(surfaceDateTime.getUTCFullYear(), surfaceDateTime.getMonth(), surfaceDateTime.getDate());
        dt.setUTCHours(surfaceDateTime.getHours());
        dt.setUTCMinutes(surfaceDateTime.getMinutes() + (7 * 60));
        dt.setUTCSeconds(surfaceDateTime.getSeconds());
        let temp = Date.parse(dt.toISOString());

        return AdjustForLeapSeconds(Big(temp), gorahyan);
    }
    const _convertSurfaceTimestampToCavern = function(surfaceDateTime?: Date | string | null | undefined, DEBUG: boolean = false) {
        const {
            convergence: cavernConvergenceDate
        } = gorahyan.dniConstants.dates.cavern;
        let // Process And Store Surface Time Artifacts
            stringPassed = typeof surfaceDateTime === "string",
            dateObjectPassed = typeof surfaceDateTime === "object",
            nullOrUndefinedPassed = surfaceDateTime === undefined || surfaceDateTime === null;

        if(stringPassed) {
            let
                safeDateTimeString = safeStringOperation(surfaceDateTime),
                processedDTString = _setSurfaceTimeArtifactsByString(safeDateTimeString);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTString);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTString;
        } else if (dateObjectPassed) {
            let
                safeDateTimeObject = safeDateOperation(surfaceDateTime),
                processedDTObject = _setSurfaceTimeArtifactsByDateObject(safeDateTimeObject);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        } else if (nullOrUndefinedPassed) {
            let
                dateToProcess = DEBUG ? new Date(cavernConvergenceDate) : new Date(),
                processedDTObject = _setSurfaceTimeArtifactsByDateObject(dateToProcess);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        }

        console.log(gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence);

        let earthDeltaInMS = gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate
            .minus(gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence);

        console.log("Earth Delta: ", earthDeltaInMS.toNumber());

        const {
            bigs: {
                msPerHahr, // Number of Milliseconds in 1 Hahr
                vaileeShift, // Constant used to calculate the Vailee
                prorahnteePerHahr
            }
        } = gorahyan.dniConstants;

        /**
        * Calculate and Store D'ni Hahr
        * */
        let hahr: Big | number;
        hahr = earthDeltaInMS.div(msPerHahr);
        hahr = Math.floor(hahr.toNumber());

        let deltaWithHahrRemoved: Big | number;
        deltaWithHahrRemoved = shiftDelta(hahr, msPerHahr.toNumber(), earthDeltaInMS);

        console.log("Calculated hahr: ", hahr);
        console.log("Calculated deltaWithHahrRemoved: ", deltaWithHahrRemoved.toNumber());
        setCalculatedValue("hahr", hahr);

        /**
        * Convert Delta to D'ni Prorahntee For Rest of Calculations
        * */
        let
            prorahnAdjustment = prorahnteePerHahr.div(msPerHahr),
            deltaInProrahntee = deltaWithHahrRemoved.times(prorahnAdjustment);

        console.log("Calculated deltaInProrahn: ", deltaInProrahntee.toNumber());

        /**
        * Calculate and Store the Vailee
        * */
        let vaileeId: Big | number = deltaInProrahntee.div(vaileeShift);
        vaileeId = Math.floor(vaileeId.toNumber());

        console.log("Calculated Vailee prior to adjustment: ", vaileeId);

        let prorahnteeDeltaWithVaileeRemoved: Big | number;
        prorahnteeDeltaWithVaileeRemoved = shiftDelta(vaileeId, vaileeShift.toNumber(), deltaInProrahntee);

        console.log("Calculated prorahnteeDeltaWithVaileeRemoved: ", prorahnteeDeltaWithVaileeRemoved.toNumber());
        setCalculatedValue("vailee", vaileeId);

        /**
        * Calculate and Store the Yahr
        * */
        let yahr: Big | number = prorahnteeDeltaWithVaileeRemoved.div(Big(78125));
        yahr = Math.floor(yahr.toNumber());

        console.log("Calculated yahr: ", yahr);

        let prorahnteeDeltaWithYahrRemoved: Big | number;
        prorahnteeDeltaWithYahrRemoved = shiftDelta(yahr, 78125, prorahnteeDeltaWithVaileeRemoved);

        console.log("Calculated prorahnteeDeltaWithYahrRemoved: ", prorahnteeDeltaWithYahrRemoved.toNumber());
        setCalculatedValue("yahr", yahr);

        /**
        * Calculate and Store the Gartahvo
        * */
        let gartahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(Big(15625));
        gartahvo = Math.floor(gartahvo.toNumber());

        console.log("Calculated gartahvo: ", gartahvo);

        let prorahnteeDeltaWithGartahvoRemoved: Big | number;
        prorahnteeDeltaWithGartahvoRemoved = shiftDelta(gartahvo, 15625, prorahnteeDeltaWithYahrRemoved);

        console.log("Calculated prorahnteeDeltaWithGartahvoRemoved: ", prorahnteeDeltaWithGartahvoRemoved.toNumber());
        setCalculatedValue("gartahvo", gartahvo);

        /**
        * Calculate and Store the Tahvo
        * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved.div(Big(625));
        tahvo = Math.floor(tahvo.toNumber());

        console.log("Calculated tahvo: ", tahvo);

        let prorahnteeDeltaWithTahvoRemoved: Big | number;
        prorahnteeDeltaWithTahvoRemoved = shiftDelta(tahvo, 625, prorahnteeDeltaWithGartahvoRemoved);

        console.log("Calculated prorahnteeDeltaWithTahvoRemoved: ", prorahnteeDeltaWithGartahvoRemoved.toNumber());

        setCalculatedValue("tahvo", tahvo);

        /**
        * Calculate and Store the Gorahn
        * */
        let gorahn: Big | number = prorahnteeDeltaWithTahvoRemoved.div(Big(25));
        gorahn = Math.floor(gorahn.toNumber());

        console.log("Calculated gorahn: ", gorahn);

        let prorahnteeDeltaWithGorahnRemoved: Big | number;
        prorahnteeDeltaWithGorahnRemoved = shiftDelta(gorahn, 25, prorahnteeDeltaWithTahvoRemoved);

        console.log("Calculated prorahnteeDeltaWithGorahnRemoved: ", prorahnteeDeltaWithGorahnRemoved.toNumber());
        setCalculatedValue("gorahn", gorahn);

        /**
        * Calculate and Store the Prorahn
        * */
        let prorahn: number = Math.floor(prorahnteeDeltaWithGorahnRemoved.toNumber());
        console.log("Calculated prorahn: ", prorahn);
        setCalculatedValue("prorahn", prorahn);

        /**
        * Adjust All Calculated Times As Needed
        * */
        adjustCalculatedTimes();
        console.log("Times have been adjusted? ", gorahyan.conversionArtifacts.cavern.readonly);

        return _getDniConvertedTimestamp();
    }

    const shiftDelta = function(dniUnit: number, dniUnitShift: number, currentDelta: Big): Big {
        let
            deltaShiftValueToRemove = Big(dniUnit).times(Big(dniUnitShift)),
            remainingDelta: Big | number;

        remainingDelta = currentDelta.minus(deltaShiftValueToRemove);

        return remainingDelta;
    }

    const setCalculatedValue = function(target: string, val: number) {
        if(target === "vailee") {
            gorahyan.conversionArtifacts.cavern.bigs[target].id = Big(val);
            gorahyan.conversionArtifacts.cavern.readonly[target].id = val;
        } else {
            // @ts-ignore
            gorahyan.conversionArtifacts.cavern.bigs[target] = Big(val);
            // @ts-ignore
            gorahyan.conversionArtifacts.cavern.readonly[target] = val;
        }
    }

    const adjustCalculatedTimes = function() {
        adjustTimeValue('prorahn', 25, 0, 25);
        adjustTimeValue('gorahn', 25, 0, 25);
        adjustTimeValue('tahvo', 25, 0, 25);
        adjustTimeValue('gartahvo', 5, 0, 5);
        adjustTimeValue('yahr', 29, 0, 29);
        adjustTimeValue('vailee', 9, 0, 10);
        _mapVaileeName(gorahyan.conversionArtifacts.cavern.readonly.vailee.id);
        finalCalendarAdjustments();
    }
    const _subAdjustment = function(subTarget: string, currentValue: number, min: number, max: number) {
        let adjustment = 0;
        if(currentValue > max) {
            adjustment = 1;
        } else if (currentValue < min) {
            adjustment = -1;
        }

        if(subTarget === "vailee") {
            gorahyan.conversionArtifacts.cavern.bigs[subTarget].id =
                gorahyan.conversionArtifacts.cavern.bigs[subTarget].id.plus(adjustment);
            gorahyan.conversionArtifacts.cavern.readonly[subTarget].id =
                gorahyan.conversionArtifacts.cavern.bigs[subTarget].id.toNumber();
        } else {
            // @ts-ignore
            gorahyan.conversionArtifacts.cavern.bigs[subTarget] =
                // @ts-ignore
                gorahyan.conversionArtifacts.cavern.bigs[subTarget].plus(adjustment);
            // @ts-ignore
            gorahyan.conversionArtifacts.cavern.readonly[subTarget] =
                // @ts-ignore
                gorahyan.conversionArtifacts.cavern.bigs[subTarget].toNumber();
        }
    }
    const adjustTimeValue = function(
        target: string,
        max: number, min: number, adjustByValue: number
    ) {
        // @ts-ignore
        const cavernBigs = gorahyan.conversionArtifacts.cavern.bigs;
        const cavernReadonly = gorahyan.conversionArtifacts.cavern.readonly;
        console.log("Use new AdjustTimeValue(): ", target);
        console.log("cavernReadonly: ", cavernReadonly);

        // @ts-ignore
        while ((
                (target === "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() > max) ||
                (target === "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() < min)
            ) || (
                // @ts-ignore
                target !== "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].toNumber() > max  ||
                // @ts-ignore
                target !== "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].toNumber() < min
            )) {
            let currentValue = (target === "vailee") ?
                    gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() :
                    // @ts-ignore
                    gorahyan.conversionArtifacts.cavern.bigs[target].toNumber(),
                adjustedValue = 0;

            if (currentValue > max) {
                adjustedValue = currentValue - adjustByValue;
            } else {
                adjustedValue = currentValue + adjustByValue;
            }

            // @ts-ignore
            cavernBigs[target] = cavernBigs[target].plus(adjustedValue);
            // @ts-ignore
            cavernReadonly[target] = cavernBigs[target].toNumber();

            // Sub-processing when a main component is adjusted
            switch(target) {
                case "prorahn":
                    _subAdjustment("gorahn", currentValue, min, max);
                    break;
                case "gorahn":
                    _subAdjustment("tahvo", currentValue, min, max);
                    break;
                case "tahvo":
                    _subAdjustment("gartahvo", currentValue, min, max);
                    break;
                case "gartahvo":
                    _subAdjustment("yahr", currentValue, min, max);
                    break;
                case "yahr":
                    _subAdjustment("vailee", currentValue, min, max);
                    break;
                case "vailee":
                    _subAdjustment("hahr", currentValue, min, max);
                    break;
                default:
                    break;
            }
        }

    }
    const finalCalendarAdjustments = function() {
        const {
            bigs: {
                refDniHahr
            }
        } = gorahyan.dniConstants;
        // Final Calendar Adjustments
        gorahyan.conversionArtifacts.cavern.bigs.hahr =
            gorahyan.conversionArtifacts.cavern.bigs.hahr.plus(refDniHahr);
        gorahyan.conversionArtifacts.cavern.readonly.hahr =
            gorahyan.conversionArtifacts.cavern.bigs.hahr.toNumber();
        gorahyan.conversionArtifacts.cavern.bigs.yahr =
            gorahyan.conversionArtifacts.cavern.bigs.yahr.plus(1);
        gorahyan.conversionArtifacts.cavern.readonly.yahr =
            gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();
    }

    const _getDniConvertedTimestamp = function() {
        const {
            hahr, vailee, yahr,
            gartahvo, tahvo, gorahn, prorahn
        } = gorahyan.conversionArtifacts.cavern.readonly

        let
            constructedDate = "",
            constructedTime = "",
            paddedTahvo = padValue(tahvo),
            paddedGorahn = padValue(gorahn),
            paddedProrahn = padValue(prorahn),
            dateIsBE = hahr < 0;

        if(dateIsBE) {
            constructedDate = vailee.text + " " + yahr + " " + (hahr * -1) + " BE ";
            constructedTime = gartahvo + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
        } else {
            constructedDate = vailee.text + " " + yahr + " " + hahr + " DE ";
            constructedTime = gartahvo + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
        }

        gorahyan.cavern.convertedTimestamp = `${constructedDate}${constructedTime}`;
        return gorahyan.cavern.convertedTimestamp;
    }

    // Should this be moved?
    const _setVaileeArtifacts = function(
            vaileeName: string,
            dniFontMappingVaileeName: string
        ) {
        // Human Readable Vailee Name
        gorahyan.conversionArtifacts.cavern.bigs.vailee.text = vaileeName;
        gorahyan.conversionArtifacts.cavern.readonly.vailee.text = vaileeName;
        // D'ni Font Friendly Vailee Name
        gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = dniFontMappingVaileeName;
        gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = dniFontMappingVaileeName;
        return gorahyan;
    }

    const _mapVaileeName = function(vaileeId: number) {
        try {
            _setVaileeArtifacts(DniMonthConstants[vaileeId].vaileeNameText, DniMonthConstants[vaileeId].dniFontVaileeNameText);
        } catch(err) {
            console.error(err);
            throw new Error("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");
        }
    }

    return {
        setSurfaceTimeArtifactsByString: _setSurfaceTimeArtifactsByString,
        setSurfaceTimeArtifactsByDateObject: _setSurfaceTimeArtifactsByDateObject,
        convertSurfaceTimestampToCavern: _convertSurfaceTimestampToCavern
    }
}