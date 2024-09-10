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
        Leevosahn: January 2 - February 7
        Leevotar: February 7 - March 15
        Leenovoo: March 16 - April 21
* */

interface DniMonth {
    id: number,
    vaileeNameText: string,
    dniFontVaileeNameText: string,
    approximateEarthDates: {
        beginsAround: string,
        endsAround: string
    }
}

function addDniMonth(
    dniMonthConstants: DniMonth[],
    vaileeNameText: string,
    dniFontVaileeNameText: string,
    beginsAround: string,
    endsAround: string
): void {
    dniMonthConstants.push({
        id: dniMonthConstants.length,
        vaileeNameText,
        dniFontVaileeNameText,
        approximateEarthDates: {
            beginsAround,
            endsAround
        }
    });
}

// Set D'ni Month Data To Exportable
const DniMonthConstants: DniMonth[] = [];
addDniMonth(DniMonthConstants, "Leefo", "lEfo", "April 21", "May 27");
addDniMonth(DniMonthConstants, "Leebro", "lEbro", "May 28", "July 3");
addDniMonth(DniMonthConstants, "Leesahn", "lEsan", "July 3", "August 8");
addDniMonth(DniMonthConstants, "Leetar", "lEtar", "August 9", "September 14");
addDniMonth(DniMonthConstants, "Leevot", "lEvot", "September 14", "October 20");
addDniMonth(DniMonthConstants, "Leevofo", "lEvofo", "October 21", "November 26");
addDniMonth(DniMonthConstants, "Leevobro", "lEvobro", "November 26", "January 1");
addDniMonth(DniMonthConstants, "Leevosahn", "lEvosan", "January 2", "February 7");
addDniMonth(DniMonthConstants, "Leevotar", "lEvotar", "February 7", "March 15");
addDniMonth(DniMonthConstants, "Leenovoo", "lEnovU", "March 16", "April 21");

export default DniMonthConstants;