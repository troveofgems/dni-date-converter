// D'ni Gorahyan Class Interfaces
import { GorahyanInterface } from "./interfaces/gorahyan.interface";
import { Converters, Tests } from "./interfaces/converters.interface";

// D'ni Gorahyan Main Initializer Function
import { init } from "./lib/gorahyan.init.lib";
import Big from "big.js";

// Main Index File Export Wrapper
export default function(): DniGorahyan {
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

    /** Class Methods */
    public printTimeArtifacts() {
        console.log("Calendar Convergence: ", this.gorahyan.dniConstants.controls.calendarConvergence);
        console.log("D'ni Readonly Constants: ", this.gorahyan.dniConstants.controls.constants.readonly);
        console.log(
            "Surface Artifacts Parsed: ",
            this.gorahyan.timestampArtifacts.surface.providedTimestamps.byUser,
            this.gorahyan.timestampArtifacts.surface.providedTimestamps.fromSystem,
            this.gorahyan.timestampArtifacts.surface.readonly
        );
        console.log(
            "Cavern Artifacts Parsed: ",
            this.gorahyan.timestampArtifacts.cavern.providedTimestamps.byUser,
            this.gorahyan.timestampArtifacts.cavern.providedTimestamps.fromSystem,
            this.gorahyan.timestampArtifacts.cavern.readonly
        );
    }

    /** User Input & System Getters/Setters */
    set userProvidedTS(timestamp: Date | string) {
        this.gorahyan.timestampArtifacts.surface.providedTimestamps.byUser = timestamp;
    }

    get userProvidedTS() {
        return this.gorahyan.timestampArtifacts.surface.providedTimestamps.byUser;
    }

    set systemProvidedTS(timestamp: string) {
        this.gorahyan.timestampArtifacts.surface.providedTimestamps.fromSystem = timestamp;
    }

    get systemProvidedTS() {
        return this.gorahyan.timestampArtifacts.surface.providedTimestamps.fromSystem;
    }

    /** Earth DateTime Getters/Setters */
    set year(year: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.year = Big(year);
        this.gorahyan.timestampArtifacts.surface.readonly.year = year;
    }

    get year() {
        return this.gorahyan.timestampArtifacts.surface.readonly.year;
    }

    set monthId(monthId: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.month.id = Big(monthId);
        this.gorahyan.timestampArtifacts.surface.readonly.month.id = monthId;
    }

    get monthId() {
        return this.gorahyan.timestampArtifacts.surface.readonly.month.id;
    }

    set monthText(monthName: string) {
        this.gorahyan.timestampArtifacts.surface.bigs.month.text = monthName;
        this.gorahyan.timestampArtifacts.surface.readonly.month.text = monthName;
    }

    get monthText() {
        return this.gorahyan.timestampArtifacts.surface.readonly.month.text;
    }

    set day(day: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.day = Big(day);
        this.gorahyan.timestampArtifacts.surface.readonly.day = day;
    }

    get day() {
        return this.gorahyan.timestampArtifacts.surface.readonly.day;
    }

    set hour(hour: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.hour = Big(hour);
        this.gorahyan.timestampArtifacts.surface.readonly.hour = hour;
    }

    get hour() {
        return this.gorahyan.timestampArtifacts.surface.readonly.hour;
    }

    set minute(minute: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.hour = Big(minute);
        this.gorahyan.timestampArtifacts.surface.readonly.hour = minute;
    }

    get minute() {
        return this.gorahyan.timestampArtifacts.surface.readonly.minute;
    }

    set second(second: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.second = Big(second);
        this.gorahyan.timestampArtifacts.surface.readonly.second = second;
    }

    get second() {
        return this.gorahyan.timestampArtifacts.surface.readonly.second;
    }

    /** D'ni DateTime Getters/Setters */
    get hahrtee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.hahr;
    }

    set hahrtee(hahr: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.hahr = Big(hahr);
        this.gorahyan.timestampArtifacts.cavern.readonly.hahr = hahr;
    }

    get vaileetee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.vailee.id;
    }

    set vaileetee(id: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.vailee.id = Big(id);
        this.gorahyan.timestampArtifacts.cavern.readonly.vailee.id = id;
    }

    get vaileeTextName() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.vailee.text;
    }

    set vaileeTextName(textName: string) {
        this.gorahyan.timestampArtifacts.cavern.bigs.vailee.text = textName;
        this.gorahyan.timestampArtifacts.cavern.readonly.vailee.text = textName;
    }

    get vaileeDniFontMappingName() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.vailee.dniFontMappingText;
    }

    set vaileeDniFontMappingName(dniFontMappingText: string) {
        this.gorahyan.timestampArtifacts.cavern.bigs.vailee.dniFontMappingText = dniFontMappingText;
        this.gorahyan.timestampArtifacts.cavern.readonly.vailee.dniFontMappingText = dniFontMappingText;
    }

    get yahrtee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.yahr;
    }

    set yahrtee(yahr: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.yahr = Big(yahr);
        this.gorahyan.timestampArtifacts.cavern.readonly.yahr = yahr;
    }

    get gahrtahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.gahrtahvo;
    }

    set gahrtahvotee(gahrtahvo: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.gahrtahvo = Big(gahrtahvo);
        this.gorahyan.timestampArtifacts.cavern.readonly.gahrtahvo = gahrtahvo;
    }

    get pahrtahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.pahrtahvo;
    }

    set pahrtahvotee(pahrtahvo: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.pahrtahvo = Big(pahrtahvo);
        this.gorahyan.timestampArtifacts.cavern.readonly.pahrtahvo = pahrtahvo;
    }

    get tahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.tahvo;
    }

    set tahvotee(tahvo: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.tahvo = Big(tahvo);
        this.gorahyan.timestampArtifacts.cavern.readonly.tahvo = tahvo;
    }

    get gorahntee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.gorahn;
    }

    set gorahntee(gorahn: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.gorahn = Big(gorahn);
        this.gorahyan.timestampArtifacts.cavern.readonly.gorahn = gorahn;
    }

    get prorahntee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.prorahn;
    }

    set prorahntee(prorahn: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.prorahn = Big(prorahn);
        this.gorahyan.timestampArtifacts.cavern.readonly.prorahn = prorahn;
    }

    /** Elapsed Time Since Convergence & User Inputted Dates Getters/Setters */
    set elapsedTimeAtConvergence(elapsedTimeInMS: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence = Big(elapsedTimeInMS);
        this.gorahyan.timestampArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence = elapsedTimeInMS;
    }

    get elapsedTimeAtConvergence() {
        return this.gorahyan.timestampArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence;
    }

    set elapsedTimeForGivenDate(elapsedTimeInMS: number) {
        this.gorahyan.timestampArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(elapsedTimeInMS);
        this.gorahyan.timestampArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = elapsedTimeInMS;
    }

    get elapsedTimeForGivenDate() {
        return this.gorahyan.timestampArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate;
    }

    /** Delta Shift Constant Getters */
    get HAHR_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.hahrShift;
    }

    get VAILEE_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.vaileeShift;
    }

    get YAHR_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.yahrShift;
    }

    get GAHRTAHVO_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.gahrtahvoShift;
    }

    get PAHRTAHVO_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.pahrtahvoShift;
    }

    get TAHVO_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.tahvoShift;
    }

    get GORAHN_SHIFT_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.deltas.gorahnShift;
    }

    /** D'ni Constants Getters */
    get EARTH_MS_PER_HAHR_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.msPerHahr;
    }

    get PRORAHNTEE_PER_HAHR_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.prorahnteePerHahr;
    }

    get DNI_HAHR_REFERENCE_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.refDniHahr;
    }

    get VAILEE_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.vailee.min;
    }

    get VAILEE_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.vailee.max;
    }

    get YAHR_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.yahr.min;
    }

    get YAHR_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.yahr.max;
    }

    get GAHRTAHVO_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.gahrtahvo.min;
    }

    get GAHRTAHVO_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.gahrtahvo.max;
    }

    get TAHVO_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.tahvo.min;
    }

    get TAHVO_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.tahvo.max;
    }

    get GORAHN_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.gorahn.min;
    }

    get GORAHN_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.gorahn.max;
    }

    get PRORAHN_MIN() {
        return this.gorahyan.dniConstants.controls.constants.limits.prorahn.min;
    }

    get PRORAHN_MAX() {
        return this.gorahyan.dniConstants.controls.constants.limits.prorahn.max;
    }

    /** Calculated Delta Getters/Setters */
    set calculatedEarthDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.earthDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.earthDelta = delta;
    }

    get calculatedEarthDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.earthDelta;
    }

    set calculatedHahrDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.hahrShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.hahrShiftedDelta = delta;
    }

    get calculatedHahrDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.hahrShiftedDelta;
    }

    set calculatedVaileeDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.vaileeShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.vaileeShiftedDelta = delta;
    }

    get calculatedVaileeDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.vaileeShiftedDelta;
    }

    set calculatedYahrDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.yahrShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.yahrShiftedDelta = delta;
    }

    get calculatedYahrDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.yahrShiftedDelta;
    }

    set calculatedGahrtahvoDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.gahrtahvoShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.gahrtahvoShiftedDelta = delta;
    }

    get calculatedGahrtahvoDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.gahrtahvoShiftedDelta;
    }

/*    set calculatedPahrtahvoDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.pahrtahvoShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.pahrtahvoShiftedDelta = delta;
    }

    get calculatedPahrtahvoDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.pahrtahvoShiftedDelta;
    }*/

    set calculatedTahvoDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.tahvoShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.tahvoShiftedDelta = delta;
    }

    get calculatedTahvoDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.tahvoShiftedDelta;
    }

    set calculatedGorahnDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.gorahnShiftedDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.gorahnShiftedDelta = delta;
    }

    get calculatedGorahnDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.gorahnShiftedDelta;
    }

    set calculatedProrahnteeDelta(delta: number) {
        this.gorahyan.timestampArtifacts.cavern.bigs.timeDeltasCalculated.prorahnteeDelta = Big(delta);
        this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.prorahnteeDelta = delta;
    }

    get calculatedProrahnteeDelta() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.timeDeltasCalculated.prorahnteeDelta;
    }
}

//test.gorahyan.dniConstants.controls.calendarConvergence.earth.STRING_CONSTANT
let test = new DniGorahyan();
test.converters.surfaceToCavern();
console.log(test.userProvidedTS, test.systemProvidedTS);