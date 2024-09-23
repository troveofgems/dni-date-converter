import {describe, expect, test} from "@jest/globals";

import DniGorahyan from "../index";

describe("Dn'i Constants Test Suite", () => {
    describe("Gorahyan D'ni Time Artifact Constants", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Milliseconds Per Hahr Value", () => {
            expect(dniGorahyanInstantiated.EARTH_MS_PER_HAHR_BIG.toNumber())
                .toEqual(31556925216);
        });
        test("Reference D'ni Hahr Value", () => {
            expect(dniGorahyanInstantiated.DNI_HAHR_REFERENCE_BIG.toNumber())
                .toEqual(9647);
        });
        test("Prorahntee Per Hahr", () => {
            expect(dniGorahyanInstantiated.PRORAHNTEE_PER_HAHR_BIG.toNumber())
                .toEqual(22656250);
        });
        test("Reference Prorahntee Per Hahr", () => {
            expect(dniGorahyanInstantiated.REF_PRORAHNTEE_PER_HAHR_BIG.toNumber())
                .toEqual(218564843750);
        });
        test("Milliseconds Per Prorahntee", () => {
            expect(dniGorahyanInstantiated.EARTH_MS_PER_PRORAHNTEE_BIG.toNumber())
                .toEqual(1392.8573888441379);
        });
    });

    describe("Gorahyan D'ni Time Artifact Delta Shift Constants", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Hahr Delta Shift", () => {
            expect(dniGorahyanInstantiated.HAHR_SHIFT_BIG.toNumber())
                .toEqual(31556925216);
        });
        test("Vailee Delta Shift", () => {
            expect(dniGorahyanInstantiated.VAILEE_SHIFT_BIG.toNumber())
                .toEqual(2265625);
        });
        test("Yahr Delta Shift", () => {
            expect(dniGorahyanInstantiated.YAHR_SHIFT_BIG.toNumber())
                .toEqual(78125);
        });
        test("Gartahvo Delta Shift", () => {
            expect(dniGorahyanInstantiated.GAHRTAHVO_SHIFT_BIG.toNumber())
                .toEqual(15625);
        });
        test("Tahvo Delta Shift", () => {
            expect(dniGorahyanInstantiated.TAHVO_SHIFT_BIG.toNumber())
                .toEqual(625);
        });
        test("Goran Delta Shift", () => {
            expect(dniGorahyanInstantiated.GORAHN_SHIFT_BIG.toNumber())
                .toEqual(25);
        });
    });
});