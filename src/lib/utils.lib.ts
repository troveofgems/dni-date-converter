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

    return {
        safeStringOperation: _safeStringOperation,
        safeDateOperation: _safeDateOperation,
        padValue: _padValue
    }
}