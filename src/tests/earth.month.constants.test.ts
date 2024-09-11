import {describe, expect, test} from "@jest/globals";
import EarthMonthConstants from "../constants/earth.month.constants";

describe("Earth Month Artifact Constants", () => {
    let earthMonthConstants = EarthMonthConstants;

    test("Earth Month List Loaded", () => {
        expect(typeof earthMonthConstants).not.toBeUndefined();
    });

    test("Earth Month: 1 - January", () => {
        expect(earthMonthConstants[0].monthNameText).toBe("January");
    });
    test("Earth Month: 2 - February", () => {
        expect(earthMonthConstants[1].monthNameText).toBe("February");
    });
    test("Earth Month: 3 - March", () => {
        expect(earthMonthConstants[2].monthNameText).toBe("March");
    });
    test("Earth Month: 4 - April", () => {
        expect(earthMonthConstants[3].monthNameText).toBe("April");
    });
    test("Earth Month: 5 - May", () => {
        expect(earthMonthConstants[4].monthNameText).toBe("May");
    });
    test("Earth Month: 6 - June", () => {
        expect(earthMonthConstants[5].monthNameText).toBe("June");
    });
    test("Earth Month: 7 - July", () => {
        expect(earthMonthConstants[6].monthNameText).toBe("July");
    });
    test("Earth Month: 8 - August", () => {
        expect(earthMonthConstants[7].monthNameText).toBe("August");
    });
    test("Earth Month: 9 - September", () => {
        expect(earthMonthConstants[8].monthNameText).toBe("September");
    });
    test("Earth Month: 10 - October", () => {
        expect(earthMonthConstants[9].monthNameText).toBe("October");
    });
    test("Earth Month: 11 - November", () => {
        expect(earthMonthConstants[10].monthNameText).toBe("November");
    });
    test("Earth Month: 12 - December", () => {
        expect(earthMonthConstants[11].monthNameText).toBe("December");
    });
});