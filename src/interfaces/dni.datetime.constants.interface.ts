import Big from "big.js";
export interface DniDatetimeConstantsInterface {
    dates: {
        calendarConvergence: string,
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
        vaileeShift: Big,
    },
    readonly: {
        msPerHahr: number,
        refDniHahr: number,
        prorahnteePerHahr: number,
        refProrahnteePerHahr: number,
        msPerProrahn: any,
        vaileeShift: number,
    }
}