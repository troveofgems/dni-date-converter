import {describe, expect, test} from "@jest/globals";

import GorahyanInitLib, { setConvergenceTimeArtifacts } from "../lib/gorahyan.init.lib";

describe("Gorahyan Init Lib Test Suite", () => {
    describe("Library Loaded", () => {
        test("Library Loaded{} Instantiated", () => {
            const gorahyanInitLibInstantiated = GorahyanInitLib();
            expect(gorahyanInitLibInstantiated).not.toBe(null);
        });
    });

    describe("Functions Exposed", () => {
        test("GorahyanInitLib() Function Exposed", () => {
            expect(typeof GorahyanInitLib).toBe("function");
        });
        test("setConvergenceTimeArtifacts() Function Exposed", () => {
            expect(typeof setConvergenceTimeArtifacts).toBe("function");
        });
    });
});