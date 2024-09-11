import Big from "big.js";
import {LeapSecondInterface} from "../interfaces/leap.second.interface";
import {GorahyanInterface} from "../interfaces/gorahyan.interface";

export const leapProcessingConstants: LeapSecondInterface = {
    leapSecondList: [
        2272060800, 2287785600, 2303683200, 2335219200, 2366755200, 2398291200, 2429913600, 2461449600,
        2492985600, 2524521600, 2571782400, 2603318400, 2634854400, 2698012800, 2776982400, 2840140800,
        2871676800, 2918937600, 2950473600, 2982009600, 3029443200, 3076704000, 3124137600, 3345062400,
        3439756800, 3550089600, 3644697600, 3692217600
    ],
    leapSecondListEpoch: [],
    leapSecondOffset: 10, // Ten Second Offset
    leapDelta: "1900-01-01"
};

export function attachLeapSecondData() {
    // convert LeapSecTimeStamps from NTP epoch (number of seconds since 1900-01-01 00:00:00)
    // to JavaScript / Unix (number of milliseconds since 1970-01-01 00:00:00)
    const { leapDelta, leapSecondList } = leapProcessingConstants;

    let
        buildList = leapProcessingConstants.leapSecondListEpoch.length === 0,
        delta = Date.parse(leapDelta),
        arrayLen = leapSecondList.length;

    if(buildList) {
        for (let i = 0; i < arrayLen; i += 1) {
            let
                epochConversion =  Big(leapSecondList[i]).times(1000).plus(delta),
                epochConversionAsNumber = epochConversion.toNumber(),
                addEpochConversion = !leapProcessingConstants
                    .leapSecondListEpoch
                    .includes(epochConversionAsNumber);

            if(addEpochConversion) {
                leapProcessingConstants.leapSecondListEpoch
                    .push(epochConversionAsNumber);
            }
        }
    }

    return leapProcessingConstants;
}

// List of leap second timestamps from 1972-01-01 to 2017-01-01.
// These timestamps are in units of seconds since the NTP epoch, which is 1900-01-01 00:00:00,
// and it is assumed that the number of leap seconds always increases by 1 for each entry.
// Must be converted to JavaScript / Unix timestamps! deprecated source: https://www.ietf.org/timezones/data/leap-seconds.list
// New Source List: https://data.iana.org/time-zones/data/leap-seconds.list
export function adjustForLeapSeconds(timestampInMS: Big, gorahyan: GorahyanInterface) {
    const { leapSecondListEpoch, leapSecondOffset } = gorahyan._leapSeconds;

    let leapSecs = 0;
    let arrayLen = leapSecondListEpoch.length;

    const timestamp = timestampInMS.toNumber();

    for(let i = 0; i < arrayLen && timestamp >= leapSecondListEpoch[i]; i++) {
        leapSecs++;
    }

    if(leapSecs > 0) leapSecs += leapSecondOffset - 1;

    let
        adjustBy = Big(leapSecs).times(1000),
        adjustedTimestamp = timestampInMS.plus(adjustBy);

    return adjustedTimestamp.toNumber();
}
