import {describe, test, expect} from "@jest/globals"
import { DniGorahyan } from "../index";

import CavernConverterLib from "../lib/cavern.converter.lib";
import { _getVaileeId } from "../lib/cavern.converter.lib";

describe("Test Suite For Cavern Converter Library", () => {
    // Library Loaded
    describe("Library Loaded", () => {
        test("Successfully Loaded", () => {
            let
                dniGorahyan = new DniGorahyan(),
                cavernConverterLib = CavernConverterLib(dniGorahyan.gorahyan);
            expect(cavernConverterLib).not.toBeNull();
        });
    });

    // Functions Called
    describe("Functions Called", () => {
        test("_getVaileeId('Leefot') Function Called With Invalid Vailee Name String", () => {
            expect(() => _getVaileeId("Leefot")).toThrow("Error processing vailee name.");
        });
        test("_getVaileeId('Leefo') Function Called With Valid Vailee Name String", () => {
            expect(_getVaileeId("Leefo")).toEqual(0);
        });
    });
});