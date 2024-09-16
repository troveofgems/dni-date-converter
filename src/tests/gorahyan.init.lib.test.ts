import {describe, expect, test} from "@jest/globals";

import {init, testForFailedInit} from "../lib/gorahyan.init.lib";
import {DniGorahyan} from "../index";

describe("Gorahyan Init Library Test Suite", () => {
    describe("Library Loaded", () => {
        test("Library Loaded{} Instantiated", () => {
            let gorahyanInstantiated: DniGorahyan | Error | null = init(new DniGorahyan());
            expect(gorahyanInstantiated).not.toBe(null);
            gorahyanInstantiated = null;
        });
    });

    describe("Converters Exposed", () => {
        test("surfaceToCavern() Function Exposed", () => {
            let gorahyanInstantiated: DniGorahyan | null = init(new DniGorahyan());
            expect(typeof gorahyanInstantiated.converters.surfaceToCavern).toBe("function");
            gorahyanInstantiated = null;
        });
        test("cavernToSurface() Function Exposed", () => {
            let gorahyanInstantiated: DniGorahyan | null = init(new DniGorahyan());
            expect(typeof gorahyanInstantiated.converters.cavernToSurface).toBe("function");
            gorahyanInstantiated = null;
        });
    });

    describe("Thrown Error Rendered", () => {
        test("Test throw new Error()", () => {
            let gorahyanInstantiated: DniGorahyan | null = init(new DniGorahyan());
            expect(() => testForFailedInit(gorahyanInstantiated, true)).toThrow("Class Init Failed. Unable to set methods or properties");
        });
    });
});