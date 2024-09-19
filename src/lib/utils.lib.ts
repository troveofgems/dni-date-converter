export default function UtilsLib() {
    const _safeStringOperation = function<T>(input: T): string {
        if(typeof input === 'string') {
            return input;
        } else {
            throw new Error("String Value is Required");
        }
    }
    const _safeDateOperation = function<T>(input: T): Date {
        if (input instanceof Date) {
            return new Date(input);
        } else {
            throw new Error(`Error processing date object:`);
        }
    }
    const _padValue = function(val: number) {
        let s = String(val);
        if(s.length === 1) { s = "0" + s; }
        return s;
    }

    const calculateElapsedRuntimeOfControlTests = function(testStart: Date, testEnd: Date) {
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

    return {
        safeStringOperation: _safeStringOperation,
        safeDateOperation: _safeDateOperation,
        padValue: _padValue,
        calculateElapsedRuntimeOfControlTests
    }
}