import {describe, expect, test} from "@jest/globals";

import DniGorahyan from "../index";

describe("Interface Test Suite", () => {
    describe("DniGorahyan Instantiation", () => {
        test("Class DniGorahyan{} Instantiated", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated).not.toBe(null);
        });
    });

    describe("Gorahyan Initialization", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Gorahyan Initialized", () => {
            expect(typeof dniGorahyanInstantiated.gorahyan).toBe("object");
        });
    });

    describe("DniGorahyan Function Definitions", () => {
        test("surfaceToCavernTimeConverter() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.surfaceToCavernTime).toBe("function");
        });
        test("cavernToSurfaceTimeConverter() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.cavernToSurfaceTime).toBe("function");
        });
        test("runControlTests() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.runControlTests).toBe("function");
        });
    });

    describe("DniGorahyan surfaceToCavernTimeConverter() Function Calls", () => {
        test("surfaceToCavernTimeConverter() Called With No Arguments Passed", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            const surfaceToCavernTimeSpy = jest.spyOn(dniGorahyanInstantiated, "surfaceToCavernTime");
            const result = dniGorahyanInstantiated.surfaceToCavernTime();

            expect(typeof result).toBe("string");

            // Check the spy if the method was called correctly.
            expect(surfaceToCavernTimeSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            surfaceToCavernTimeSpy.mockClear();
        });
        test("surfaceToCavernTimeConverter('1991-04-21T09:54:00') Called With DateString Passed", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            const surfaceToCavernTimeSpy = jest.spyOn(dniGorahyanInstantiated, "surfaceToCavernTime");

            const result = dniGorahyanInstantiated.surfaceToCavernTime("1991-04-21T09:54:00");

            expect(result).toBe("Leefo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(surfaceToCavernTimeSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            surfaceToCavernTimeSpy.mockClear();
        });
        test("surfaceToCavernTimeConverter(new Date('1991-04-21T09:54:00')) Called With DateObject Passed", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            const surfaceToCavernTimeSpy = jest.spyOn(dniGorahyanInstantiated, "surfaceToCavernTime");

            const result = dniGorahyanInstantiated.surfaceToCavernTime(new Date("1991-04-21T09:54:00"));

            expect(result).toBe("Leefo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(surfaceToCavernTimeSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            surfaceToCavernTimeSpy.mockClear();
        });
    });

    describe("DniGorahyan cavernToSurfaceTimeConverter() Function Calls", () => {
        test("cavernToSurfaceTimeConverter() Called With D'ni DateTime String Passed", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            const cavernToSurfaceTimeSpy = jest.spyOn(dniGorahyanInstantiated, "cavernToSurfaceTime");
            const result = dniGorahyanInstantiated.cavernToSurfaceTime("Leefo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(cavernToSurfaceTimeSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            cavernToSurfaceTimeSpy.mockClear();
        });
    });

    describe("DniGorahyan runControlTests() Function Call", () => {
        test("runControlTests() Called", () => {
            const
                dniGorahyanInstantiated = new DniGorahyan(),
                runControlTestsSpy = jest.spyOn(dniGorahyanInstantiated, "runControlTests"),
                callResults = dniGorahyanInstantiated.runControlTests();

            // Result Should Be Object With Runtime Statistics and Function Results
            expect(typeof callResults).toBe("object");

            // Test Return Values For Known Tests
            expect(callResults.generated.first_test).toBe("Leefo 1 9647 DE 0:00:00:00");
            expect(callResults.generated.second_test).toBe("Leefo 1 9647 DE 0:00:00:00");
            expect(typeof callResults.generated.third_test).toBe("string");

            // Check the spy if the method was called correctly.
            expect(runControlTestsSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            runControlTestsSpy.mockClear();
        });
    });

    describe("DniGorahyan Uninitialized Value Detected", () => {
        test("Catastrophic Program Error", () => {
            const dniGorahyanInstantiated = new DniGorahyan();

            const
               runControlTestSpy = jest.spyOn(dniGorahyanInstantiated, "simulateCatastrophicObjectFailure"),
               callResults = dniGorahyanInstantiated.simulateCatastrophicObjectFailure();

            expect(callResults).toEqual("Catastrophic Failure Caught.");

            // Check the spy if the method was called correctly.
            expect(runControlTestSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            runControlTestSpy.mockClear();
        });
    });
});