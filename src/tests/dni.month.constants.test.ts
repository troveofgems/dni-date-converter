import {describe, expect, test} from "@jest/globals";
import DniMonthConstants from "../constants/dni.month.constants";

describe("D'ni Month Artifact Constants", () => {
    let dniMonthConstants = DniMonthConstants;

    test("D'ni Month List Loaded", () => {
        expect(typeof dniMonthConstants).not.toBeUndefined();
    });

    test("D'ni Month: 1 - Leefo/lEfo", () => {
        expect(dniMonthConstants[0].vaileeNameText).toBe("Leefo");
        expect(dniMonthConstants[0].dniFontVaileeNameText).toBe("lEfo");
    });
    test("D'ni Month: 2 - Leebro/lEbro", () => {
        expect(dniMonthConstants[1].vaileeNameText).toBe("Leebro");
        expect(dniMonthConstants[1].dniFontVaileeNameText).toBe("lEbro");

    });
    test("D'ni Month: 3 - Leesahn/lEsan", () => {
        expect(dniMonthConstants[2].vaileeNameText).toBe("Leesahn");
        expect(dniMonthConstants[2].dniFontVaileeNameText).toBe("lEsan");

    });
    test("D'ni Month: 4 - Leetar/lEtar", () => {
        expect(dniMonthConstants[3].vaileeNameText).toBe("Leetar");
        expect(dniMonthConstants[3].dniFontVaileeNameText).toBe("lEtar");

    });
    test("D'ni Month: 5 - Leevot/lEvot", () => {
        expect(dniMonthConstants[4].vaileeNameText).toBe("Leevot");
        expect(dniMonthConstants[4].dniFontVaileeNameText).toBe("lEvot");

    });
    test("D'ni Month: 6 - Leevofo/lEvofo", () => {
        expect(dniMonthConstants[5].vaileeNameText).toBe("Leevofo");
        expect(dniMonthConstants[5].dniFontVaileeNameText).toBe("lEvofo");

    });
    test("D'ni Month: 7 - Leevobro/lEvobro", () => {
        expect(dniMonthConstants[6].vaileeNameText).toBe("Leevobro");
        expect(dniMonthConstants[6].dniFontVaileeNameText).toBe("lEvobro");

    });
    test("D'ni Month: 8 - Leevosahn/lEvosan", () => {
        expect(dniMonthConstants[7].vaileeNameText).toBe("Leevosahn");
        expect(dniMonthConstants[7].dniFontVaileeNameText).toBe("lEvosan");

    });
    test("D'ni Month: 9 - Leevotar/lEvotar", () => {
        expect(dniMonthConstants[8].vaileeNameText).toBe("Leevotar");
        expect(dniMonthConstants[8].dniFontVaileeNameText).toBe("lEvotar");
    });
    test("D'ni Month: 10 - Leenovoo/lEnovU", () => {
        expect(dniMonthConstants[9].vaileeNameText).toBe("Leenovoo");
        expect(dniMonthConstants[9].dniFontVaileeNameText).toBe("lEnovU");
    });
});