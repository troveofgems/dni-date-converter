import {describe, test, expect} from "@jest/globals"
import SurfaceConverterLib from "../lib/surface.converter.lib";
import DniGorahyan from "../index";
import UtilsLib from "../lib/utils.lib";
import Big from "big.js";

describe("Test Suite For Surface Converter Library", () => {
    // Library Loaded
    describe("Library Loaded", () => {
      test("Successfully Loaded", () => {
          let
              dniGorahyan = new DniGorahyan(),
              surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);
          expect(surfaceConverterLib).not.toBeNull();
      });
   });

    // Functions Exposed
    describe("Functions Exposed", () => {
        let
            dniGorahyan = new DniGorahyan(),
            surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);

        test("safeDateOperation() Function Exposed", () => {
            expect(typeof surfaceConverterLib.convertSurfaceTimestampToCavern).toBe("function");
        });
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

    describe("Default Exported Function Test", () => {
        test("surfaceToCavernTimeConverter() Called With No Arguments Passed", () => {
            let
                dniGorahyan = new DniGorahyan(),
                surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);
            const convertSurfaceTimestampToCavernSpy = jest.spyOn(surfaceConverterLib, "convertSurfaceTimestampToCavern");
            const result = surfaceConverterLib.convertSurfaceTimestampToCavern();

            expect(typeof result).toBe("string");

            // Check the spy if the method was called correctly.
            expect(convertSurfaceTimestampToCavernSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            convertSurfaceTimestampToCavernSpy.mockClear();
        });
        test("surfaceToCavernTimeConverter('1991-04-21T09:54:00') Called With DateString Passed", () => {
            let
                dniGorahyan = new DniGorahyan(),
                surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);
            const convertSurfaceTimestampToCavernSpy = jest.spyOn(surfaceConverterLib, "convertSurfaceTimestampToCavern");
            const result = surfaceConverterLib.convertSurfaceTimestampToCavern("1991-04-21T09:54:00");

            expect(typeof result).toBe("string");
            expect(result).toEqual("Leefo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(convertSurfaceTimestampToCavernSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            convertSurfaceTimestampToCavernSpy.mockClear();
        });
        test("surfaceToCavernTimeConverter(new Date('1991-04-21T09:54:00')) Called With DateObject Passed", () => {
            let
                dniGorahyan = new DniGorahyan(),
                surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);
            const convertSurfaceTimestampToCavernSpy = jest.spyOn(surfaceConverterLib, "convertSurfaceTimestampToCavern");
            const result = surfaceConverterLib.convertSurfaceTimestampToCavern(new Date("1991-04-21T09:54:00"));

            expect(typeof result).toBe("string");
            expect(result).toEqual("Leefo 1 9647 DE 0:00:00:00");

            // Check the spy if the method was called correctly.
            expect(convertSurfaceTimestampToCavernSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            convertSurfaceTimestampToCavernSpy.mockClear();
        });
    });

    describe('Adjustment Tests', () => {
        test("Test adjustTimeValue() For Out of Bounds Prorahn", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.prorahn = Big(26);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.prorahn = 26;

            tests.adjustTimeValue('prorahn', 25, 0, 25);

            const result = dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly;

            expect(result.prorahn).toEqual(1);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Vailee", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy2 = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.vailee.id = Big(4);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.vailee.id = 4;

            tests.adjustTimeValue('vailee', 2, 0, 2);

            const result = dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.vailee;

            expect(result.id).toEqual(2);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy2).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy2.mockClear();
        });
        test("Test _subAdjustment()", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
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
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.gorahn = Big(-1);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.gorahn = -1;

            tests.adjustTimeValue('gorahn', 25, 0, 25);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Tahvo", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.tahvo = Big(-1);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.tahvo = -1;

            tests.adjustTimeValue('tahvo', 25, 0, 25);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Yahr", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.yahr = Big(-1);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.yahr = -1;

            tests.adjustTimeValue('yahr', 29, 0, 29);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
        test("Test adjustTimeValue() For Out of Bounds Gartahvo", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const adjustTimeValueSpy = jest.spyOn(tests, "adjustTimeValue");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.bigs.gartahvo = Big(-1);
            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.gartahvo = -1;

            tests.adjustTimeValue('gartahvo', 5, 0, 5);

            // Check the spy if the method was called correctly.
            expect(adjustTimeValueSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            adjustTimeValueSpy.mockClear();
        });
    });


    describe("Exported Functions Tests", () => {
        test("mapVaileeName() Called With valid Vailee Id - 7", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const mapVaileeNameSpy = jest.spyOn(tests, "mapVaileeName");
            tests.mapVaileeName(7);
            const result = dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.vailee;

            expect(typeof result).toBe("object");
            expect(result.text).toEqual("Leevosahn");
            expect(result.dniFontMappingText).toEqual("lEvosan");

            // Check the spy if the method was called correctly.
            expect(mapVaileeNameSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            mapVaileeNameSpy.mockClear();
        });
        test("mapVaileeName() Called With invalid Vailee Id - 17", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const mapVaileeNameSpy = jest.spyOn(tests, "mapVaileeName");

            expect(() => tests.mapVaileeName(17)).toThrow("Vailee Parse Failed. Unable To Continue Date Conversion. Check the error console for more details.");

            // Check the spy if the method was called correctly.
            expect(mapVaileeNameSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            mapVaileeNameSpy.mockClear();
        });

        test("getDniConvertedTimestamp() Called To Expect Date In BE", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const getDniConvertedTimestampSpy = jest.spyOn(tests, "getDniConvertedTimestamp");
            convertSurfaceTimestampToCavern();

            dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.hahr =
                dniGorahyan.gorahyan.conversionArtifacts.cavern.readonly.hahr * -1;

            const result = tests.getDniConvertedTimestamp();

            let testValue = result.split(" ");

            expect(testValue[3]).toEqual("BE");

            // Check the spy if the method was called correctly.
            expect(getDniConvertedTimestampSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            getDniConvertedTimestampSpy.mockClear();
        });
        test("getDniConvertedTimestamp() Called To Expect Date In DE", () => {
            let
                dniGorahyan = new DniGorahyan(),
                { tests, convertSurfaceTimestampToCavern } = SurfaceConverterLib(dniGorahyan.gorahyan);
            const getDniConvertedTimestampSpy = jest.spyOn(tests, "getDniConvertedTimestamp");
            convertSurfaceTimestampToCavern();

            const result = tests.getDniConvertedTimestamp();

            let testValue = result.split(" ");

            expect(testValue[3]).toEqual("DE");

            // Check the spy if the method was called correctly.
            expect(getDniConvertedTimestampSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            getDniConvertedTimestampSpy.mockClear();
        });
    });

    describe("Exported Functions Debug Test", () => {
        test("convertSurfaceTimestampToCavern(null, true)", () => {
            let
                dniGorahyan = new DniGorahyan(),
                surfaceConverterLib = SurfaceConverterLib(dniGorahyan.gorahyan);

            surfaceConverterLib.convertSurfaceTimestampToCavern(null, true);
        });
    });
});