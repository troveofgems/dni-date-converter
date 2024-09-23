import DniGorahyan from "../index";

export interface Converters {
    surfaceToCavern: (surfaceDateTime?: Date | string | null | undefined) => DniGorahyan;
    cavernToSurface: (cavernDateTimeString: string) => DniGorahyan;
}

export interface Tests {
    runControlTests: () => DniGorahyan;
    simulateCatastrophicInitFailure: () => Error | void;
}

interface ControlTestResults {
    runtimeMetrics: {
        elapsedTimeMessage: string;
        elapsedTimeInMS: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    generated: {
        first_test_results: string;
        second_test_results: string;
        third_test_results: string;
        fourth_test_results: {};
        fifth_test_results: {};
        sixth_test_results: {};
    };
}