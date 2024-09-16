// D'ni Gorahyan Class Interfaces
import { GorahyanInterface } from "./interfaces/gorahyan.interface";
import { Converters, Tests } from "./interfaces/converters.interface";

// D'ni Gorahyan Main Initializer Function
import { init } from "./lib/gorahyan.init.lib";

// Main Index File Export Wrapper
export default function initDniGorahyan(): DniGorahyan {
    return new DniGorahyan();
};

/**
 * DniGorahyan
 * This class represents a D'ni Clock Object and creates three (3) public interfaces for working with
 * the class.
 * */
export class DniGorahyan {
    /**
     * This object stores the following DateTime properties:
     * - Dni Constants, Months/Vailee, LeapSeconds and LeapEpoch Seconds
     * - Conversion Data
     * */
    public gorahyan!: GorahyanInterface;

    /**
     * This object stores the following DateTime converter methods:
     * - surfaceToCavern
     * - cavernToSurface
     * */
    public converters!: Converters;

    /**
     * This object stores the following Class test methods:
     * - runControlTests
     * - simulateCatastrophicObjectFailure
     * */
    public tests!: Tests;

    constructor() {
        init(this);
    }
}
