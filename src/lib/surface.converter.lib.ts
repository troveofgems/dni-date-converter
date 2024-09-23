import Big from "big.js";
import DniGorahyan from "../index";

import Utils from "./utils.lib";
import { adjustForLeapSeconds } from "./leap.second.lib";
import EarthMonthConstants from "../constants/earth.month.constants";
import DniMonthConstants from "../constants/dni.month.constants";

import { TimestampFormatLoaders } from "./timestamp.format.lib";


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

    return `${pahrtahvo}${bellSuperScripts[pahrtahvo]}`;
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
    dniGorahyan.timeFragment = {
        type: "year",
        value: year,
        source: "surface"
    };
    dniGorahyan.monthId = monthData[0].id;
    dniGorahyan.monthText = monthData[0].monthNameText;
    dniGorahyan.timeFragment = {
        type: "day",
        value: day,
        source: "surface"
    };
    dniGorahyan.timeFragment = {
        type: "hour",
        value: hour,
        source: "surface"
    };;
    dniGorahyan.timeFragment = {
        type: "minute",
        value: minute,
        source: "surface"
    };;
    dniGorahyan.timeFragment = {
        type: "second",
        value: second,
        source: "surface"
    };;

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
        let deltaWithHahrRemoved = storeAndShiftDniTimeFragment(
            earthDeltaInMS,
            dniGorahyan.EARTH_MS_PER_HAHR_BIG,
            { type: "hahr", source: "cavern" }
        );

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
        let vaileeId: number = deltaInProrahntee
            .div(dniGorahyan.VAILEE_SHIFT_BIG)
            .round(Big.roundDown)
            .toNumber();

        dniGorahyan.vaileetee = vaileeId;

        let prorahnteeDeltaWithVaileeRemoved = shiftDelta(vaileeId, dniGorahyan.VAILEE_SHIFT_BIG, deltaInProrahntee, "vailee");

        /**
         * Calculate and Store the Yahr
         * */
        let value: Big | number = prorahnteeDeltaWithVaileeRemoved
                .div(dniGorahyan.YAHR_SHIFT_BIG).round(0, Big.roundDown).toNumber();

        dniGorahyan.timeFragment = {
            type: "yahr",
            value,
            source: "cavern"
        };

        let prorahnteeDeltaWithYahrRemoved =  shiftDelta(value, dniGorahyan.YAHR_SHIFT_BIG, prorahnteeDeltaWithVaileeRemoved, "yahr");

        /**
         * Calculate and Store the Gahrtahvo
         * */
        let prorahnteeDeltaWithGartahvoRemoved = storeAndShiftDniTimeFragment(
            prorahnteeDeltaWithYahrRemoved,
            dniGorahyan.GAHRTAHVO_SHIFT_BIG,
            { type: "gahrtahvo", source: "cavern" }
        );

        /**
         * Calculate and Store the Pahrtahvo
         * */
        let pahrtahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(dniGorahyan.PAHRTAHVO_SHIFT_BIG);
        pahrtahvo = Math.floor(pahrtahvo.toNumber());
        dniGorahyan.timeFragment = {
            type: "pahrtahvo",
            value: pahrtahvo,
            source: "cavern"
        };

        /**
         * Calculate and Store the Tahvo
         * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved
            .div(dniGorahyan.TAHVO_SHIFT_BIG).round(0, Big.roundDown).toNumber();

        let prorahnteeDeltaWithTahvoRemoved = storeAndShiftDniTimeFragment(
            prorahnteeDeltaWithGartahvoRemoved,
            dniGorahyan.TAHVO_SHIFT_BIG,
            { type: "tahvo", source: "cavern" }
        );

        /**
         * Calculate and Store the Gorahn
         * */
        let prorahnteeDeltaWithGorahnRemoved = storeAndShiftDniTimeFragment(
            prorahnteeDeltaWithTahvoRemoved,
            dniGorahyan.GORAHN_SHIFT_BIG,
            { type: "gorahn", source: "cavern" }
        );

        /**
         * Calculate and Store the Prorahn
         * */
        dniGorahyan.timeFragment = {
            type: "prorahn",
            value: prorahnteeDeltaWithGorahnRemoved.round(0, Big.roundDown).toNumber(),
            source: "cavern"
        };

        /**
         * Adjust All Calculated Times As Needed And Return Final TS Value
         * */
        adjustCalculatedTimes();
        setDniConvertedTimestamp();
        return dniGorahyan;
    }

    const { safeDateOperation, safeStringOperation } = Utils();
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
        dniGorahyan.timeFragment = {
            type: "year",
            value: year,
            source: "surface"
        };
        dniGorahyan.monthId = monthData[0].id;
        dniGorahyan.monthText = monthData[0].monthNameText;
        dniGorahyan.timeFragment = {
            type: "day",
            value: day,
            source: "surface"
        };
        dniGorahyan.timeFragment = {
            type: "hour",
            value: hours,
            source: "surface"
        };
        dniGorahyan.timeFragment = {
            type: "minute",
            value: minutes,
            source: "surface"
        };
        dniGorahyan.timeFragment = {
            type: "second",
            value: seconds,
            source: "surface"
        };

        let dt = new Date(year, month, day);
        dt.setUTCHours(hours);
        dt.setUTCMinutes(minutes + (7 * 60));
        dt.setUTCSeconds(seconds);
        let temp = Date.parse(dt.toISOString());

        return adjustForLeapSeconds(Big(temp), dniGorahyan.gorahyan);
    }
    const storeAndShiftDniTimeFragment = function(delta: Big, shift: Big, passedFragment: { type: string, source: string }) {
        let
            { type, source } = passedFragment,
            value = delta
                .div(shift)
                .round(0, Big.roundDown)
                .toNumber(),
            shiftFor = type.charAt(0).toUpperCase() + type.slice(1);

        // Store The Fragment Value
        dniGorahyan.timeFragment = { type, value, source };

        // Return the Shifted Delta After Fragment Processing
        return shiftDelta(value, shift, delta, `${shiftFor}Delta`);
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
            let newValue = Big(dniGorahyan[`${adjustsFor}tee`])
                .plus(adjustment)
                .toNumber();

            dniGorahyan.timeFragment = {
                type: adjustsFor,
                value: newValue,
                source: "cavern"
            };
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
                let numberValue = dniGorahyan[`${unitOfTime}tee`],
                    newValue = Big(numberValue)
                        .plus(adjustedValue)
                        .toNumber();

                dniGorahyan.timeFragment = {
                    type: unitOfTime,
                    value: newValue,
                    source: "cavern"
                };
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
                    _subAdjustment("gahrtahvo", currentValue, minValue, maxValue);
                    break;
                case "gahrtahvo":
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
        dniGorahyan.timeFragment = {
            type: "hahr",
            value: Big(dniGorahyan.hahrtee)
                .plus(dniGorahyan.DNI_HAHR_REFERENCE_BIG)
                .toNumber(),
            source: "cavern"
        };

        // Always Increment Pahrtahvo By 1 After Date Conversion
        dniGorahyan.timeFragment = {
            type: "pahrtahvo",
            value: Big(dniGorahyan.pahrtahvotee)
                .plus(1)
                .toNumber(),
            source: "cavern"
        };

        // Always Increment Yahr By 1 After Date Conversion
        dniGorahyan.timeFragment = {
            type: "yahr",
            value: Big(dniGorahyan.yahrtee)
                .plus(1)
                .toNumber(),
            source: "cavern"
        };
    }
    const setDniConvertedTimestamp = function() {
        let format = TimestampFormatLoaders(dniGorahyan);
        dniGorahyan.systemProvidedSurfaceTS = format.dniDateTimeStringFormatter();
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