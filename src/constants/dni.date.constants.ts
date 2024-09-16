// Date of Calendar Convergence Was: "Leefo 1 9647 DE 0:00:00:000" || "1991-04-21T09:54:00"
import Big from 'big.js';
import {DniDatetimeConstantsInterface} from "../interfaces/dni.datetime.constants.interface";

const // DO NOT CHANGE THESE VALUES WITHOUT PROPER CONSIDERATION!
    EARTH_DATE_OF_CALENDAR_CONVERGENCE_STR = "1991-04-21T09:54:00",
    DATE_OF_CALENDAR_CONVERGENCE = new Date(Date.UTC(1991, 4 - 1, 21, 16, 54, 0)),
    MS_PER_HAHR = 31556925216, // the exact value is 31556925.216 seconds
    REF_DNI_HAHR = 9647, // D'ni Hahr Of Convergence
    PRORAHNTEE_PER_HAHR = 22656250, // Number of Prorahntee in 1 Hahr
    REF_PRORAHNTEE_PER_HAHR = 218564843750, // Prorahntee Elapsed Since Calendar Convergence
    MS_PER_PRORAHN = 1392.8573888441379, // Milliseconds per Prorahntee
    TOTAL_DNI_VAILEE = 10;

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
            gorahnShift: Big(25)
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
                earthConvergenceDateTimeObject: DATE_OF_CALENDAR_CONVERGENCE
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
                gorahnShift: constantsAsBigs.deltas.gorahnShift.toNumber()
            }
        }
    };
}