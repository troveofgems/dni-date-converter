import DniGorahyan from "../index";
import { TimestampFormatLoaders } from "../lib/timestamp.format.lib";

describe("Timestamp Format Test Suite", () => {
    describe("BE & DE", () => {
        test("Date in BE", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            let timestampFormatLoader = TimestampFormatLoaders(dniGorahyanInstantiated);
            dniGorahyanInstantiated
                .converters
                .surfaceToCavern(
                    dniGorahyanInstantiated.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
                );
            dniGorahyanInstantiated.timeFragment = { type: "hahr", value: -1, source: "cavern" };

            let convertedTimestamp = timestampFormatLoader.dniDateTimeStringFormatter();
            expect(convertedTimestamp).toEqual("1st Bell, 0:00:00:00, Leefo 1, 1 BE");
        });
        test("Date in BE and Using D'ni Font Mapping", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            let timestampFormatLoader = TimestampFormatLoaders(dniGorahyanInstantiated);
            dniGorahyanInstantiated.useDniFontMapping = true;
            dniGorahyanInstantiated
                .converters
                .surfaceToCavern(
                    dniGorahyanInstantiated.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
                );
            dniGorahyanInstantiated.timeFragment = { type: "hahr", value: -1, source: "cavern" };

            let convertedTimestamp = timestampFormatLoader.dniDateTimeStringFormatter();
            expect(convertedTimestamp).toEqual("1st bell, 0:0:0:0, lEfo 1, 1 be");
        });
        test("Date in DE", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            let timestampFormatLoader = TimestampFormatLoaders(dniGorahyanInstantiated);
            dniGorahyanInstantiated
                .converters
                .surfaceToCavern(
                    dniGorahyanInstantiated.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
                );

            let convertedTimestamp = timestampFormatLoader.dniDateTimeStringFormatter();
            expect(convertedTimestamp).toEqual("1st Bell, 0:00:00:00, Leefo 1, 9647 DE");
        });
        test("Date in DE, Includes Nth Bell, and Invalid Format Type - Which Does Not Include Bell By Default", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            dniGorahyanInstantiated.includeNthBell = true;
            dniGorahyanInstantiated.outputType = 3;
            let timestampFormatLoader = TimestampFormatLoaders(dniGorahyanInstantiated);
            dniGorahyanInstantiated
                .converters
                .surfaceToCavern(
                    dniGorahyanInstantiated.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
                );

            let convertedTimestamp = timestampFormatLoader.dniDateTimeStringFormatter();
            expect(convertedTimestamp).toEqual("1st Bell, 0:00:00:00, Leefo 1, 9647 DE");
        });
        test("Date in DE, Format Type 0", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            dniGorahyanInstantiated.includeNthBell = false;
            dniGorahyanInstantiated.outputType = 0;
            let timestampFormatLoader = TimestampFormatLoaders(dniGorahyanInstantiated);
            dniGorahyanInstantiated
                .converters
                .surfaceToCavern(
                    dniGorahyanInstantiated.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
                );

            let convertedTimestamp = timestampFormatLoader.dniDateTimeStringFormatter();
            expect(convertedTimestamp).toEqual("1st Bell, 0:00:00:00, Leefo 1, 9647 DE");
        });
    })
});