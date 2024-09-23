import {describe, expect, test} from "@jest/globals";
import { toBase25, getDniNumberFromFont } from "../lib/base.25.lib";

describe("Test Suite For Base25 Library", () => {
    // Library Loaded
    describe("Library Loaded", () => {
        test("Successfully Loaded toBase25()", () => {
            expect(typeof toBase25).toBe("function");
        });
        test("Successfully Loaded getDniNumberFromFont()", () => {
            expect(typeof getDniNumberFromFont).toBe("function");
        });
    });

    // Functions Called
    describe("Functions Called", () => {
        test("getDniNumberFromFont('*') Function Called", () => {
            let test = getDniNumberFromFont("*");
            expect(test).toEqual(18);
        });
        test("getDniNumberFromFont(':') Function Called With Invalid Font Mapper Number", () => {
            let test = getDniNumberFromFont(":");
            expect(test).toEqual(":");
        });
        test("toBase25(1) Function Called", () => {
            let test = toBase25(1);
            expect(test).toEqual("1");
        });
        test("toBase25(17) Function Called", () => {
            let test = toBase25(17);
            expect(test).toEqual("&");
        });
        test("toBase25(25) Function Called", () => {
            let test = toBase25(25);
            expect(test).toEqual("10");
        });
    });
});