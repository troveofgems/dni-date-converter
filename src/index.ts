console.log('Happy developing ✨');
import Big from "big.js";

// Interfaces
import {GorahyanInterface} from "./interfaces/gorahyan.interface";

// Functions and Data
import DniDateTimeConstants from "./constants/dni.date.constants";
import {attachLeapSecondData, AdjustForLeapSeconds} from "./lib/leap.second.controller";

const
    DEBUG = false,
    dateTimeOfConvergence = "1991-04-21T09:54:00", // This is Cavern Local
    dateTimeTest = "1991-04-21T09:54:00";

export default class DniGorahyan {
    gorahyan: GorahyanInterface;

    constructor() {
        this.gorahyan = {
            _leapSeconds: attachLeapSecondData(),
            dniConstants: DniDateTimeConstants(),
            cavern: {
                convertedTimestamp: ""
            },
            surface: {
                currentTS: new Date(),
                requestedTSTranslation: DEBUG ? dateTimeTest : null,
            },
            conversionArtifacts: {
                cavern: {
                    bigs: {
                        hahr: Big(0),
                        vailee: {
                            id: Big(0),
                            text: "",
                            dniFontMappingText: ""
                        },
                        yahr: Big(0),
                        gartahvo: Big(0),
                        tahvo: Big(0),
                        gorahn: Big(0),
                        prorahn: Big(0),
                        timeDeltas: {}
                    },
                    readonly: {
                        hahr: 0,
                        vailee: {
                            id: 0,
                            text: "",
                            dniFontMappingText: ""
                        },
                        yahr: 0,
                        gartahvo: 0,
                        tahvo: 0,
                        gorahn: 0,
                        prorahn: 0,
                        timeDeltas: {}
                    }
                },
                surface: {
                    bigs: {
                        year: Big(0),
                        month: {
                            id: Big(0),
                            text: ""
                        },
                        day: Big(0),
                        hour: Big(0),
                        minute: Big(0),
                        second: Big(0),
                        millisecond: Big(0),
                        timeDeltas: {
                            elapsedSecondsAtConvergence: Big(0),
                            elapsedSecondsForGivenDate: Big(0)
                        }
                    },
                    readonly: {
                        year: 0,
                        month: {
                            id: 0,
                            text: ""
                        },
                        day: 0,
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0,
                        timeDeltas: {
                            elapsedSecondsAtConvergence: 0,
                            elapsedSecondsForGivenDate: 0
                        }
                    }
                }
            }
        }
    };

    safeStringOperation<T>(input: T): string {
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
    safeDateOperation<T>(input: T): Date {
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

    private _setConvergenceTimeArtifacts() {
        const elapsedSecondsAtConvergence = this._setSurfaceTimeArtifactsByString(dateTimeOfConvergence);

        this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence =
            Big(elapsedSecondsAtConvergence);
        this.gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence =
            elapsedSecondsAtConvergence;
    }
    private _setSurfaceTimeArtifactsByString(surfaceDateTime: string) {
        const
            parsedData = surfaceDateTime.split("T"),
            requestedDate = parsedData[0].split("-"),
            requestedTime = parsedData[1].split(":");

        let // Convert strings To ints and store them against the class object.
            year    = parseInt(requestedDate[0]),
            month   = parseInt(requestedDate[1]),
            day     = parseInt(requestedDate[2]),
            hour    = parseInt(requestedTime[0]),
            minute  = parseInt(requestedTime[1]),
            second  = parseInt(requestedTime[2]);

        this.gorahyan.conversionArtifacts.surface.bigs.year = Big(year);
        this.gorahyan.conversionArtifacts.surface.bigs.month.id = Big(month);
        this.gorahyan.conversionArtifacts.surface.bigs.day = Big(day);
        this.gorahyan.conversionArtifacts.surface.bigs.hour = Big(hour);
        this.gorahyan.conversionArtifacts.surface.bigs.minute = Big(minute);
        this.gorahyan.conversionArtifacts.surface.bigs.second = Big(second);

        this.gorahyan.conversionArtifacts.surface.readonly.year = year;
        this.gorahyan.conversionArtifacts.surface.readonly.month.id = month;
        this.gorahyan.conversionArtifacts.surface.readonly.day = day;
        this.gorahyan.conversionArtifacts.surface.readonly.hour = hour;
        this.gorahyan.conversionArtifacts.surface.readonly.minute = minute;
        this.gorahyan.conversionArtifacts.surface.readonly.second = second;

        let dt = new Date(year, month - 1, day);
        dt.setUTCHours(hour);
        dt.setUTCMinutes(minute + (7 * 60));
        dt.setUTCSeconds(second);
        let temp = Date.parse(dt.toISOString());

        return AdjustForLeapSeconds(Big(temp), this.gorahyan);
    }
    private _setSurfaceTimeArtifactsByDateObject(surfaceDateTime: Date) {
        console.log("Process User Provided DateTime Object...", surfaceDateTime);
        let dt = new Date(surfaceDateTime.getUTCFullYear(), surfaceDateTime.getMonth(), surfaceDateTime.getDate());
        dt.setUTCHours(surfaceDateTime.getHours());
        dt.setUTCMinutes(surfaceDateTime.getMinutes() + (7 * 60));
        dt.setUTCSeconds(surfaceDateTime.getSeconds());
        let temp = Date.parse(dt.toISOString());

        return AdjustForLeapSeconds(Big(temp), this.gorahyan);
    }
    private _convertSurfaceTimestampToCavern(surfaceDateTime?: Date | string | null | undefined) {
        this._setConvergenceTimeArtifacts();
        let // Process And Store Surface Time Artifacts
            stringPassed = typeof surfaceDateTime === "string",
            dateObjectPassed = typeof surfaceDateTime === "object",
            nullOrUndefinedPassed = surfaceDateTime === undefined || surfaceDateTime === null;

        if(stringPassed) {
            let
                safeDateTimeString = this.safeStringOperation(surfaceDateTime),
                processedDTString = this._setSurfaceTimeArtifactsByString(safeDateTimeString);

            this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTString);
            this.gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTString;
        } else if (dateObjectPassed) {
            let
                safeDateTimeObject = this.safeDateOperation(surfaceDateTime),
                processedDTObject = this._setSurfaceTimeArtifactsByDateObject(safeDateTimeObject);

            this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            this.gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        } else if (nullOrUndefinedPassed) {
            let
                dateToProcess = DEBUG ? new Date(dateTimeTest) : new Date(),
                processedDTObject = this._setSurfaceTimeArtifactsByDateObject(dateToProcess);

            this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate = Big(processedDTObject);
            this.gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsForGivenDate = processedDTObject;
        }

        console.log(this.gorahyan.conversionArtifacts.surface.readonly.timeDeltas.elapsedSecondsAtConvergence);

        let earthDeltaInMS = this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsForGivenDate
            .minus(this.gorahyan.conversionArtifacts.surface.bigs.timeDeltas.elapsedSecondsAtConvergence);
        console.log("Earth Delta: ", earthDeltaInMS.toNumber());

        const {
            bigs: {
                msPerHahr, // Number of Milliseconds in 1 Hahr
                vaileeShift, // Constant used to calculate the Vailee
                prorahnteePerHahr
            }
        } = this.gorahyan.dniConstants;

        /**
         * Calculate and Store D'ni Hahr
         * */
        let hahr: Big | number;
        hahr = earthDeltaInMS.div(msPerHahr);
        hahr = Math.floor(hahr.toNumber());

        let
            hahrValueToRemove = Big(hahr).times(msPerHahr),
            deltaWithHahrRemoved: Big | number;

        deltaWithHahrRemoved = earthDeltaInMS.minus(hahrValueToRemove);

        console.log("Calculated hahr: ", hahr);
        console.log("Calculated hahrValueToRemove: ", hahrValueToRemove.toNumber());
        console.log("Calculated deltaWithHahrRemoved: ", deltaWithHahrRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.hahr = Big(hahr);
        this.gorahyan.conversionArtifacts.cavern.readonly.hahr = hahr;

        /**
         * Convert Delta to D'ni Prorahntee For Rest of Calculations
         * */
        let
            prorahnAdjustment = prorahnteePerHahr.div(msPerHahr),
            deltaInProrahntee = deltaWithHahrRemoved.times(prorahnAdjustment);

        console.log("Calculated deltaInProrahn: ", deltaInProrahntee.toNumber());

        /**
         * Calculate and Store the Vailee
         * */
        let vaileeId: Big | number = deltaInProrahntee.div(vaileeShift);
        vaileeId = Math.floor(vaileeId.toNumber());

        console.log("Calculated Vailee prior to adjustment: ", vaileeId);

        let
            vaileeValueToRemove = Big(vaileeId).times(vaileeShift),
            prorahnteeDeltaWithVaileeRemoved: Big | number;

        prorahnteeDeltaWithVaileeRemoved = deltaInProrahntee.minus(vaileeValueToRemove);

        console.log("Calculated prorahnteeDeltaWithVaileeRemoved: ", prorahnteeDeltaWithVaileeRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id = Big(vaileeId);
        this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id = vaileeId;

        /**
         * Calculate and Store the Yahr
         * */
        let yahr: Big | number = prorahnteeDeltaWithVaileeRemoved.div(Big(78125));
        yahr = Math.floor(yahr.toNumber());

        console.log("Calculated yahr: ", yahr);

        let
            yahrValueToRemove = Big(yahr).times(Big(78125)),
            prorahnteeDeltaWithYahrRemoved: Big | number;

        prorahnteeDeltaWithYahrRemoved = prorahnteeDeltaWithVaileeRemoved.minus(yahrValueToRemove);

        console.log("Calculated prorahnteeDeltaWithYahrRemoved: ", prorahnteeDeltaWithYahrRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.yahr = Big(yahr);
        this.gorahyan.conversionArtifacts.cavern.readonly.yahr = yahr;

        /**
         * Calculate and Store the Gartahvo
         * */
        let gartahvo: Big | number = prorahnteeDeltaWithYahrRemoved.div(Big(15625));
        gartahvo = Math.floor(gartahvo.toNumber());

        console.log("Calculated gartahvo: ", gartahvo);

        let
            gartahvoValueToRemove = Big(gartahvo).times(Big(15625)),
            prorahnteeDeltaWithGartahvoRemoved: Big | number;

        prorahnteeDeltaWithGartahvoRemoved = prorahnteeDeltaWithYahrRemoved.minus(gartahvoValueToRemove);

        console.log("Calculated prorahnteeDeltaWithGartahvoRemoved: ", prorahnteeDeltaWithGartahvoRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo = Big(gartahvo);
        this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo = gartahvo;

        /**
         * Calculate and Store the Tahvo
         * */
        let tahvo: Big | number = prorahnteeDeltaWithGartahvoRemoved.div(Big(625));
        tahvo = Math.floor(tahvo.toNumber());

        console.log("Calculated tahvo: ", tahvo);

        let
            tahvoValueToRemove = Big(tahvo).times(Big(625)),
            prorahnteeDeltaWithTahvoRemoved: Big | number;

        prorahnteeDeltaWithTahvoRemoved = prorahnteeDeltaWithGartahvoRemoved.minus(tahvoValueToRemove);

        console.log("Calculated prorahnteeDeltaWithTahvoRemoved: ", prorahnteeDeltaWithTahvoRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.tahvo = Big(tahvo);
        this.gorahyan.conversionArtifacts.cavern.readonly.tahvo = tahvo;

        /**
         * Calculate and Store the Gorahn
         * */
        let gorahn: Big | number = prorahnteeDeltaWithTahvoRemoved.div(Big(25));
        gorahn = Math.floor(gorahn.toNumber());

        console.log("Calculated gorahn: ", gorahn);

        let
            gorahnValueToRemove = Big(gorahn).times(Big(25)),
            prorahnteeDeltaWithGorahnRemoved: Big | number;

        prorahnteeDeltaWithGorahnRemoved = prorahnteeDeltaWithTahvoRemoved.minus(gorahnValueToRemove);

        console.log("Calculated prorahnteeDeltaWithGorahnRemoved: ", prorahnteeDeltaWithGorahnRemoved.toNumber());

        this.gorahyan.conversionArtifacts.cavern.bigs.gorahn = Big(gorahn);
        this.gorahyan.conversionArtifacts.cavern.readonly.gorahn = gorahn;

        /**
         * Calculate and Store the Prorahn
         * */
        let prorahn: number = Math.floor(prorahnteeDeltaWithGorahnRemoved.toNumber());
        console.log("Calculated prorahn: ", prorahn);

        this.gorahyan.conversionArtifacts.cavern.bigs.prorahn = Big(prorahn);
        this.gorahyan.conversionArtifacts.cavern.readonly.prorahn = prorahn;

        /**
         * Adjust All Calculated Times As Needed
         * */
        this.adjustCalculatedTimes();
        console.log("Times have been adjusted? ", this.gorahyan.conversionArtifacts.cavern.readonly);

        return this._getDniConvertedTimestamp();
    }
    private _padValue(val: number) {
        let s = String(val);
        if(s.length === 1) {s = "0" + s;}
        return s;
    }

    private _getDniConvertedTimestamp() {
        let datetimeString = "";
        if (this.gorahyan.conversionArtifacts.cavern.readonly.hahr < 0) {
            datetimeString = this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text + " " +
                this.gorahyan.conversionArtifacts.cavern.readonly.yahr + " " +
                (this.gorahyan.conversionArtifacts.cavern.readonly.hahr * -1) + " BE " +
                this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo + ":" +
                this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.tahvo) + ":" +
                this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.gorahn) + ":" +
                this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.prorahn);
        }
        else {
            datetimeString = this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text + " " +
                this.gorahyan.conversionArtifacts.cavern.readonly.yahr + " " +
                this.gorahyan.conversionArtifacts.cavern.readonly.hahr + " DE "  +
                this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo + ":" +
                this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.tahvo) + ":" +
                this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.gorahn) + ":" +
                    this._padValue(this.gorahyan.conversionArtifacts.cavern.readonly.prorahn);
        }

        this.gorahyan.cavern.convertedTimestamp = datetimeString;
        return this.gorahyan.cavern.convertedTimestamp;
    }

    private _setVaileeName(vaileeId: number) {
        switch (vaileeId) {
            case 0:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leefo";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leefo";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEfo";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEfo";
                break;
            case 1:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leebro";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leebro";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEbro";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEbro";
                break;
            case 2:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leesahn";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leesahn";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEsan";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEsan";
                break;
            case 3:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leetar";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leetar";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEtar";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEtar";
                break;
            case 4:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leevot";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leevot";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEvot";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEvot";
                break;
            case 5:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leevofo";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leevofo";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEvofo";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEvofo";
                break;
            case 6:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leevobro";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leevobro";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEvobro";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEvobro";
                break;
            case 7:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leevosahn";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leevosahn";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEvosan";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEvosan";
                break;
            case 8:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leevotar";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leevotar";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEvotar";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEvotar";
                break;
            case 9:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Leenovoo";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Leenovoo";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "lEnovU";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "lEnovU";
                break;
            default:
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.text = "Riltagamin";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.text = "Riltagamin";
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.dniFontMappingText = "riltagamin";
                this.gorahyan.conversionArtifacts.cavern.readonly.vailee.dniFontMappingText = "riltagamin";
                break;
        }
    }
    adjustCalculatedTimes() {
        const {
            bigs: {
                refDniHahr
            }
        } = this.gorahyan.dniConstants;

        while (this.gorahyan.conversionArtifacts.cavern.readonly.prorahn > 25) {
            this.gorahyan.conversionArtifacts.cavern.bigs.prorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.prorahn.minus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.prorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.prorahn.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.prorahn < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.prorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.prorahn.plus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.prorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.prorahn.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.gorahn > 25) {
            this.gorahyan.conversionArtifacts.cavern.bigs.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.minus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.gorahn < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.plus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.gorahn =
                this.gorahyan.conversionArtifacts.cavern.bigs.gorahn.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.tahvo > 25) {
            this.gorahyan.conversionArtifacts.cavern.bigs.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.minus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.tahvo < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.plus(25);
            this.gorahyan.conversionArtifacts.cavern.readonly.tahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.tahvo.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo > 5) {
            this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.minus(5);
            this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.plus(5);
            this.gorahyan.conversionArtifacts.cavern.readonly.gartahvo =
                this.gorahyan.conversionArtifacts.cavern.bigs.gartahvo.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.yahr > 29) {
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.minus(29);
            this.gorahyan.conversionArtifacts.cavern.readonly.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.yahr < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.plus(29);
            this.gorahyan.conversionArtifacts.cavern.readonly.yahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id > 9) {
            this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.minus(10);
            this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.hahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.hahr.plus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.hahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.hahr.toNumber();
        }

        while (this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id < 0) {
            this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.plus(10);
            this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id =
                this.gorahyan.conversionArtifacts.cavern.bigs.vailee.id.toNumber();
            this.gorahyan.conversionArtifacts.cavern.bigs.hahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.hahr.minus(1);
            this.gorahyan.conversionArtifacts.cavern.readonly.hahr =
                this.gorahyan.conversionArtifacts.cavern.bigs.hahr.toNumber();
        }

        this.gorahyan.conversionArtifacts.cavern.bigs.hahr =
            this.gorahyan.conversionArtifacts.cavern.bigs.hahr.plus(refDniHahr);
        this.gorahyan.conversionArtifacts.cavern.readonly.hahr =
            this.gorahyan.conversionArtifacts.cavern.bigs.hahr.toNumber();
        this.gorahyan.conversionArtifacts.cavern.bigs.yahr =
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr.plus(1);
        this.gorahyan.conversionArtifacts.cavern.readonly.yahr =
            this.gorahyan.conversionArtifacts.cavern.bigs.yahr.toNumber();

        this._setVaileeName(this.gorahyan.conversionArtifacts.cavern.readonly.vailee.id);
    }


    surfaceToCavernTime(surfaceDateTime?: Date | string | null | undefined): string {
        return this._convertSurfaceTimestampToCavern(surfaceDateTime);
    }

    cavernToSurfaceTime(cavernDateTime?: Date): string {
        return "Cavern To Surface Time";
    }
}

/*let test = new DniGorahyan();
console.log(test.surfaceToCavernTime(dateTimeTest));*/

/*let test2 = new DniGorahyan();
console.log(test2.surfaceToCavernTime(new Date(dateTimeTest)));*/
/*let test3 = new DniGorahyan();
console.log(test3.surfaceToCavernTime());*/
