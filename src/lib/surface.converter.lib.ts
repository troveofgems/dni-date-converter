import Big from "big.js";

import {GorahyanInterface} from "../interfaces/gorahyan.interface";
import DniMonthConstants from "../constants/dni.month.constants";

import Utils from "./utils.lib";
import { adjustForLeapSeconds } from "./leap.second.lib";

export function setSurfaceTimeArtifactsByString(surfaceDateTime: string, gorahyan: GorahyanInterface) {
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

    return adjustForLeapSeconds(Big(temp), gorahyan);
}

export default function SurfaceConverterLib(gorahyan: GorahyanInterface) {
    const { safeDateOperation, safeStringOperation, padValue } = Utils();

    const _setSurfaceTimeArtifactsByDateObject = function(surfaceDateTime: Date) {
        let dt = new Date(surfaceDateTime.getUTCFullYear(), surfaceDateTime.getMonth(), surfaceDateTime.getDate());
        dt.setUTCHours(surfaceDateTime.getHours());
        dt.setUTCMinutes(surfaceDateTime.getMinutes() + (7 * 60));
        dt.setUTCSeconds(surfaceDateTime.getSeconds());
        let temp = Date.parse(dt.toISOString());

        return adjustForLeapSeconds(Big(temp), gorahyan);
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
                processedDTString = setSurfaceTimeArtifactsByString(safeDateTimeString, gorahyan);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTString);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTString;
        } else if (dateObjectPassed && !nullOrUndefinedPassed) {
            let
                safeDateTimeObject = safeDateOperation(surfaceDateTime),
                processedDTObject = _setSurfaceTimeArtifactsByDateObject(safeDateTimeObject);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        } else if(nullOrUndefinedPassed) {
            let
                dateToProcess = DEBUG ? new Date(Date.UTC(1991, 4 - 1, 21, 16, 54, 0)) : new Date(),
                processedDTObject = _setSurfaceTimeArtifactsByDateObject(dateToProcess);

            gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        }

        let earthDeltaInMS = gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate
            .minus(gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.earthDelta = earthDeltaInMS;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.earthDelta = earthDeltaInMS.toNumber();

        const {
            bigs: {
                msPerHahr, // Number of Milliseconds in 1 Hahr
                prorahnteePerHahr, // Number of Prorahntee in 1 Hahr
                deltas: {
                    hahrShift, vaileeShift, yahrShift,
                    gartahvoShift, tahvoShift, goranShift
                }
            }
        } = gorahyan.dniConstants;

        /**
        * Calculate and Store D'ni Hahr
        * */
        let hahr: Big | number;
        hahr = earthDeltaInMS.div(msPerHahr);
        hahr = Math.floor(hahr.toNumber());

        let deltaWithHahrRemoved = shiftDelta(hahr, hahrShift, earthDeltaInMS);
        setCalculatedValue("hahr", hahr);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.hahrShiftedDelta = deltaWithHahrRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.hahrShiftedDelta = deltaWithHahrRemoved.toNumber();

        /**
        * Convert Delta to D'ni Prorahntee For Rest of Calculations
        * */
        let
            prorahnAdjustment = prorahnteePerHahr.div(msPerHahr),
            deltaInProrahntee = deltaWithHahrRemoved.times(prorahnAdjustment);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.prorahnteeDelta = deltaInProrahntee;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.prorahnteeDelta = deltaInProrahntee.toNumber();

        /**
        * Calculate and Store the Vailee
        * */
        let vaileeId: Big | number = deltaInProrahntee.div(vaileeShift);
        vaileeId = Math.floor(vaileeId.toNumber());

        let prorahnteeDeltaWithVaileeRemoved = shiftDelta(vaileeId, vaileeShift, deltaInProrahntee);
        setCalculatedValue("vailee", vaileeId);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.vaileeShiftedDelta = prorahnteeDeltaWithVaileeRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.vaileeShiftedDelta = prorahnteeDeltaWithVaileeRemoved.toNumber();

        /**
        * Calculate and Store the Yahr
        * */
        let yahr: Big | number = prorahnteeDeltaWithVaileeRemoved.div(yahrShift);
        yahr = Math.floor(yahr.toNumber());

        let prorahnteeDeltaWithYahrRemoved = shiftDelta(yahr, yahrShift, prorahnteeDeltaWithVaileeRemoved);
        setCalculatedValue("yahr", yahr);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.yahrShiftedDelta = prorahnteeDeltaWithYahrRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.yahrShiftedDelta = prorahnteeDeltaWithVaileeRemoved.toNumber();

        /**
        * Calculate and Store the Gartahvo
        * */
        let gartahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(Big(15625));
        gartahvo = Math.floor(gartahvo.toNumber());

        let prorahnteeDeltaWithGartahvoRemoved = shiftDelta(gartahvo, gartahvoShift, prorahnteeDeltaWithYahrRemoved);
        setCalculatedValue("gartahvo", gartahvo);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.gartahvoShiftedDelta = prorahnteeDeltaWithGartahvoRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.gartahvoShiftedDelta = prorahnteeDeltaWithGartahvoRemoved.toNumber();

        /**
        * Calculate and Store the Tahvo
        * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved.div(tahvoShift);
        tahvo = Math.floor(tahvo.toNumber());

        let prorahnteeDeltaWithTahvoRemoved = shiftDelta(tahvo, tahvoShift, prorahnteeDeltaWithGartahvoRemoved);
        setCalculatedValue("tahvo", tahvo);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.tahvoShiftedDelta = prorahnteeDeltaWithTahvoRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.tahvoShiftedDelta = prorahnteeDeltaWithTahvoRemoved.toNumber();

        /**
        * Calculate and Store the Gorahn
        * */
        let gorahn: Big | number = prorahnteeDeltaWithTahvoRemoved.div(goranShift);
        gorahn = Math.floor(gorahn.toNumber());

        let prorahnteeDeltaWithGorahnRemoved = shiftDelta(gorahn, goranShift, prorahnteeDeltaWithTahvoRemoved);
        setCalculatedValue("gorahn", gorahn);

        gorahyan.conversionArtifacts.cavern.bigs.timeDeltasCalculated.goranShiftedDelta = prorahnteeDeltaWithTahvoRemoved;
        gorahyan.conversionArtifacts.cavern.readonly.timeDeltasCalculated.goranShiftedDelta = prorahnteeDeltaWithTahvoRemoved.toNumber();

        /**
        * Calculate and Store the Prorahn
        * */
        let prorahn = Math.floor(prorahnteeDeltaWithGorahnRemoved.toNumber());
        setCalculatedValue("prorahn", prorahn);

        /**
        * Adjust All Calculated Times As Needed And Return Final TS Value
        * */
        adjustCalculatedTimes();
        return _getDniConvertedTimestamp();
    }

    const shiftDelta = function(dniUnit: number, dniUnitShift: Big, currentDelta: Big): Big {
        let
            deltaShiftValueToRemove = Big(dniUnit).times(dniUnitShift),
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
        const cavernBigs = gorahyan.conversionArtifacts.cavern.bigs;
        const cavernReadonly = gorahyan.conversionArtifacts.cavern.readonly;

        while ((
                (target === "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() > max) ||
                (target === "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() < min)
            ) || (
                // @ts-ignore
                target !== "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].toNumber() > max  ||
                // @ts-ignore
                target !== "vailee" && gorahyan.conversionArtifacts.cavern.bigs[target].toNumber() < min
            )) {
            let currentValue: number = (target === "vailee") ?
                    gorahyan.conversionArtifacts.cavern.bigs[target].id.toNumber() :
                    // @ts-ignore
                    gorahyan.conversionArtifacts.cavern.bigs[target].toNumber(),
                adjustedValue = 0;


            if (currentValue > max) {
                adjustedValue = -adjustByValue;
            } else if (currentValue < min) {
                adjustedValue = adjustByValue;
            }

            if(target === "vailee") {
                // @ts-ignore
                cavernBigs[target].id = cavernBigs[target].id.plus(adjustedValue);
                // @ts-ignore
                cavernReadonly[target].id = cavernBigs[target].id.toNumber();
            } else {
                // @ts-ignore
                cavernBigs[target] = cavernBigs[target].plus(adjustedValue);
                // @ts-ignore
                cavernReadonly[target] = cavernBigs[target].toNumber();
            }

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
            let
                text = DniMonthConstants[vaileeId].vaileeNameText,
                dniFontMappingText = DniMonthConstants[vaileeId].dniFontVaileeNameText;
            _setVaileeArtifacts(text, dniFontMappingText);
        } catch(err) {
            throw new Error("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");
        }
    }

    return {
        convertSurfaceTimestampToCavern: _convertSurfaceTimestampToCavern,
        tests: {
            mapVaileeName: _mapVaileeName,
            getDniConvertedTimestamp: _getDniConvertedTimestamp,
            adjustTimeValue: adjustTimeValue,
            subAdjustment: _subAdjustment
        }
    }
}