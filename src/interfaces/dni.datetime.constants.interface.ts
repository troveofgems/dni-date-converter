import Big from "big.js";

type ImportantDate = {
    date: string,
    description: string
}

export interface DniDatetimeConstantsInterface {
    controls: {
        calendarConvergence: {
            dni: {
                STRING_CONSTANT: string
            },
            earth: {
                STRING_CONSTANT: string,
                DATE_CONSTANT: Date,
                convergenceTimes: {
                    utc: Date,
                    cavern: Date,
                    local: Date
                }
            }
        },
        constants: {
            bigs: {
                msPerHahr: Big,
                refDniHahr: Big,
                prorahnteePerHahr: Big,
                refProrahnteePerHahr: Big,
                msPerProrahn: Big,
                msElapsedSinceConvergence: Big,
                deltas: {
                    hahrShift: Big,
                    vaileeShift: Big,
                    yahrShift: Big,
                    gahrtahvoShift: Big,
                    pahrtahvoShift: Big,
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
                msElapsedSinceConvergence: number,
                deltas: {
                    hahrShift: number,
                    vaileeShift: number,
                    yahrShift: number,
                    gahrtahvoShift: number,
                    pahrtahvoShift: number,
                    tahvoShift: number,
                    gorahnShift: number
                }
            },
            limits: {
                prorahn: {
                    min: number,
                    max: number
                },
                gorahn: {
                    min: number,
                    max: number
                },
                tahvo: {
                    min: number,
                    max: number
                },
                pahrtahvo: {
                    min: number,
                    max: number
                },
                gahrtahvo: {
                    min: number,
                    max: number
                },
                yahr: {
                    min: number,
                    max: number
                },
                vailee: {
                    min: number,
                    max: number
                }
            }
        },
        tests: {
            firstControlTestValue: string, // surfaceToCavern(string)
            secondControlTestValue: Date, // surfaceToCavern(Date{})
            thirdControlTestValue: null, // surfaceToCavern()
            fourthControlTestValue: string, // cavernToSurface(string): Known Control And Return Value
            fifthControlTestValue: string, // cavernToSurface(string): Spot-Check Test of Control And Return Value
            sixthControlTestValue: string, // cavernToSurface(string): Spot-Check Test of Control And Return Value
            results: {
                runtimeMetrics: {
                    elapsedTimeMessage: string,
                    elapsedTimeInMS: number,
                    hours: number,
                    minutes: number,
                    seconds: number
                },
                firstTest: string,
                secondTest: string,
                thirdTest: string,
                fourthTest: object,
                fifthTest: object,
                sixthTest: object,
                seventhTest: string,
                eighthTest: string,
                ninthTest: string,
                tenthTest: string,
                eleventhTest: string,
                twelthTest: string
            }
        },
        importantDates: {
            holidays: {
                firstFeastOfTheMaker: ImportantDate,
                secondFeastOfTheMaker: ImportantDate,
                thirdFeastOfTheMaker: ImportantDate,
                newYear: ImportantDate,
                commonLibraryOpening: ImportantDate,
                dayOfDancing: ImportantDate,
                firstArrivalOfTheGreatKing: ImportantDate,
                coronationOfKingKerath: ImportantDate,
            },
            misc: {
                theFall: ImportantDate
            }
        }
    }
}