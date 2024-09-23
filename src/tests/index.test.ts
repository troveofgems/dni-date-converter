import {describe, expect, test} from "@jest/globals";

import DniGorahyan from "../index";

describe("Interface Test Suite", () => {
    describe("DniGorahyan Instantiation", () => {
        test("Class DniGorahyan{} Instantiated", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated).not.toBe(null);
        });
    });

    describe("Gorahyan Initialization", () => {
        const dniGorahyanInstantiated = new DniGorahyan();
        test("Gorahyan Initialized", () => {
            expect(typeof dniGorahyanInstantiated.gorahyan).toBe("object");
        });
    });

    describe("DniGorahyan Function Definitions", () => {
        test("surfaceToCavernTimeConverter() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.converters.surfaceToCavern).toBe("function");
        });
        test("cavernToSurfaceTimeConverter() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.converters.cavernToSurface).toBe("function");
        });
        test("runControlTests() is Defined", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(typeof dniGorahyanInstantiated.tests.runControlTests).toBe("function");
        });
    });

    describe("DniGorahyan runControlTests() Function Calls", () => {
        test("runControlTests() Called", () => {
            const
                dniGorahyanInstantiated = new DniGorahyan(),
                runControlTestsSpy = jest.spyOn(dniGorahyanInstantiated.tests, "runControlTests");

            dniGorahyanInstantiated.tests.runControlTests();

            /**
             * First Control Test:
             * @Call: surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options: Set To Default
             * @Desc: Tests Date-Time String Passed to surfaceToCavern("YYYY-MM-DDThh:mm:ss")
             *
             * @Results:
             *  - Default: "1st Bell, 0:00:00:00, Leefo 1, 9647 DE"
             * */
            expect(dniGorahyanInstantiated.firstControlTestResult).toBe("1st Bell, 0:00:00:00, Leefo 1, 9647 DE");

            /**
             * Second Control Test:
             * @Call surfaceToCavern(new Date("1991-04-21T09:54:00"))
             * @Params: new Date("1991-04-21T09:54:00")
             * @Options: Set To Default
             * @Desc: Tests JavaScript Date-Time Object Passed to surfaceToCavern(new Date(<DateTimeString?>))
             *
             * @Results:
             *  - Default: "1st Bell, 0:00:00:00, Leefo 1, 9647 DE"
             * */
            expect(dniGorahyanInstantiated.secondControlTestResult).toBe("1st Bell, 0:00:00:00, Leefo 1, 9647 DE");

            /**
             * Third Control Test:
             * @Call surfaceToCavern()
             * @Params: null | undefined
             * @Options: Set To Default
             * @Desc: Tests No Value Passed to surfaceToCavern()
             *
             * @Results:
             *  - At Time Of Run: ~"7th Bell, 1:09:11:00, Leevot 7, 9680 DE"
             * */
            expect(dniGorahyanInstantiated.thirdControlTestResult.length).toBeGreaterThan(0);

            /**
             * Fourth Control Test:
             * @Call cavernToSurface("Leefo 1 9647 DE 0:00:00:00")
             * @Params: "Leefo 1 9647 DE 0:00:00:00"
             * @Desc: Tests Control Date Of Convergence
             *
             * @Results:
             *  - Default: {
             *         utc: 'Sun, 21 Apr 1991 16:54:00 GMT',
             *         cavern: 'Sun Apr 21 1991 09:54:00 GMT-0700',
             *         local: 'Sun Apr 21 1991 09:54:00 GMT-0700 (Mountain Standard Time)'
             *       }
             * */
            expect(dniGorahyanInstantiated.fourthControlTestResult).toStrictEqual({
                utc: 'Sun, 21 Apr 1991 16:54:00 GMT',
                cavern: 'Sun Apr 21 1991 09:54:00 GMT-0700',
                local: 'Sun Apr 21 1991 09:54:00 GMT-0700 (Mountain Standard Time)'
            });

            /**
             * Fifth Control Test:
             * @Call cavernToSurface("Leevofo 8 9798 DE 2:13:00:00")
             * @Params: "Leevofo 8 9798 DE 2:13:00:00"
             * @Desc: Tests Known Date In DE
             *
             * @Results:
             *  - Default: {
             *         utc: 'Tue, 30 Oct 2142 08:19:21 GMT',
             *         cavern: 'Mon Oct 29 2142 01:19:21 GMT-0700',
             *         local: 'Tue Oct 30 2142 01:19:21 GMT-0700 (Mountain Standard Time)'
             *       }
             * */
            expect(dniGorahyanInstantiated.fifthControlTestResult).toStrictEqual({
                utc: 'Tue, 30 Oct 2142 08:19:21 GMT',
                cavern: 'Mon Oct 29 2142 01:19:21 GMT-0700',
                local: 'Tue Oct 30 2142 01:19:21 GMT-0700 (Mountain Standard Time)'
            });

            /**
             * Sixth Control Test:
             * @Call cavernToSurface("Leevosahn 5 9000 BE 1:05:06:07")
             * @Params: "Leevosahn 5 9000 BE 1:05:06:07"
             * @Desc: Tests Date In BE
             *
             * @Results:
             *  - Default: {
             *         utc: 'Tue, 12 Jan -16655 14:23:33 GMT',
             *         cavern: 'Mon Jan 11 -16655 07:23:33 GMT-0700',
             *         local: 'Tue Jan 12 -16655 06:55:15 GMT-0728 (Mountain Standard Time)'
             *       }
             * */
            expect(dniGorahyanInstantiated.sixthControlTestResult).toStrictEqual({
                utc: 'Tue, 12 Jan -16655 14:23:33 GMT',
                cavern: 'Mon Jan 11 -16655 07:23:33 GMT-0700',
                local: 'Tue Jan 12 -16655 06:55:15 GMT-0728 (Mountain Standard Time)'
            });

            /**
             * Seventh Control Test:
             * @Call surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options: dniGorahyan.switchTimestampFormatter(useGoA: boolean = false, typeId: number);
             * @Desc: Tests change to Default Date Format - Uses Guild of Archivists Type 0 Format
             *
             * @Results: "L[ee/E]fo 1 9647 DE 0:00:00:00"
             * */
            expect(dniGorahyanInstantiated.seventhControlTestResult).toBe("Leefo 1, 9647 DE 0:00:00:00");

            /**
             * Eighth Control Test:
             * @Call surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options: dniGorahyan.switchTimestampFormatter(useGoA: boolean = false, typeId: number);
             * @Desc: Tests change to Default Date Format - Uses Guild of Archivists Type 1 Format
             *
             * @Results: "L[ee/E]fo 1 9647 DE 0:00:00:00"
             * */
            expect(dniGorahyanInstantiated.eighthControlTestResult).toBe("0:00:00:00, Leefo 1, 9647 DE");

            /**
             * Ninth Control Test:
             * @Call surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options:
             *  - Timestamp Format: Default
             *  - dniGorahyan.useDniFontMapping = true;
             * @Desc: Tests change to Default Date Format - Uses Guild of Archivists Type 1 Format
             *
             * @Results: "1st bell, 0:00:00:00, lEfo 1, 9647 de"
             * */
            expect(dniGorahyanInstantiated.ninthControlTestResult).toBe("1st bell, 0:0:0:0, lEfo 1, %)\\ de");

            /**
             * Tenth Control Test:
             * @Call surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options:
             *  - Timestamp Format: Default
             *  - dniGorahyan.useDniFontMapping = true;
             * @Desc: Tests change to Default Date Format - Uses Guild of Archivists Type 1 Format
             *
             * @Results: "lEfo 1 9647 de 0:00:00:00"
             * */
            expect(dniGorahyanInstantiated.tenthControlTestResult).toBe("lEfo 1, %)\\ de 0:0:0:0");

            /**
             * Eleventh Control Test:
             * @Call surfaceToCavern("1991-04-21T09:54:00")
             * @Params: "1991-04-21T09:54:00"
             * @Options:
             *  - Timestamp Format: Default
             *  - dniGorahyan.useDniFontMapping = true;
             * @Desc: Tests change to Default Date Format - Uses Guild of Archivists Type 1 Format
             *
             * @Results: "0:00:00:00, lEfo 1, 9647 de"
             * */
            expect(dniGorahyanInstantiated.eleventhControlTestResult).toBe("0:0:0:0, lEfo 1, %)\\ de");

            // Check the spy if the method was called correctly.
            expect(runControlTestsSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation.
            runControlTestsSpy.mockClear();
        });
    });

    describe("Public Print Accessors", () => {
        test("Call printTimeArtifacts()", () => {
            const dniGorahyanInstantiated = new DniGorahyan();

            // Spy on the instance method
            const printTimeArtifactsSpy = jest.spyOn(dniGorahyanInstantiated, "printTimeArtifacts");

            dniGorahyanInstantiated.printTimeArtifacts();

            // Check if the spy was called
            expect(printTimeArtifactsSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation
            printTimeArtifactsSpy.mockClear();
        });
        test("Call printImportantDates()", () => {
            const dniGorahyanInstantiated = new DniGorahyan();

            // Spy on the instance method
            const printImportantDatesSpy = jest.spyOn(dniGorahyanInstantiated, "printImportantDates");

            dniGorahyanInstantiated.printImportantDates();

            // Check if the spy was called
            expect(printImportantDatesSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation
            printImportantDatesSpy.mockClear();
        });
        test("Call printImportantDates(false, true)", () => {
            const dniGorahyanInstantiated = new DniGorahyan();

            // Spy on the instance method
            const printImportantDatesSpy = jest.spyOn(dniGorahyanInstantiated, "printImportantDates");

            dniGorahyanInstantiated.printImportantDates(false, true);

            // Check if the spy was called
            expect(printImportantDatesSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation
            printImportantDatesSpy.mockClear();
        });
        test("Call printImportantDates(false, false, true)", () => {
            const dniGorahyanInstantiated = new DniGorahyan();

            // Spy on the instance method
            const printImportantDatesSpy = jest.spyOn(dniGorahyanInstantiated, "printImportantDates");

            dniGorahyanInstantiated.printImportantDates(false, false, true);

            // Check if the spy was called
            expect(printImportantDatesSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation
            printImportantDatesSpy.mockClear();
        });
    });

    describe("DniGorahyan Uninitialized Value Detected", () => {
        test("Catastrophic Program Error", () => {
            jest.mock('../index', () => ({
                ...jest.requireActual('../index'),
                gorahyan: null,
                surfaceToCavernTime: () => "mockFunction",
                cavernToSurfaceTime: () => "mockFunction"
            }));

            const dniGorahyanInstantiated = new DniGorahyan();

            // Spy on the instance method
            const simulateCatastrophicObjectFailureSpy = jest.spyOn(dniGorahyanInstantiated.tests, "simulateCatastrophicInitFailure");

            expect(simulateCatastrophicObjectFailureSpy).toThrow();

            // Check if the spy was called
            expect(simulateCatastrophicObjectFailureSpy).toHaveBeenCalled();

            // Restore the mock and revert original implementation
            simulateCatastrophicObjectFailureSpy.mockClear();
        });
    });

    describe("Class Getter/Setter Tests", () => {
        test("Year Getter/Setter", () => {
            let dniGorahyanInstantiated: DniGorahyan | null = new DniGorahyan();
            expect(dniGorahyanInstantiated.year).toBe(1991);
            dniGorahyanInstantiated = null;
        });
        test("MonthId Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.monthId).toBe(3);
        });
        test("MonthText Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.monthText).toBe("April");
        });
        test("Day Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.day).toBe(21);
        });
        test("Hour Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.hour).toBe(9);
        });
        test("Minute Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.minute).toBe(54);
        });
        test("Second Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.second).toBe(0);
        });
        test("calculatedEarthDelta Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedEarthDelta).toBe(0);
        });
        test("calculatedHahrDelta Getter/Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedHahrDelta).toBe(0);
        });
        test("calculatedHahrDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedVaileeDelta).toBe(0);
        });
        test("calculatedHahrDelta Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            dniGorahyanInstantiated.calculatedVaileeDelta = 50000;
            expect(dniGorahyanInstantiated.calculatedVaileeDelta).toBe(50000);
        });
        test("calculatedYahrDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedYahrDelta).toBe(0);
        });
        test("calculatedYahrDelta Setter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            dniGorahyanInstantiated.calculatedYahrDelta = 250000;
            expect(dniGorahyanInstantiated.calculatedYahrDelta).toBe(250000);
        });
        test("calculatedGahrtahvoDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedGahrtahvoDelta).toBe(0);
        });
        test("calculatedTahvoDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedTahvoDelta).toBe(0);
        });
        test("calculatedGorahnDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedGorahnDelta).toBe(0);
        });
        test("calculatedProrahnDelta Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.calculatedProrahnteeDelta).toBe(0);
        });
        test("runtimeMetrics Getter", () => {
            const dniGorahyanInstantiated = new DniGorahyan();
            expect(dniGorahyanInstantiated.runtimeMetrics).toStrictEqual({
                "elapsedTimeInMS": 0,
                "elapsedTimeMessage": "",
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            });
        });
    });
});


