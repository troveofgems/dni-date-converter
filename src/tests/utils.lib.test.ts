import {expect, test, describe} from "@jest/globals";

import UtilsLib from "../lib/utils.lib";
import DniGorahyan from "../index";

describe("Test Suite For Utils Library", () => {
    // Library Initialized
    describe("Library Import", () => {
        test("Library Loaded", () => {
            let utilsLib = UtilsLib();
            expect(utilsLib).not.toBeNull();
        });
    });

    // Functions Exposed
    describe("Functions Exposed", () => {
        test("safeStringOperation() Function Exposed", () => {
            let utilsLib = UtilsLib();
            expect(typeof utilsLib.safeStringOperation).toBe("function");
        });
        test("safeDateOperation() Function Exposed", () => {
            let utilsLib = UtilsLib();
            expect(typeof utilsLib.safeDateOperation).toBe("function");
        });
        test("safeDateOperation() Function Exposed", () => {
            let utilsLib = UtilsLib();
            expect(typeof utilsLib.padValue).toBe("function");
        });
    });

    // Function Calls
    describe("Functions Tested", () => {
        test("safeStringOperation() Function Called", () => {
            let utilsLib: any | null = UtilsLib();
            expect(utilsLib.safeStringOperation("1991-04-21T09:54:00")).toStrictEqual("1991-04-21T09:54:00");
            utilsLib = null;
        });
        test("safeDateOperation() Function Called", () => {
            let utilsLib: any | null = UtilsLib();
            let dateToTest = new Date();
            expect(utilsLib.safeDateOperation(dateToTest)).toStrictEqual(dateToTest);
            utilsLib = null;
        });
        test("safeDateOperation() Function Called With Malformed-DateObject", () => {
            let utilsLib: any | null = UtilsLib();
            expect(() => utilsLib.safeDateOperation("non-date-object")).toThrowError("Error processing date object:");
            utilsLib = null;
        });
        test("safeDateOperation() Function Called", () => {
            let utilsLib: any | null = UtilsLib();
            expect(utilsLib.padValue(3)).toBe("03");
            utilsLib = null;
        });
    });

    describe("Failures", () => {
        test("safeStringOperation() Function Called With Non-String", () => {
            let utilsLib: any | null = UtilsLib();
            const nonStringInput = { toString: () => 'non-string' };
            expect(() => utilsLib.safeStringOperation(nonStringInput)).toThrowError("String Value is Required");
            utilsLib = null;
        });
    })
});