import {GorahyanInterface} from "./interfaces/gorahyan.interface";
import GorahyanInitLib, { setConvergenceTimeArtifacts } from "./lib/gorahyan.init.lib";

import SurfaceConverterLib from "./lib/surface.converter.lib";

export default class DniGorahyan {
    gorahyan: GorahyanInterface | null;
    surfaceToCavernTimeConverter;
    cavernToSurfaceTimeConverter: null;

    constructor() {
        this.gorahyan = setConvergenceTimeArtifacts(GorahyanInitLib());
        this.surfaceToCavernTimeConverter = SurfaceConverterLib(this.gorahyan);
        this.cavernToSurfaceTimeConverter = null;
    }

    public surfaceToCavernTime(surfaceDateTime?: Date | string | null | undefined): string {
        return this.surfaceToCavernTimeConverter.convertSurfaceTimestampToCavern(surfaceDateTime);
    }

    public cavernToSurfaceTime(cavernDateTime?: Date | string | null | undefined): string {
        return "Cavern To Surface Time";
    }

    public runControlTests(DEBUG: boolean = true) {
        const testStart = new Date();
        const {
            earthConvergenceDateTimeString
        } = this.gorahyan!.dniConstants.dates.calendarConvergence

        /**
         * First Test: Using String Value
         * */
        console.log("Running Controls Test...Debugging: ", DEBUG);
        console.log("First Test Using DateTime String...", earthConvergenceDateTimeString);
        let first_test: DniGorahyan | null = new DniGorahyan();
        console.log("First Test Complete. Result: ", first_test.surfaceToCavernTime(earthConvergenceDateTimeString));

        /**
         * Second Test: Using DateTime Object Value
         * */
        console.log("Second Test Using DateTime Object...", new Date(earthConvergenceDateTimeString));
        let second_test: DniGorahyan | null = new DniGorahyan();
        console.log("Second Test Complete. Result: ", second_test.surfaceToCavernTime(new Date(earthConvergenceDateTimeString)));

        /**
         * Third Test: Not Passing A Value For Conversion
         * */
        console.log("Third Test Using Undefined/Null...");
        let third_test: DniGorahyan | null = new DniGorahyan();
        console.log("Third Test Complete. Result: ", third_test.surfaceToCavernTime());

        // Cleanup Tests
        first_test  = null;
        second_test = null;
        third_test  = null;

        const testEnd = new Date();
        const elapsedTime = testEnd.getTime() - testStart.getTime();
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        console.log(`Elapsed time to run tests: ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${elapsedTime} milliseconds`);
    }
}

let controlTests: DniGorahyan | null = new DniGorahyan();
controlTests.runControlTests();
controlTests = null;