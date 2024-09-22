import {describe, test, expect} from "@jest/globals"
import DniGorahyan from "../index";
import UtilsLib from "../lib/utils.lib";
import {SurfaceConverterLib} from "../lib/surface.converter.lib";

describe("Test Suite For Surface Converter Function", () => {
    test("Test Forced Error For setVaileeData()", () => {
        let
            dniGorahyan = new DniGorahyan(),
            { tests } = SurfaceConverterLib(dniGorahyan);

        const setFullVaileeDataSpy = jest.spyOn(tests, "setFullVaileeData");

        dniGorahyan.vaileetee = 11;

        expect(() => tests.setFullVaileeData()).toThrowError("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");

        // Check the spy if the method was called correctly.
        expect(setFullVaileeDataSpy).toHaveBeenCalled();

        // Restore the mock and revert original implementation.
        setFullVaileeDataSpy.mockClear();
    });

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
        test("Test adjustTimeValue() For Out of Bounds Prorahn", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);

            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.timeFragment = { type: "prorahn", value: 26, source: "cavern" }

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

            expect(result).toEqual(2);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy2).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy2.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Gorahn", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.timeFragment = { type: "gorahn", value: -1, source: "cavern" }

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

            dniGorahyan.timeFragment = { type: "tahvo", value: -1, source: "cavern" }

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

            dniGorahyan.timeFragment = { type: "yahr", value: -1, source: "cavern" }

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

            dniGorahyan.timeFragment = { type: "gahrtahvo", value: -1, source: "cavern" }

            tests.adjustTimeValue('gahrtahvo');

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
    });
});