const mappingArray = [
    [")", 10],
    ["!", 11],
    ["@", 12],
    ["#", 13],
    ["$", 14],
    ["%", 15],
    ["^", 16],
    ["&", 17],
    ["*", 18],
    ["(", 19],
    ["[", 20],
    ["]", 21],
    ["\\", 22],
    ["{", 23],
    ["}", 24]
];

function getDniFontNumber(base10Number: number): string | number {
    return mappingArray.find(([, number]) => number === base10Number)?.[0] || base10Number.toString();
}

export function getDniNumberFromFont(fontSymbol: string) {
    return mappingArray.find(([font]) => font === fontSymbol)?.[1] || fontSymbol;
}

export const toBase25 = (base10Number: number) => {
    let numberToEvaluate = base10Number;
    if(base10Number < 10) {
        return `${base10Number}`;
    } else if (base10Number >= 10 && base10Number <= 24) {
        return `${getDniFontNumber(base10Number)}`;
    }

    // Large Number
    const stack: any = [];
    while(numberToEvaluate >= 25){
        stack.push(numberToEvaluate % 25);
        numberToEvaluate = Math.floor(numberToEvaluate / 25);
    }

    let
        dniString = getDniFontNumber(numberToEvaluate),
        totalStackSize = stack.length;

    for(let i = 0; i < totalStackSize; i++){
        let num = stack.pop();
        dniString += getDniFontNumber(num).toString();
    }

    return dniString;
};