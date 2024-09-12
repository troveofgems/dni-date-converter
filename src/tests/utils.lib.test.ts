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
        let utilsLib = UtilsLib();
        test("safeStringOperation() Function Exposed", () => {
            expect(typeof utilsLib.safeStringOperation).toBe("function");
        });
        test("safeDateOperation() Function Exposed", () => {
            expect(typeof utilsLib.safeDateOperation).toBe("function");
        });
        test("safeDateOperation() Function Exposed", () => {
            expect(typeof utilsLib.padValue).toBe("function");
        });
    });

    // Function Calls
    describe("Functions Tested", () => {
        let utilsLib = UtilsLib();
        test("safeStringOperation() Function Called", () => {
            expect(utilsLib.safeStringOperation("1991-04-21T09:54:00")).toStrictEqual("1991-04-21T09:54:00");
        });
        test("safeStringOperation() Function Called With Non-String", () => {
            const nonStringInput = { toString: () => 'non-string' };
            expect(() => utilsLib.safeStringOperation(nonStringInput)).toThrowError("String Value is Required");
        });
        test("safeDateOperation() Function Called", () => {
            let dateToTest = new Date();
            expect(utilsLib.safeDateOperation(dateToTest)).toStrictEqual(dateToTest);
        });
        test("safeDateOperation() Function Called With Malformed-DateObject", () => {
            expect(() => utilsLib.safeDateOperation("non-date-object")).toThrowError("Error processing date object:");
        });
        test("safeDateOperation() Function Called", () => {
            expect(utilsLib.padValue(3)).toBe("03");
        });
    });
});