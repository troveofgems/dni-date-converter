import {GorahyanInterface} from "./interfaces/gorahyan.interface";
import GorahyanInitLib, { setConvergenceTimeArtifacts } from "./lib/gorahyan.init.lib";

import SurfaceConverterLib from "./lib/surface.converter.lib";
import CavernConverterLib from "./lib/cavern.converter.lib";

export default class DniGorahyan {
    public gorahyan: GorahyanInterface = setConvergenceTimeArtifacts(GorahyanInitLib()); // Expose Selected Class Internals So Others May Review Calculations/Values As Needed
    public surfaceToCavernTimeConverter;
    public cavernToSurfaceTimeConverter;
    public runControlTests;

    constructor() {
        this.surfaceToCavernTimeConverter = this.surfaceToCavernTime; // Sur to Cav - Converter Call
        this.cavernToSurfaceTimeConverter = this.cavernToSurfaceTime; // Cav to Sur - Converter Call
        this.runControlTests = this._runControlTests;
    }

    // Public Methods Available: surfaceToCavernTime, cavernToSurfaceTime, runControlTests
    public surfaceToCavernTime(surfaceDateTime?: Date | string | null | undefined): string {
        this._handleUninitializedConstructor(
            (!this.surfaceToCavernTimeConverter || !this.gorahyan),
            'surfaceToCavernTimeConverter or gorahyan is not initialized'
        );
        let
            converter = SurfaceConverterLib(this.gorahyan),
            { convertSurfaceTimestampToCavern } = converter;
        return convertSurfaceTimestampToCavern(surfaceDateTime);
    }

    public cavernToSurfaceTime(cavernDateTimeString: string): {

    } {
        this._handleUninitializedConstructor(
            (!this.cavernToSurfaceTimeConverter || !this.gorahyan),
            'cavernToSurfaceTimeConverter or gorahyan is not initialized'
        );

        let
            converter = CavernConverterLib(this.gorahyan),
            { convertCavernTimestampToSurface } = converter;

        return convertCavernTimestampToSurface(cavernDateTimeString);
    }

    // Private Methods
    private _runControlTests(DEBUG: boolean = true) {
        this._handleUninitializedConstructor(
            (!this.surfaceToCavernTimeConverter /*|| !this.cavernToSurfaceTimeConverter*/ || !this.gorahyan),
            'cavernToSurfaceTimeConverter, surfaceToCavernTimeConverter, or gorahyan is not initialized'
        );

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

        const runtimeMetrics = this._calculateElapsedRuntimeOfControlTests(testStart, new Date());

        let results = {
            runtimeMetrics,
            generated: {
                first_test,
                second_test,
                third_test
            }
        };

        return results;
    }
    private _handleUninitializedConstructor(uninitializedConstructorDetected: boolean, errorMessage: string) {
        if (uninitializedConstructorDetected) { throw new Error(errorMessage); }
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

let test = new DniGorahyan();
test.runControlTests();