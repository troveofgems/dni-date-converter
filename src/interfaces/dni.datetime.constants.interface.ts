import Big from "big.js";
export interface DniDatetimeConstantsInterface {
    dates: {
        calendarConvergence: {
            earthConvergenceDateTimeString: string,
            earthConvergenceDateTimeObject: object
        },
        utc: {
            convergence: Date,
            convergenceInMS: number
        },
        cavern: {
            convergence: Date,
            convergenceInMS: number
        },
        local: {
            convergence: Date,
            convergenceInMS: number
        }
    },
    bigs: {
        msPerHahr: Big,
        refDniHahr: Big,
        prorahnteePerHahr: Big,
        refProrahnteePerHahr: Big,
        msPerProrahn: Big,
        deltas: {
            hahrShift: Big,
            vaileeShift: Big,
            yahrShift: Big,
            gartahvoShift: Big,
            tahvoShift: Big,
            gorahnShift: Big
        }
    },
    readonly: {
        msPerHahr: number,
        refDniHahr: number,
        prorahnteePerHahr: number,
        refProrahnteePerHahr: number,
        msPerProrahn: any,
        deltas: {
            hahrShift: number,
            vaileeShift: number,
            yahrShift: number,
            gartahvoShift: number,
            tahvoShift: number,
            gorahnShift: number
        }
    }
}