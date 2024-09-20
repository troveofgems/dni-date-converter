import {describe, test, expect} from "@jest/globals"

import Big from "big.js";
import DniGorahyan from "../index";
import UtilsLib from "../lib/utils.lib";
import {SurfaceConverterLib} from "../lib/surface.converter.lib";
import {init} from "../lib/gorahyan.init.lib";

describe("Test Suite For Surface Converter Function", () => {
    // Function Calls - Utils Run For 100% Test Coverage Run even though these tests are defined in utils.lib.test.ts
    describe("Imported Util Functions Tested", () => {
        let
            utilsLib = UtilsLib();
        test("safeStringOperation() Function Called With Non-String", () => {
            const nonStringInput = { toString: () => 'non-string' };
            expect(() => utilsLib.safeStringOperation(nonStringInput)).toThrowError("String Value is Required");
        });
        test("safeDateOperation() Function Called With Malformed-DateObject", () => {
            expect(() => utilsLib.safeDateOperation("non-date-object")).toThrowError("Error processing date object:");
        });
    });

    describe('Adjustment Tests', () => {
        test("Test DniFontMapping Text", () => {
            let dniGorahyan = new DniGorahyan();

            const dniFontMappingValueSpy = jest.spyOn(dniGorahyan.converters, "surfaceToCavern");

            const result = dniGorahyan.converters.surfaceToCavern("1991-04-21T09:54:00");

            expect(result).toEqual("lEfo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(dniFontMappingValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            dniFontMappingValueSpy.mockClear();
        });
    });

    describe('Adjustment Tests', () => {
        test("Test adjustTimeValue() For Out of Bounds Prorahn", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);

            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.prorahntee = 26;

            tests.adjustTimeValue('prorahn');

            const result = dniGorahyan.prorahntee;

            expect(result).toEqual(1);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Vailee", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy2 = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.vaileetee = 11;

            tests.adjustTimeValue('vailee');

            const result = dniGorahyan.vaileetee;

            expect(result).toEqual(1);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy2).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy2.mockClear();
        });
        test("Test _subAdjustment()", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const subAdjustTimeValueSpy = jest.spyOn(tests, "subAdjustment");
            convertSurfaceTimestampToCavern();

            tests.subAdjustment('prorahn', 95, 0, 25);
            tests.subAdjustment('gorahn', 75, 0, 25);
            tests.subAdjustment('tahvo', 200, 0, 25);
            tests.subAdjustment('gartahvo', 40, 0, 5);
            tests.subAdjustment('yahr', 90, 0, 29);
            tests.subAdjustment('vailee', -9, 0, 10);

            // Check the spy if the method was called correctly.
            expect(subAdjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            subAdjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Gorahn", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahntee = -1;

            tests.adjustTimeValue('gorahn');

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Tahvo", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.tahvotee = -1;

            tests.adjustTimeValue('tahvo');

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Yahr", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.yahrtee = -1;

            tests.adjustTimeValue('yahr');

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Gartahvo", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gahrtahvotee = -1;

            tests.adjustTimeValue('gahrtahvo');

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
    });
});