export interface Converters {
    converters: {
        surfaceToCavern: (surfaceDateTime?: Date | string | null | undefined) => string;
        cavernToSurface: (cavernDateTimeString: string) => {};
    };
}

export interface Tests {
    tests: {
        runControlTests: () => ControlTestResults;
        simulateCatastrophicInitFailure: () => Error | void;
    } | undefined;
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
        first_test: string;
        second_test: string;
        third_test: string;
        fourth_test_results: {};
        fifth_test_results: {};
        sixth_test_results: {};
    };
}