import Big from "big.js";

// D'ni Gorahyan Class Interfaces
import { GorahyanInterface } from "./interfaces/gorahyan.interface";
import { Converters, Tests } from "./interfaces/converters.interface";

// D'ni Gorahyan Main Initializer Functions
import { init } from "./lib/gorahyan.init.lib";

/**
 * DniGorahyan
 * This class represents a D'ni Clock Object and creates three (3) public interfaces for working with
 * the class.
 * */
export default class DniGorahyan {
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
        this.printMandatoryUsageDisclaimer();
        init(this);
    }

    printMandatoryUsageDisclaimer() {
        console.log(
            "\n" +
            "Software Package Notice:" + "\n\n" +
            "Myst, and all games and books in the Myst series are registered trademarks and copyrights of Cyan " +
            "Worlds, Inc. The concepts, settings, characters, art, and situations of the Myst series games and " +
            "books are copyrighted by Cyan Worlds, Inc. with all rights reserved." + "\n" +
            "I make no claims to any such rights or the intellectual properties of Cyan Worlds; nor do I intend " +
            "to profit financially from their work. This software package is an open source fan work, and is meant solely for " +
            "the amusement of myself and other fans of the Myst series." + "\n" +
            "By downloading and using this software package in your own software, web pages or sites, you agree " +
            "that you will not use this software package for profit or use this software package in any way " +
            "that would violate Cyan World Inc.'s rights or intellectual property." + "\n\n" +
            "- DKG: Maintainer from Guild of Maintainers\ndkgreco@thetroveofgems.tech" +
            "\n"
        );
    }

    /** Class Methods */
    public printTimeArtifacts() {
        console.log("Calendar Convergence: ", this.gorahyan.dniConstants.controls.calendarConvergence);
        console.log("D'ni Readonly Constants: ", this.gorahyan.dniConstants.controls.constants.readonly);
        console.log(
            "Surface Artifacts Parsed: ",
            this.userProvidedSurfaceTS,
            this.systemProvidedSurfaceTS,
            this.gorahyan.timestampArtifacts.surface.readonly
        );
        console.log(
            "Cavern Artifacts Parsed: ",
            this.userProvidedCavernTS,
            this.systemProvidedCavernTS,
            this.gorahyan.timestampArtifacts.cavern.readonly
        );
    }
    public printImportantDates(
        all = true,
        holidaysOnly = false,
        miscDatesOnly = false
    ) {
        if(all) {
            this.printDniHolidays();
            this.printDniMiscDates();
        } else if(holidaysOnly) {
            this.printDniHolidays();
        } else if(miscDatesOnly) {
            this.printDniMiscDates();
        }
    }
    public printDniHolidays() {
        console.log("D'ni Holidays: ", this.gorahyan.dniConstants.controls.importantDates.holidays);
    };
    public printDniMiscDates() {
        console.log("D'ni Misc Dates: ", this.gorahyan.dniConstants.controls.importantDates.misc);
    };

    public switchTimestampFormatter(typeId: number) {
        this.outputType = typeId;
    }

    /** User Input & System Getters/Setters */
    set userProvidedSurfaceTS(timestamp: Date | string) {
        this.gorahyan.timestampArtifacts.surface.providedTimestamps.byUser = timestamp;
    }

    get userProvidedSurfaceTS() {
        return this.gorahyan.timestampArtifacts.surface.providedTimestamps.byUser;
    }

    set systemProvidedSurfaceTS(timestamp: string) {
        this.gorahyan.timestampArtifacts.surface.providedTimestamps.fromSystem = timestamp;
    }

    get systemProvidedSurfaceTS() {
        return this.gorahyan.timestampArtifacts.surface.providedTimestamps.fromSystem;
    }

    set userProvidedCavernTS(timestamp: string) {
        this.gorahyan.timestampArtifacts.cavern.providedTimestamps.byUser = timestamp;
    }

    get userProvidedCavernTS() {
        return this.gorahyan.timestampArtifacts.cavern.providedTimestamps.byUser;
    }

    set systemProvidedCavernTS(timestamps: { utc: string, cavern: string, local: string }) {
        this.gorahyan.timestampArtifacts.cavern.providedTimestamps.fromSystem = timestamps;
    }

    get systemProvidedCavernTS() {
        return this.gorahyan.timestampArtifacts.cavern.providedTimestamps.fromSystem;
    }

    set outputType(outputType: number) {
        this.gorahyan.timestampArtifacts.surface.providedTimestamps.outputType = outputType;
    }

    get outputType() {
        return this.gorahyan.timestampArtifacts.surface.providedTimestamps.outputType;
    }

    /** Dni & Earth Date/Time Fragment Setter */
    set timeFragment(timeFragment: { type: string, value: number, source: string }) {
        // @ts-ignore
        this.gorahyan.timestampArtifacts[timeFragment.source].bigs[timeFragment.type] = Big(timeFragment.value);
        // @ts-ignore
        this.gorahyan.timestampArtifacts[timeFragment.source].readonly[timeFragment.type] = timeFragment.value;
    }

    /** Earth DateTime Getters */
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

    get day() {
        return this.gorahyan.timestampArtifacts.surface.readonly.day;
    }

    get hour() {
        return this.gorahyan.timestampArtifacts.surface.readonly.hour;
    }

    get minute() {
        return this.gorahyan.timestampArtifacts.surface.readonly.minute;
    }

    get second() {
        return this.gorahyan.timestampArtifacts.surface.readonly.second;
    }

    /** D'ni DateTime Getters/Setters */
    get hahrtee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.hahr;
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

    get gahrtahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.gahrtahvo;
    }

    get pahrtahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.pahrtahvo;
    }

    get tahvotee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.tahvo;
    }

    get gorahntee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.gorahn;
    }

    get prorahntee() {
        return this.gorahyan.timestampArtifacts.cavern.readonly.prorahn;
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

    get EARTH_MS_PER_PRORAHNTEE_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.msPerProrahn;
    }

    get PRORAHNTEE_PER_HAHR_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.prorahnteePerHahr;
    }

    get DNI_HAHR_REFERENCE_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.refDniHahr;
    }

    get REF_PRORAHNTEE_PER_HAHR_BIG() {
        return this.gorahyan.dniConstants.controls.constants.bigs.refProrahnteePerHahr;
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

    /** Output Settings Getters/Setters */
    set useDniFontMapping(useDniFontMapping: boolean) {
        this.gorahyan.outputSettings.useDniFontMapping = useDniFontMapping;
    }

    get useDniFontMapping() {
        return this.gorahyan.outputSettings.useDniFontMapping;
    }
    set includeNthBell(includeNthBell: boolean) {
        this.gorahyan.outputSettings.includeNthBell = includeNthBell;
    }

    get includeNthBell() {
        return this.gorahyan.outputSettings.includeNthBell;
    }

    /** Control Tests Getters/Setters */
    set nthControlTestResult(results: { testResult: string, testNumber: string }) {
        // @ts-ignore
        this.gorahyan.dniConstants.controls.tests.results[`${results.testNumber}Test`] = results.testResult;
    }

    get firstControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.firstTest;
    }

    get secondControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.secondTest;
    }

    get thirdControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.thirdTest;
    }

    get fourthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.fourthTest;
    }

    get fifthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.fifthTest;
    }

    get sixthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.sixthTest;
    }

    get seventhControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.seventhTest;
    }

    get eighthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.eighthTest;
    }

    get ninthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.ninthTest;
    }

    get tenthControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.tenthTest;
    }

    get eleventhControlTestResult() {
        return this.gorahyan.dniConstants.controls.tests.results.eleventhTest;
    }

    set runtimeMetrics(runtimeMetrics: {
        elapsedTimeMessage: string; elapsedTimeInMS: number;
        hours: number; minutes: number; seconds: number;
    }) {
        this.gorahyan.dniConstants.controls.tests.results.runtimeMetrics = runtimeMetrics;
    }

    get runtimeMetrics() {
        return this.gorahyan.dniConstants.controls.tests.results.runtimeMetrics;
    }
}

export function BuildDniGorahyan() {
    return new DniGorahyan();
}
