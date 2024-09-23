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

/** D'ni Holidays */
export const DNI_HOLIDAY_NEW_YEAR = "Leefo 1";
export const DNI_HOLIDAY_FIRST_FEAST_OF_THE_MAKER = "Lenovoo 10 BE";
export const DNI_HOLIDAY_SECOND_FEAST_OF_THE_MAKER = "Leebro 20 BE";
export const DNI_HOLIDAY_THIRD_FEAST_OF_THE_MAKER = "Leevofo 18 BE";
export const DNI_HOLIDAY_COMMON_LIBRARY_OPENING = "Leefo 12 233 DE";
export const DNI_HOLIDAY_DAY_OF_DANCING = "Leetar 21 3646 DE";
export const DNI_HOLIDAY_FIRST_ARRIVAL_OF_THE_GREAT_KING = "Leevot 12 1323 DE";
export const DNI_HOLIDAY_CORONATION_OF_KING_KERATH = "Leevofo 27 6731 DE";

/** D'ni Holiday Descriptions */
export const DNI_HOLIDAY_DESC__FEAST_OF_THE_MAKER =
    "The celebration in question predates the D'ni's arrival on Earth, sharing its " +
    "name with two other similar events. Unfortunately, there is limited information available " +
    "regarding the rituals performed on this day or its specific purpose. Based on the " +
    "description provided, it appears to have been a religious holy day dedicated to honoring " +
    "the D'ni deity Yahvo."

export const DNI_HOLIDAY_DESC__DNI_NEW_YEAR =
    "This holiday celebrates the D'ni New Year.";

export const DNI_HOLIDAY_DESC__COMMON_LIBRARY_OPENING =
    "On this momentous day, the Common Library burst forth onto the scene, ushering in an era of unprecedented joy " +
    "for the D'ni people. This groundbreaking event marked a significant milestone in history, as it granted ordinary " +
    "citizens access to realms beyond their wildest dreams – all through the power of books.\n\n" +
    "This remarkable development allowed those who couldn't afford such luxuries on their own to explore vast new " +
    "worlds. While some historical accounts suggest that not everyone was entirely thrilled about this change, the " +
    "opening of the library ultimately proved to be a resounding success among the common folk.\n\n" +
    "It's worth noting that some records hint at internal debates within the guilds regarding the decision to open " +
    "the library on earth. However, the exact reasons behind these discussions remain unclear. Some speculate that " +
    "royal intervention may have played a role in the final decision, though this remains speculative.\n\n" +
    "Despite any potential reservations, the Common Library was opened, bringing boundless opportunity to the " +
    "D'ni people. This momentous occasion would go on to shape the course of history, offering new possibilities " +
    "and experiences to generations to come."

export const DNI_HOLIDAY_DESC__DAY_OF_DANCING = "The Bittersweet Celebration of the First Day of Dancing\n\n" +
    "In a paradoxical turn of events, the D'ni transformed what might have been a somber occasion into a grand " +
    "celebration. The First Day of Dancing commemorates a pivotal moment in their history, marking the destruction " +
    "of their ancient homeland.\n\n" +
    "This day, which could have been filled with mourning and loss, became a reason for jubilation. The D'ni " +
    "chose to view their departure from their ruined world as a liberation, rather than a tragedy. Their " +
    "decision to seal their memories of the old world from their hearts was seen as a testament to their " +
    "resilience and adaptability.\n\n" +
    "The celebration honored not just the destruction of their former home, but also the wisdom of the Great " +
    "King who had taught them to let go of the past. By embracing this new chapter in their history, " +
    "the D'ni demonstrated their capacity to find hope even in the face of catastrophic loss.\n\n" +
    "Moreover, this day marked the beginning of a new era – one where they could continue their lives on earth, " +
    "free from the destructive path that had consumed their original world. The First Day of Dancing became a " +
    "powerful symbol of transformation and renewal, reminding future generations of the strength and determination " +
    "that had carried their people through such trying times.\n\n" +
    "In essence, what could have been a day of mourning turned into a celebration of life, hope, and the ability to" +
    " forge a new destiny. The D'ni's choice to turn adversity into triumph serves as a powerful reminder of the human " +
    "spirit's capacity to find joy even in the face of profound loss.";

export const DNI_HOLIDAY_DESC__FIRST_ARRIVAL_OF_THE_GREAT_KING =
    "The arrival of the Great King marked a pivotal moment in D'ni history, though details about this figure " +
    "remain shrouded in mystery. The Great King's identity has been lost to time, leaving behind only whispers " +
    "of their significance.\n\n" +
    "This enigmatic leader brought about a fundamental shift in the D'ni way of life. They declared earth as the " +
    "D'ni's permanent home, effectively severing ties with their ancient world. This decree was met with both " +
    "acceptance and perhaps some reluctance, as it meant leaving behind everything they had ever known.\n\n" +
    "The Great King's prophecies were said to be numerous and profound, inscribed in books that have yet to " +
    "be discovered. These prophetic writings were believed to hold the keys to understanding the future and " +
    "guiding the D'ni people through the trials ahead.\n\n" +
    "However, the passage of time has taken its toll on these ancient texts. While the prophecies " +
    "themselves may still exist in some form, they remain inaccessible to modern D'ni scholars. Instead, " +
    "knowledge of these predictions comes from secondary sources, whose reliability cannot be verified.\n\n" +
    "Despite the lack of concrete evidence, the arrival of the Great King is remembered as a turning point " +
    "in D'ni history. Their words continue to shape the beliefs and actions of the D'ni people, even though the " +
    "specifics of those words remain a mystery.\n\n" +
    "This event serves as a poignant reminder of the power of leadership and prophecy in shaping " +
    "the course of civilization. It also highlights the challenges faced by historians and scholars " +
    "in reconstructing the past, especially when primary sources are missing and information relies heavily " +
    "on oral tradition and incomplete records.";

export const DNI_HOLIDAY_DESC__CORONATION_OF_KING_KERATH =
    "King Kerath's coronation stands as a significant event in the annals of D'ni history, marking " +
    "the culmination of his reign as the final ruler of the D'ni kingdom. This momentous occasion held " +
    "considerable weight for the D'ni people, reflecting the gravity of their situation as they stood at the " +
    "precipice of their civilization's downfall.\n\n" +
    "While the nature of this event remains somewhat ambiguous, historians continue to debate whether it served as " +
    "a formal holiday that persisted until the D'ni civilization's demise, or simply as a routine calendar entry, " +
    "akin to modern-day observances like Presidents' Day in the United States."

/** D'ni Misc Dates */
export const THE_FALL = "Leesahn 8 9400 DE";
export const THE_FALL__DESC = "Veovis' ill-fated rebellion against his fellow D'ni marked the beginning of an " +
    "era of unrelenting devastation. This pivotal event in D'ni history resulted in widespread destruction and " +
    "catastrophic loss of life, forever altering the course of the once-thriving civilization. The aftermath of " +
    "this fateful day continues to evoke profound sadness and serves as a poignant reminder of the transience of " +
    "power and the enduring legacy of conflict.";