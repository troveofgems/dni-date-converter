import Big from "big.js";
import DniGorahyan from "../index";

import Utils from "./utils.lib";
import { adjustForLeapSeconds } from "./leap.second.lib";
import EarthMonthConstants from "../constants/earth.month.constants";
import DniMonthConstants from "../constants/dni.month.constants";


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
export function setNthBell(pahrtahvo: number): string {
    const bellSuperScripts = [
        "", "st", "nd", "rd", "th", "th", "th", "th", "th", "th",
        "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
        "th", "st", "nd", "rd", "th", "th"
    ];

    return `${pahrtahvo}${bellSuperScripts[pahrtahvo]} Bell`;
}
export function setSurfaceTimeArtifactsByString(surfaceDateTime: string, dniGorahyan: DniGorahyan) {
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

    dniGorahyan.userProvidedSurfaceTS = surfaceDateTime;
    dniGorahyan.year = year;
    dniGorahyan.monthId = monthData[0].id;
    dniGorahyan.monthText = monthData[0].monthNameText;
    dniGorahyan.day = day;
    dniGorahyan.hour = hour;
    dniGorahyan.minute = minute;
    dniGorahyan.second = second;

    let dt = new Date(year, month - 1, day);
    dt.setUTCHours(hour);
    dt.setUTCMinutes(minute + (7 * 60));
    dt.setUTCSeconds(second);
    let temp = Date.parse(dt.toISOString());

    return adjustForLeapSeconds(Big(temp), dniGorahyan.gorahyan);
}

/**
 * Internal File Methods
 * */
export function SurfaceConverterLib(dniGorahyan: DniGorahyan) {
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

        dniGorahyan.userProvidedSurfaceTS = surfaceDateTime;
        dniGorahyan.year = year;
        dniGorahyan.monthId = monthData[0].id;
        dniGorahyan.monthText = monthData[0].monthNameText;
        dniGorahyan.day = day;
        dniGorahyan.hour = hours;
        dniGorahyan.minute = minutes;
        dniGorahyan.second = seconds;

        let dt = new Date(year, month, day);
        dt.setUTCHours(hours);
        dt.setUTCMinutes(minutes + (7 * 60));
        dt.setUTCSeconds(seconds);
        let temp = Date.parse(dt.toISOString());

        return adjustForLeapSeconds(Big(temp), dniGorahyan.gorahyan);
    }
    const _convertSurfaceTimestampToCavern = function(surfaceDateTime?: Date | string | null | undefined) {
        let // Process And Store Surface Time Artifacts
            stringPassed = typeof surfaceDateTime === "string",
            dateObjectPassed = typeof surfaceDateTime === "object",
            nullOrUndefinedPassed = surfaceDateTime === undefined || surfaceDateTime === null;

        if(stringPassed) {
            let safeDateTimeString = safeStringOperation(surfaceDateTime);
            dniGorahyan.elapsedTimeForGivenDate = setSurfaceTimeArtifactsByString(safeDateTimeString, dniGorahyan);
        } else if (dateObjectPassed && !nullOrUndefinedPassed) {
            let safeDateTimeObject = safeDateOperation(surfaceDateTime);
            dniGorahyan.elapsedTimeForGivenDate = _setSurfaceTimeArtifactsByDateObject(safeDateTimeObject);
        } else {
            dniGorahyan.elapsedTimeForGivenDate = _setSurfaceTimeArtifactsByDateObject(new Date());
        }

        let earthDeltaInMS =
            Big(dniGorahyan.elapsedTimeForGivenDate)
                .minus(Big(dniGorahyan.elapsedTimeAtConvergence));

        dniGorahyan.calculatedEarthDelta = earthDeltaInMS.toNumber();

        /**
        * Calculate and Store D'ni Hahrtee / Hahr Delta
        * */
        let hahr: Big | number;
        hahr = earthDeltaInMS.div(dniGorahyan.EARTH_MS_PER_HAHR_BIG);
        hahr = Math.floor(hahr.toNumber());
        dniGorahyan.hahrtee = hahr;

        let deltaWithHahrRemoved = shiftDelta(hahr, dniGorahyan.HAHR_SHIFT_BIG, earthDeltaInMS, "HahrDelta");

        /**
        * Convert Delta to D'ni Prorahntee For Rest of Calculations
        * */
        let
            prorahnAdjustment = dniGorahyan
                .PRORAHNTEE_PER_HAHR_BIG
                .div(dniGorahyan.EARTH_MS_PER_HAHR_BIG),
            deltaInProrahntee = deltaWithHahrRemoved.times(prorahnAdjustment);

        dniGorahyan.calculatedProrahnteeDelta = deltaInProrahntee.toNumber();

        /**
        * Calculate and Store the Vailee
        * */
        let vaileeId: Big | number = deltaInProrahntee.div(dniGorahyan.VAILEE_SHIFT_BIG);
        vaileeId = Math.floor(vaileeId.toNumber());
        dniGorahyan.vaileetee = vaileeId;

        let prorahnteeDeltaWithVaileeRemoved = shiftDelta(vaileeId, dniGorahyan.VAILEE_SHIFT_BIG, deltaInProrahntee, "VaileeDelta");

        /**
        * Calculate and Store the Yahr
        * */
        let yahr: Big | number = prorahnteeDeltaWithVaileeRemoved.div(dniGorahyan.YAHR_SHIFT_BIG);
        yahr = Math.floor(yahr.toNumber());
        dniGorahyan.yahrtee = yahr;

        let prorahnteeDeltaWithYahrRemoved = shiftDelta(yahr, dniGorahyan.YAHR_SHIFT_BIG, prorahnteeDeltaWithVaileeRemoved, "YahrDelta");

        /**
        * Calculate and Store the Gahrtahvo
        * */
        let gahrtahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(dniGorahyan.GAHRTAHVO_SHIFT_BIG);
        gahrtahvo = Math.floor(gahrtahvo.toNumber());
        dniGorahyan.gahrtahvotee = gahrtahvo;

        let prorahnteeDeltaWithGartahvoRemoved = shiftDelta(gahrtahvo, dniGorahyan.GAHRTAHVO_SHIFT_BIG, prorahnteeDeltaWithYahrRemoved, "GahrtahvoDelta");

        /**
         * Calculate and Store the Pahrtahvo
         * */
        let pahrtahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(dniGorahyan.PAHRTAHVO_SHIFT_BIG);
        pahrtahvo = Math.floor(pahrtahvo.toNumber());
        dniGorahyan.pahrtahvotee = pahrtahvo;

        /**
        * Calculate and Store the Tahvo
        * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved.div(dniGorahyan.TAHVO_SHIFT_BIG);
        tahvo = Math.floor(tahvo.toNumber());
        dniGorahyan.tahvotee = tahvo;

        let prorahnteeDeltaWithTahvoRemoved = shiftDelta(tahvo, dniGorahyan.TAHVO_SHIFT_BIG, prorahnteeDeltaWithGartahvoRemoved, "TahvoDelta");

        /**
        * Calculate and Store the Gorahn
        * */
        let gorahn: Big | number = prorahnteeDeltaWithTahvoRemoved.div(dniGorahyan.GORAHN_SHIFT_BIG);
        gorahn = Math.floor(gorahn.toNumber());
        dniGorahyan.gorahntee = gorahn;

        let prorahnteeDeltaWithGorahnRemoved = shiftDelta(gorahn, dniGorahyan.GORAHN_SHIFT_BIG, prorahnteeDeltaWithTahvoRemoved, "GorahnDelta");

        /**
        * Calculate and Store the Prorahn
        * */
        dniGorahyan.prorahntee = Math.floor(prorahnteeDeltaWithGorahnRemoved.toNumber());

        /**
        * Adjust All Calculated Times As Needed And Return Final TS Value
        * */
        adjustCalculatedTimes();
        setDniConvertedTimestamp();
        return dniGorahyan;
    }

    const shiftDelta = function(dniUnit: number, dniUnitShift: Big, currentDelta: Big, shiftFor: string): Big {
        let
            deltaShiftValueToRemove = Big(dniUnit).times(dniUnitShift),
            remainingDelta: Big | number = currentDelta.minus(deltaShiftValueToRemove);

        // @ts-ignore
        dniGorahyan[`calculated${shiftFor}`] = remainingDelta.toNumber();

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
            dniGorahyan.vaileetee = Big(dniGorahyan.vaileetee)
                .plus(adjustment)
                .toNumber();
        } else {
            // @ts-ignore
            dniGorahyan[`${adjustsFor}tee`] = Big(dniGorahyan[`${adjustsFor}tee`])
                .plus(adjustment)
                .toNumber();
        }
    }
    const adjustTimeValue = function(unitOfTime: string) {
        while ((
                (unitOfTime === "vailee" && dniGorahyan.vaileetee > dniGorahyan.VAILEE_MAX) ||
                (unitOfTime === "vailee" && dniGorahyan.vaileetee < dniGorahyan.VAILEE_MIN)
            ) || (
                // @ts-ignore
                unitOfTime !== "vailee" && dniGorahyan[`${unitOfTime}tee`] > dniGorahyan[`${unitOfTime.toUpperCase()}_MAX`]  ||
                // @ts-ignore
                unitOfTime !== "vailee" && dniGorahyan[`${unitOfTime}tee`] < dniGorahyan[`${unitOfTime.toUpperCase()}_MIN`]
            )) {

            let // @ts-ignore
                minValue = dniGorahyan[`${unitOfTime.toUpperCase()}_MIN`],
                // @ts-ignore
                maxValue = dniGorahyan[`${unitOfTime.toUpperCase()}_MAX`],
                currentValue: number = (unitOfTime === "vailee") ?
                    dniGorahyan.vaileetee :
                    // @ts-ignore
                    dniGorahyan[`${unitOfTime}tee`];

            let adjustedValue = 0;

            // @ts-ignore
            if (currentValue > maxValue) {
                adjustedValue = -maxValue;
            } else if (currentValue < minValue) {
                adjustedValue = maxValue;
            }

            if(unitOfTime === "vailee") {
                dniGorahyan.vaileetee = Big(dniGorahyan.vaileetee)
                    .plus(adjustedValue)
                    .toNumber();
            } else {
                // @ts-ignore
                dniGorahyan[`${unitOfTime}tee`] = Big(dniGorahyan[`${unitOfTime}tee`])
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
        dniGorahyan.hahrtee = Big(dniGorahyan.hahrtee)
            .plus(dniGorahyan.DNI_HAHR_REFERENCE_BIG)
            .toNumber();

        // Always Increment Pahrtahvo By 1 After Date Conversion
        dniGorahyan.pahrtahvotee = Big(dniGorahyan.pahrtahvotee)
            .plus(1)
            .toNumber();

        // Always Increment Yahr By 1 After Date Conversion
        dniGorahyan.yahrtee = Big(dniGorahyan.yahrtee)
            .plus(1)
            .toNumber();
    }

    const setDniConvertedTimestamp = function() {
        dniGorahyan.systemProvidedSurfaceTS = dniGorahyan.timestampFormatter(dniGorahyan);
        return dniGorahyan;
    }

    const setFullVaileeData = function() {
        try {
            let data = DniMonthConstants[dniGorahyan.vaileetee];

            dniGorahyan.vaileeTextName = data.vaileeNameText;
            dniGorahyan.vaileeDniFontMappingName = data.dniFontVaileeNameText;
        } catch(err) {
            throw new Error("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");
        }
    }

    return {
        convertSurfaceTimestampToCavern: _convertSurfaceTimestampToCavern,
        tests: {
            setFullVaileeData,
            setDniConvertedTimestamp,
            adjustTimeValue,
            subAdjustment: _subAdjustment
        }
    }
}