interface EarthMonth {
    id: number,
    monthNameText: string,
    approximateDniDates: {
        beginsAround: string,
        endsAround: string
    }
}

function addEarthMonth(
    earthMonthConstants: EarthMonth[],
    monthNameText: string,
    beginsAround: string,
    endsAround: string
): void {
    earthMonthConstants.push({
        id: earthMonthConstants.length,
        monthNameText,
        approximateDniDates: {
            beginsAround,
            endsAround
        }
    });
}

// Set D'ni Month Data To Exportable
const EarthMonthConstants: EarthMonth[] = [];
addEarthMonth(EarthMonthConstants, "January", "", "");
addEarthMonth(EarthMonthConstants, "February", "", "");
addEarthMonth(EarthMonthConstants, "March", "", "");
addEarthMonth(EarthMonthConstants, "April", "", "");
addEarthMonth(EarthMonthConstants, "May", "", "");
addEarthMonth(EarthMonthConstants, "June", "", "");
addEarthMonth(EarthMonthConstants, "July", "", "");
addEarthMonth(EarthMonthConstants, "August", "", "");
addEarthMonth(EarthMonthConstants, "September", "", "");
addEarthMonth(EarthMonthConstants, "October", "", "");
addEarthMonth(EarthMonthConstants, "November", "", "");
addEarthMonth(EarthMonthConstants, "December", "", "");

export default EarthMonthConstants;