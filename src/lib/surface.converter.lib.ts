import Big from "big.js";

import DniMonthConstants from "../constants/dni.month.constants";

import Utils from "./utils.lib";
import { adjustForLeapSeconds } from "./leap.second.lib";
import {DniGorahyan} from "../index";
import EarthMonthConstants from "../constants/earth.month.constants";

/**
 * Default File Export
 * */
export default function convertSurfaceTimestampToDniCavernTimestamp(dniGorahyan: DniGorahyan) {
    const { convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
    return convertSurfaceTimestampToCavern;
}

/**
 * Helper Exports
 * */
export function setSurfaceTimeArtifactsByString(surfaceDateTime: string, gorahyan: DniGorahyan) {
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
    
    const monthData = EarthMonthConstants.filter(item => item.id === (month - 1));

    gorahyan.userProvidedTS = surfaceDateTime;
    gorahyan.year = year;
    gorahyan.monthId = monthData[0].id;
    gorahyan.monthText = monthData[0].monthNameText;
    gorahyan.day = day;
    gorahyan.hour = hour;
    gorahyan.minute = minute;
    gorahyan.second = second;

    let dt = new Date(year, month - 1, day);
    dt.setUTCHours(hour);
    dt.setUTCMinutes(minute + (7 * 60));
    dt.setUTCSeconds(second);
    let temp = Date.parse(dt.toISOString());

    return adjustForLeapSeconds(Big(temp), gorahyan.gorahyan);
}

/**
 * Internal File Methods
 * */
export function SurfaceConverterLib(gorahyan: DniGorahyan) {
    const { safeDateOperation, safeStringOperation, padValue } = Utils();

    const _setSurfaceTimeArtifactsByDateObject = function(surfaceDateTime: Date) {
        const
            year = surfaceDateTime.getUTCFullYear(),
            month = surfaceDateTime.getMonth(),
            day = surfaceDateTime.getDate(),
            hours = surfaceDateTime.getHours(),
            minutes = surfaceDateTime.getMinutes(),
            seconds = surfaceDateTime.getSeconds();

        const monthData = EarthMonthConstants.filter(item => item.id === month);

        gorahyan.userProvidedTS = surfaceDateTime;
        gorahyan.year = year;
        gorahyan.monthId = monthData[0].id;
        gorahyan.monthText = monthData[0].monthNameText;
        gorahyan.day = day;
        gorahyan.hour = hours;
        gorahyan.minute = minutes;
        gorahyan.second = seconds;

        let dt = new Date(year, month, day);
        dt.setUTCHours(hours);
        dt.setUTCMinutes(minutes + (7 * 60));
        dt.setUTCSeconds(seconds);
        let temp = Date.parse(dt.toISOString());

        return adjustForLeapSeconds(Big(temp), gorahyan.gorahyan);
    }
    const _convertSurfaceTimestampToCavern = function(
        surfaceDateTime?: Date | string | null | undefined,
        useDniFontMapping: boolean = false,
        showNthBell: boolean = true,
        timestampFormat: number | string = 0
    ) {
        let // Process And Store Surface Time Artifacts
            stringPassed = typeof surfaceDateTime === "string",
            dateObjectPassed = typeof surfaceDateTime === "object",
            nullOrUndefinedPassed = surfaceDateTime === undefined || surfaceDateTime === null;

        if(stringPassed) {
            let safeDateTimeString = safeStringOperation(surfaceDateTime);
            gorahyan.elapsedTimeForGivenDate = setSurfaceTimeArtifactsByString(safeDateTimeString, gorahyan);
        } else if (dateObjectPassed && !nullOrUndefinedPassed) {
            let safeDateTimeObject = safeDateOperation(surfaceDateTime);
            gorahyan.elapsedTimeForGivenDate = _setSurfaceTimeArtifactsByDateObject(safeDateTimeObject);
        } else {
            gorahyan.elapsedTimeForGivenDate = _setSurfaceTimeArtifactsByDateObject(new Date());
        }

        let earthDeltaInMS =
            Big(gorahyan.elapsedTimeForGivenDate)
                .minus(Big(gorahyan.elapsedTimeAtConvergence));

        gorahyan.calculatedEarthDelta = earthDeltaInMS.toNumber();

        /**
        * Calculate and Store D'ni Hahrtee / Hahr Delta
        * */
        let hahr: Big | number;
        hahr = earthDeltaInMS.div(gorahyan.EARTH_MS_PER_HAHR_BIG);
        hahr = Math.floor(hahr.toNumber());
        gorahyan.hahrtee = hahr;

        let deltaWithHahrRemoved = shiftDelta(hahr, gorahyan.HAHR_SHIFT_BIG, earthDeltaInMS, "HahrDelta");

        /**
        * Convert Delta to D'ni Prorahntee For Rest of Calculations
        * */
        let
            prorahnAdjustment = gorahyan
                .PRORAHNTEE_PER_HAHR_BIG
                .div(gorahyan.EARTH_MS_PER_HAHR_BIG),
            deltaInProrahntee = deltaWithHahrRemoved.times(prorahnAdjustment);

        gorahyan.calculatedProrahnteeDelta = deltaInProrahntee.toNumber();

        /**
        * Calculate and Store the Vailee
        * */
        let vaileeId: Big | number = deltaInProrahntee.div(gorahyan.VAILEE_SHIFT_BIG);
        vaileeId = Math.floor(vaileeId.toNumber());
        gorahyan.vaileetee = vaileeId;

        let prorahnteeDeltaWithVaileeRemoved = shiftDelta(vaileeId, gorahyan.VAILEE_SHIFT_BIG, deltaInProrahntee, "VaileeDelta");

        /**
        * Calculate and Store the Yahr
        * */
        let yahr: Big | number = prorahnteeDeltaWithVaileeRemoved.div(gorahyan.YAHR_SHIFT_BIG);
        yahr = Math.floor(yahr.toNumber());
        gorahyan.yahrtee = yahr;

        let prorahnteeDeltaWithYahrRemoved = shiftDelta(yahr, gorahyan.YAHR_SHIFT_BIG, prorahnteeDeltaWithVaileeRemoved, "YahrDelta");

        /**
        * Calculate and Store the Gahrtahvo
        * */
        let gahrtahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(gorahyan.GAHRTAHVO_SHIFT_BIG);
        gahrtahvo = Math.floor(gahrtahvo.toNumber());
        gorahyan.gahrtahvotee = gahrtahvo;

        let prorahnteeDeltaWithGartahvoRemoved = shiftDelta(gahrtahvo, gorahyan.GAHRTAHVO_SHIFT_BIG, prorahnteeDeltaWithYahrRemoved, "GahrtahvoDelta");

        /**
         * Calculate and Store the Pahrtahvo
         * */
        let pahrtahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(gorahyan.PAHRTAHVO_SHIFT_BIG);
        pahrtahvo = Math.floor(pahrtahvo.toNumber());
        gorahyan.pahrtahvotee = pahrtahvo;

        /**
        * Calculate and Store the Tahvo
        * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved.div(gorahyan.TAHVO_SHIFT_BIG);
        tahvo = Math.floor(tahvo.toNumber());
        gorahyan.tahvotee = tahvo;

        let prorahnteeDeltaWithTahvoRemoved = shiftDelta(tahvo, gorahyan.TAHVO_SHIFT_BIG, prorahnteeDeltaWithGartahvoRemoved, "TahvoDelta");

        /**
        * Calculate and Store the Gorahn
        * */
        let gorahn: Big | number = prorahnteeDeltaWithTahvoRemoved.div(gorahyan.GORAHN_SHIFT_BIG);
        gorahn = Math.floor(gorahn.toNumber());
        gorahyan.gorahntee = gorahn;

        let prorahnteeDeltaWithGorahnRemoved = shiftDelta(gorahn, gorahyan.GORAHN_SHIFT_BIG, prorahnteeDeltaWithTahvoRemoved, "GorahnDelta");

        /**
        * Calculate and Store the Prorahn
        * */
        gorahyan.prorahntee = Math.floor(prorahnteeDeltaWithGorahnRemoved.toNumber());

        /**
        * Adjust All Calculated Times As Needed And Return Final TS Value
        * */
        adjustCalculatedTimes();
        return _getDniConvertedTimestamp(useDniFontMapping);
    }

    const shiftDelta = function(dniUnit: number, dniUnitShift: Big, currentDelta: Big, shiftFor: string): Big {
        let
            deltaShiftValueToRemove = Big(dniUnit).times(dniUnitShift),
            remainingDelta: Big | number = currentDelta.minus(deltaShiftValueToRemove);

        // @ts-ignore
        gorahyan[`calculated${shiftFor}`] = remainingDelta.toNumber();

        return remainingDelta;
    }

    const adjustCalculatedTimes = function() {
        adjustTimeValue('prorahn');
        adjustTimeValue('gorahn');
        adjustTimeValue('tahvo');
        adjustTimeValue('gartahvo');
        adjustTimeValue('yahr');
        adjustTimeValue('vailee');
        setFullVaileeData();
        finalCalendarAdjustments();
    }
    const _subAdjustment = function(adjustsFor: string, currentValue: number, min: number, max: number) {
        let adjustment = 0;
        if(currentValue > max) {
            adjustment = 1;
        } else if (currentValue < min) {
            adjustment = -1;
        }

        if(adjustsFor === "vailee") {
            gorahyan.vaileetee = Big(gorahyan.vaileetee)
                .plus(adjustment)
                .toNumber();
        } else {
            // @ts-ignore
            gorahyan[`${adjustsFor}tee`] = Big(gorahyan[`${adjustsFor}tee`])
                .plus(adjustment)
                .toNumber();
        }
    }
    const adjustTimeValue = function(unitOfTime: string) {
        while ((
                (unitOfTime === "vailee" && gorahyan.vaileetee > gorahyan.VAILEE_MAX) ||
                (unitOfTime === "vailee" && gorahyan.vaileetee < gorahyan.VAILEE_MIN)
            ) || (
                // @ts-ignore
                unitOfTime !== "vailee" && gorahyan[`${unitOfTime}tee`] > gorahyan[`${unitOfTime.toUpperCase()}_MAX`]  ||
                // @ts-ignore
                unitOfTime !== "vailee" && gorahyan[`${unitOfTime}tee`] < gorahyan[`${unitOfTime.toUpperCase()}_MIN`]
            )) {

            let // @ts-ignore
                minValue = gorahyan[`${unitOfTime.toUpperCase()}_MIN`],
                // @ts-ignore
                maxValue = gorahyan[`${unitOfTime.toUpperCase()}_MAX`],
                currentValue: number = (unitOfTime === "vailee") ?
                    gorahyan.vaileetee :
                    // @ts-ignore
                    gorahyan[`${unitOfTime}tee`];

            let adjustedValue = 0;

            // @ts-ignore
            if (currentValue > maxValue) {
                adjustedValue = -maxValue;
            } else if (currentValue < minValue) {
                adjustedValue = maxValue;
            }

            if(unitOfTime === "vailee") {
                gorahyan.vaileetee = Big(gorahyan.vaileetee)
                    .plus(adjustedValue)
                    .toNumber();
            } else {
                // @ts-ignore
                gorahyan[`${unitOfTime}tee`] = Big(gorahyan[`${unitOfTime}tee`])
                    .plus(adjustedValue)
                    .toNumber();
            }

            // Sub-processing when a main component is adjusted
            switch(unitOfTime) {
                case "prorahn":
                    _subAdjustment("gorahn", currentValue, minValue, maxValue);
                    break;
                case "gorahn":
                    _subAdjustment("tahvo", currentValue, minValue, maxValue);
                    break;
                case "tahvo":
                    _subAdjustment("gartahvo", currentValue, minValue, maxValue);
                    break;
                case "gartahvo":
                    _subAdjustment("yahr", currentValue, minValue, maxValue);
                    break;
                case "yahr":
                    _subAdjustment("vailee", currentValue, minValue, maxValue);
                    break;
                case "vailee":
                    _subAdjustment("hahr", currentValue, minValue, maxValue);
                    break;
            }
        }
    }
    const finalCalendarAdjustments = function() {
        // Final Calendar Adjustments
        // Always Increment Hahr By 9647 After Date Conversion
        gorahyan.hahrtee = Big(gorahyan.hahrtee)
            .plus(gorahyan.DNI_HAHR_REFERENCE_BIG)
            .toNumber();

        // Always Increment Pahrtahvo By 1 After Date Conversion
        gorahyan.pahrtahvotee = Big(gorahyan.pahrtahvotee)
            .plus(1)
            .toNumber();

        // Always Increment Yahr By 1 After Date Conversion
        gorahyan.yahrtee = Big(gorahyan.yahrtee)
            .plus(1)
            .toNumber();
    }

    const _getDniConvertedTimestamp = function(useDniFontMapping: boolean = false) {
        let
            constructedDate = "",
            constructedTime = "",
            constructedBell = _getNthBell(gorahyan.pahrtahvotee),
            paddedTahvo = padValue(gorahyan.tahvotee),
            paddedGorahn = padValue(gorahyan.gorahntee),
            paddedProrahn = padValue(gorahyan.prorahntee),
            dateIsBE = gorahyan.hahrtee < 0,
            resolvedVaileeText = useDniFontMapping ? gorahyan.vaileeDniFontMappingName : gorahyan.vaileeTextName

        if(dateIsBE) {
            constructedDate = resolvedVaileeText + " " + gorahyan.yahrtee + " " + (gorahyan.hahrtee * -1) + " BE ";
            constructedTime = gorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
        } else {
            constructedDate = resolvedVaileeText + " " + gorahyan.yahrtee + " " + gorahyan.hahrtee + " DE ";
            constructedTime = gorahyan.gahrtahvotee + ":" + paddedTahvo + ":" + paddedGorahn + ":" + paddedProrahn;
        }

        gorahyan.systemProvidedTS = `${constructedDate}${constructedTime} - ${constructedBell}`;
        return gorahyan;
    }

    const _getNthBell = function(pahrtahvo: number): string {
        const bellSuperScripts = [
            "", "st", "nd", "rd", "th", "th", "th", "th", "th", "th",
            "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
            "th", "st", "nd", "rd", "th", "th"
        ];

        return `${pahrtahvo}${bellSuperScripts[pahrtahvo]} Bell`;
    }

    const setFullVaileeData = function() {
        try {
            let data = DniMonthConstants[gorahyan.vaileetee];

            gorahyan.vaileeTextName = data.vaileeNameText;
            gorahyan.vaileeDniFontMappingName = data.dniFontVaileeNameText;
        } catch(err) {
            throw new Error("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");
        }
    }

    return {
        convertSurfaceTimestampToCavern: _convertSurfaceTimestampToCavern,
        tests: {
            setFullVaileeData,
            getDniConvertedTimestamp: _getDniConvertedTimestamp,
            adjustTimeValue: adjustTimeValue,
            subAdjustment: _subAdjustment
        }
    }
}