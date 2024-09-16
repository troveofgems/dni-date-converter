import {describe, expect, test} from "@jest/globals";

import { DniGorahyan } from "../index";

describe("Dn'i Constants Test Suite", () => {
    describe("Gorahyan D'ni Time Artifact Constants", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Milliseconds Per Hahr Value", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.msPerHahr)
                .toEqual(31556925216);
        });
        test("Reference D'ni Hahr Value", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.refDniHahr)
                .toEqual(9647);
        });
        test("Prorahntee Per Hahr", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.prorahnteePerHahr)
                .toEqual(22656250);
        });
        test("Reference Prorahntee Per Hahr", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.refProrahnteePerHahr)
                .toEqual(218564843750);
        });
        test("Milliseconds Per Prorahntee", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.msPerProrahn)
                .toEqual("1392.8573888441379000");
        });
    });

    describe("Gorahyan D'ni Time Artifact Delta Shift Constants", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Hahr Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.hahrShift)
                .toEqual(31556925216);
        });
        test("Vailee Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.vaileeShift)
                .toEqual(2265625);
        });
        test("Yahr Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.yahrShift)
                .toEqual(78125);
        });
        test("Gartahvo Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.gartahvoShift)
                .toEqual(15625);
        });
        test("Tahvo Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.tahvoShift)
                .toEqual(625);
        });
        test("Goran Delta Shift", () => {
            expect(dniGorahyanInstantiated.gorahyan?.dniConstants.readonly.deltas.gorahnShift)
                .toEqual(25);
        });
    });
});