export default function UtilsLib() {
    const _safeStringOperation = function<T>(input: T): string {
        let result: string = "";
        try {
            if (typeof input === 'string') {
                result = input;
            }
        } catch (error) {
            console.error('Error processing date string:', error);
        }
        return result;
    }
    const _safeDateOperation = function<T>(input: T): Date {
        let result!: Date;
        try {
            if (input instanceof Date) {
                result = new Date(input);
            } else {
                result = new Date();
            }
        } catch (error) {
            console.error('Error processing date object:', error);
        }
        return result;
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