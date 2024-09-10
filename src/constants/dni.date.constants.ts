import Big from 'big.js';
import {DniDatetimeConstantsInterface} from "../interfaces/dni.datetime.constants.interface";

const // DO NOT CHANGE THESE VALUES WITHOUT PROPER CONSIDERATION!
    DNI_DATE_OF_CALENDAR_CONVERGENCE_STR = "Leefo 1 9647 DE 0:00:00:000",
    EARTH_DATE_OF_CALENDAR_CONVERGENCE_STR = "1991-04-21T09:54:00",
    DATE_OF_CALENDAR_CONVERGENCE = new Date(Date.UTC(1991, 4 - 1, 21, 16, 54, 0)),
    DATE_OF_CALENDAR_CONVERGENCE_OBJ = DATE_OF_CALENDAR_CONVERGENCE,
    MS_PER_HAHR = 31556925216, // the exact value is 31556925.216 seconds
    REF_DNI_HAHR = 9647, // Date Of Convergence
    PRORAHNTEE_PER_HAHR = 22656250,
    REF_PRORAHNTEE_PER_HAHR = 218564843750,
    MS_PER_PRORAHN = 1392.8573888441379,
    TOTAL_DNI_VAILEE = 10;
/*
    A vailee is roughly equivalent to a month.
    There are 10 equal vaileetee in each hahr.
    Their approximate respective dates on the Gregorian calendar are:
        Leefo: April 21 - May 27
        Leebro: May 28 - July 3
        Leesahn: July 3 - August 8
        Leetar: August 9 - September 14
        Leevot: September 14 - October 20
        Leevofo: October 21 - November 26
        Leevobro: November 26 - January 1
        Leevosahn: January 2 - Febuary 7
        Leevotar: Febuary 7 - March 15
        Leenovoo: March 16 - April 21
* */

export default function DniDateTimeConstants(): DniDatetimeConstantsInterface {
    let constantsAsBigs = {
        msPerHahr: Big(MS_PER_HAHR),
        refDniHahr: Big(REF_DNI_HAHR),
        prorahnteePerHahr: Big(PRORAHNTEE_PER_HAHR),
        refProrahnteePerHahr: Big(REF_PRORAHNTEE_PER_HAHR),
        msPerProrahn: Big(MS_PER_PRORAHN),
        deltas: {
            hahrShift: Big(MS_PER_HAHR),
            vaileeShift: Big(PRORAHNTEE_PER_HAHR)
                .div(TOTAL_DNI_VAILEE),
            yahrShift: Big(78125),
            gartahvoShift: Big(15625),
            tahvoShift: Big(625),
            goranShift: Big(25)
        }
    }

    // Convert to Cavern Local Time (GMT-0700)
    let cavern_convergence = new Date(DATE_OF_CALENDAR_CONVERGENCE);
    cavern_convergence.setHours(cavern_convergence.getHours() - 7);

    // Convert to Pacific Daylight Time (UTC-0700)
    const local_convergence = new Date(DATE_OF_CALENDAR_CONVERGENCE);
    local_convergence.setTime(local_convergence.getTime() - (7 * 60 * 60 * 1000)); // Subtract hours from UTC timestamp

    return {
        dates: {
            calendarConvergence: {
                earthConvergenceDateTimeString: EARTH_DATE_OF_CALENDAR_CONVERGENCE_STR,
                earthConvergenceDateTimeObject: DATE_OF_CALENDAR_CONVERGENCE_OBJ
            },
            utc: {
                convergence: DATE_OF_CALENDAR_CONVERGENCE,
                convergenceInMS: DATE_OF_CALENDAR_CONVERGENCE.getMilliseconds()
            },
            cavern: {
                convergence: cavern_convergence,
                convergenceInMS: cavern_convergence.getMilliseconds()
            },
            local: {
                convergence: local_convergence,
                convergenceInMS: local_convergence.getMilliseconds()
            }
        },
        bigs: constantsAsBigs,
        readonly: {
            msPerHahr: constantsAsBigs.msPerHahr.toNumber(),
            refDniHahr: constantsAsBigs.refDniHahr.toNumber(),
            prorahnteePerHahr: constantsAsBigs.prorahnteePerHahr.toNumber(),
            refProrahnteePerHahr: constantsAsBigs.refProrahnteePerHahr.toNumber(),
            msPerProrahn: constantsAsBigs.msPerProrahn.toPrecision(20),
            deltas: {
                hahrShift: constantsAsBigs.deltas.hahrShift.toNumber(),
                vaileeShift: constantsAsBigs.deltas.vaileeShift.toNumber(),
                yahrShift: constantsAsBigs.deltas.yahrShift.toNumber(),
                gartahvoShift: constantsAsBigs.deltas.gartahvoShift.toNumber(),
                tahvoShift: constantsAsBigs.deltas.tahvoShift.toNumber(),
                goranShift: constantsAsBigs.deltas.goranShift.toNumber()
            }
        }
    };
}