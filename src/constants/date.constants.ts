/** Calendar Convergence Constants */
export const EARTH_CONVERGENCE_DATE_STRING = "1991-04-21T09:54:00";
export const DNI_CONVERGENCE_DATE_STRING = "Leefo 1 9647 DE 0:00:00:00";
export const CONVERGENCE_YEAR = 1991;
export const CONVERGENCE_MONTH = 4;
export const CONVERGENCE_DAY = 21;
export const CONVERGENCE_HOUR = 16;
export const CONVERGENCE_MINUTE = 54;
export const CONVERGENCE_SECOND = 0;

/** D'ni Date-Time Constants */
export const EARTH_MS_PER_DNI_HAHR = 31556925216;
export const DNI_HAHR_CONVERGENCE_START = 9647;
export const PRORAHNTEE_PER_HAHR = 22656250;
export const PRORAHNTEE_ELAPSED_SINCE_CONVERGENCE = 218564843750;
export const EARTH_MS_ELAPSED_SINCE_CONVERGENCE = 672252866000;
export const EARTH_MS_PER_PRORAHN = 1392.8573888441379;

/** D'ni Date-Time Min/Max Values */
// - Mins
export const PRORAHN_MIN = 0;
export const GORAHN_MIN = 0;
export const TAHVO_MIN = 0;
export const PAHRTAHVO_MIN = 1;
export const GAHRTAHVO_MIN = 0;
export const YAHR_MIN = 0;
export const VAILEE_MIN = 0;
// - Maxes
export const PRORAHN_MAX = 25;
export const GORAHN_MAX = 25;
export const TAHVO_MAX = 25;
export const PAHRTAHVO_MAX = 25;
export const GAHRTAHVO_MAX = 5;
export const YAHR_MAX = 29;
export const VAILEE_MAX = 9; // Index Begins at 0

/** D'ni Date-Time Shift Constants */
export const HAHR_SHIFT = EARTH_MS_PER_DNI_HAHR;
export const VAILEE_SHIFT = 2265625;
export const YAHR_SHIFT = 78125;
export const GAHRTAHVO_SHIFT = 15625;
export const PAHRTAHVO_SHIFT = 3125;
export const TAHVO_SHIFT = 625;
export const GORAHN_SHIFT = 25;

/** Control Test Date Constants */
export const FIRST_CONTROL_TEST_VALUE = EARTH_CONVERGENCE_DATE_STRING;
export const SECOND_CONTROL_TEST_VALUE = new Date(EARTH_CONVERGENCE_DATE_STRING);
export const THIRD_CONTROL_TEST_VALUE = null;
export const FOURTH_CONTROL_TEST_VALUE = DNI_CONVERGENCE_DATE_STRING;
export const FIFTH_CONTROL_TEST_VALUE = "Leevofo 8 9798 DE 2:13:00:00";
export const SIXTH_CONTROL_TEST_VALUE = "Leevosahn 5 9000 BE 1:05:06:07";

