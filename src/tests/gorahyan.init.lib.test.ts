import {describe, expect, test} from "@jest/globals";
import DniGorahyan from "../index";

describe("Gorahyan Init Library Test Suite", () => {
    describe("Library Loaded", () => {
        test("Library Loaded{} Instantiated", () => {
            let gorahyanInstantiated: DniGorahyan | Error | null = new DniGorahyan();
            expect(gorahyanInstantiated).not.toBe(null);
            gorahyanInstantiated = null;
        });
    });

    describe("Converters Exposed", () => {
        test("surfaceToCavern() Function Exposed", () => {
            let gorahyanInstantiated: DniGorahyan | null = new DniGorahyan();
            expect(typeof gorahyanInstantiated.converters.surfaceToCavern).toBe("function");
            gorahyanInstantiated = null;
        });
        test("cavernToSurface() Function Exposed", () => {
            let gorahyanInstantiated: DniGorahyan | null = new DniGorahyan();
            expect(typeof gorahyanInstantiated.converters.cavernToSurface).toBe("function");
            gorahyanInstantiated = null;
        });
    });
});