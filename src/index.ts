import {GorahyanInterface} from "./interfaces/gorahyan.interface";
import GorahyanInitLib, { setConvergenceTimeArtifacts } from "./lib/gorahyan.init.lib";

import SurfaceConverterLib from "./lib/surface.converter.lib";
import CavernConverterLib from "./lib/cavern.converter.lib";

export default class DniGorahyan {
    public gorahyan: GorahyanInterface = setConvergenceTimeArtifacts(GorahyanInitLib()); // Expose Selected Class Internals So Others May Review Calculations/Values As Needed
    public runControlTests;
    public surfaceToCavern;
    public cavernToSurface;
    public test;

    constructor() {
        this.surfaceToCavern = this.surfaceToCavernTime;
        this.cavernToSurface = this.cavernToSurfaceTime;
        this.runControlTests = this._runControlTests;
        this.test = {
            handleUninitializedConstructorArtifact: this._handleUninitializedConstructorArtifact
        }
    }

    // Public Methods Available: surfaceToCavernTime, cavernToSurfaceTime, runControlTests, simulateCatastrophicObjectFailure
    public surfaceToCavernTime(surfaceDateTime?: Date | string | null | undefined): string {
        this._handleUninitializedConstructorArtifact();
        let
            converter = SurfaceConverterLib(this.gorahyan),
            { convertSurfaceTimestampToCavern } = converter;
        return convertSurfaceTimestampToCavern(surfaceDateTime);
    }

    public cavernToSurfaceTime(cavernDateTimeString: string): {

    } {
        this._handleUninitializedConstructorArtifact();
        let
            converter = CavernConverterLib(this.gorahyan),
            { convertCavernTimestampToSurface } = converter;
        return convertCavernTimestampToSurface(cavernDateTimeString);
    }

    public simulateCatastrophicObjectFailure(): Error | void {
        return this._handleUninitializedConstructorArtifact(true);
    }

    // Private Methods
    private _runControlTests() {
        this._handleUninitializedConstructorArtifact();
        const
            testStart = new Date(),
            {
                earthConvergenceDateTimeString
            } = this.gorahyan!.dniConstants.dates.calendarConvergence;

        /**
         * First Test: Using String Value
         * */
        let first_test: DniGorahyan | string | null = new DniGorahyan();
        first_test = first_test.surfaceToCavernTime(earthConvergenceDateTimeString);

        /**
         * Second Test: Using DateTime Object Value
         * */
        let second_test: DniGorahyan | string | null = new DniGorahyan();
        second_test = second_test.surfaceToCavernTime(new Date(earthConvergenceDateTimeString));

        /**
         * Third Test: Not Passing A Value For Conversion
         * */
        let third_test: DniGorahyan | string | null = new DniGorahyan();
        third_test = third_test.surfaceToCavernTime();

        /**
         * Fourth Test: Cavern String Test 1 - "Leefo 1 9647 DE 0:00:00:00"
         * */
        let fourth_test: DniGorahyan | string | null = new DniGorahyan();
        let fourth_test_results = fourth_test.cavernToSurfaceTime("Leefo 1 9647 DE 0:00:00:00");

        /**
         * Fifth Test: Cavern String Test 2 - "Leevofo 8 9798 DE 2:13:00:00"
         * */
        let fifth_test: DniGorahyan | string | null = new DniGorahyan();
        let fifth_test_results = fifth_test.cavernToSurfaceTime("Leevofo 8 9798 DE 2:13:00:00");

        /**
         * Sixth Test: Cavern String Test 3 - "Leevosahn 5 9000 BE 1:05:06:07"
         * */
        let sixth_test: DniGorahyan | string | null = new DniGorahyan();
        let sixth_test_results = fifth_test.cavernToSurfaceTime("Leevosahn 5 9000 BE 1:05:06:07");

        const runtimeMetrics = this._calculateElapsedRuntimeOfControlTests(testStart, new Date());

        return {
            runtimeMetrics,
            generated: {
                first_test,
                second_test,
                third_test,
                fourth_test_results,
                fifth_test_results,
                sixth_test_results
            }
        };
    }
    private _handleUninitializedConstructorArtifact(forceError: boolean = false): Error | void {
        let uninitializedConstructorDetected = (
            forceError ||
            (this?.gorahyan === null || this?.gorahyan === undefined) ||
            (typeof this?.surfaceToCavernTime !== 'function' || typeof this?.cavernToSurfaceTime !== 'function')
        );
        if(uninitializedConstructorDetected) {
            throw new Error('cavernToSurfaceTime(), surfaceToCavernTime(), or gorahyan{} is not initialized');
        }
    }
    private _calculateElapsedRuntimeOfControlTests(testStart: Date, testEnd: Date) {
        const
            elapsedTimeInMS = testEnd.getTime() - testStart.getTime(),
            seconds = Math.floor(elapsedTimeInMS / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            elapsedTimeMessage = `Elapsed time to run tests: ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${elapsedTimeInMS} milliseconds`;

        return {
            elapsedTimeMessage,
            elapsedTimeInMS,
            hours,
            minutes,
            seconds
        }
    }
}