import {expect, test, describe} from "@jest/globals";
import { attachLeapSecondData, adjustForLeapSeconds } from "../lib/leap.second.lib";

import {leapProcessingConstants} from "../lib/leap.second.lib";

describe("Test Suite For Leap Second Library and Constants", () => {
    // Functions Loaded
    describe("Functions Loaded", () => {
        test("attachLeapSecondData() Function Loaded", () => {
            expect(typeof attachLeapSecondData).toBe("function");
        });
        test("adjustForLeapSeconds() Function Loaded", () => {
            expect(typeof adjustForLeapSeconds).toBe("function");
        });
    });

    // Constants Tested
    describe("Constants Tested", () => {
        test("leapProcessingConstants - leapDelta", () => {
            expect(leapProcessingConstants.leapDelta).toEqual("1900-01-01");
        });
        test("leapProcessingConstants - leapSecondOffset", () => {
            expect(leapProcessingConstants.leapSecondOffset).toEqual(10);
        });
        test("leapProcessingConstants - leapSecondList", () => {
            expect(leapProcessingConstants.leapSecondList).toStrictEqual([
                2272060800, 2287785600, 2303683200, 2335219200, 2366755200, 2398291200, 2429913600, 2461449600,
                2492985600, 2524521600, 2571782400, 2603318400, 2634854400, 2698012800, 2776982400, 2840140800,
                2871676800, 2918937600, 2950473600, 2982009600, 3029443200, 3076704000, 3124137600, 3345062400,
                3439756800, 3550089600, 3644697600, 3692217600
            ]);
        });
        test("leapProcessingConstants - Initial Value leapSecondListEpoch: []", () => {
            expect(leapProcessingConstants.leapSecondListEpoch.length).toEqual(0);
        });
    })

    // Function Calls
    describe("Functions Tested", () => {
        test("attachLeapSecondData() Called. LeapSecondListEpoch List Generated", () => {
           let processedConstants = attachLeapSecondData();
           expect(processedConstants.leapSecondListEpoch.length).toEqual(leapProcessingConstants.leapSecondList.length);
        });
    });

    // TODO: Create Test For adjustForLeapSeconds()
});