/*!
 * D'niDate 2.1.1
 * Copyright 2016–2020 Gary Buddell
 * Based on code created by RIUM+, Jehon the Scribe, and rokama: http://jsfiddle.net/154e70as/3/
 * Additional contributions by Brett Middleton: https://archive.guildofarchivists.org/wiki/D'ni_time_conversion
 * Based on the D'ni time system developed by Richard Watson and Cyan, Inc.
 * Licensed under the MIT license
 */
function DniDate(hahr, vailee, yahr, gartahvo, tahvo, gorahn, prorahn) {
    var hahr = hahr;
    var vailee = vailee;
    var yahr = yahr;
    var gartahvo = gartahvo;
    var tahvo = tahvo;
    var gorahn = gorahn;
    var prorahn = prorahn;

    // List of leap second timestamps from 1972-01-01 to 2017-01-01.
    // These timestamps are in units of seconds since the NTP epoch, which is 1900-01-01 00:00:00,
    // and it is assumed that the number of leap seconds always increases by 1 for each entry.
    // Must be converted to JavaScript / Unix timestamps! (Done by ConvertLeapSecTimeStamps())
    // source: https://www.ietf.org/timezones/data/leap-seconds.list
    var LeapSecTimeStamps = [2272060800, 2287785600, 2303683200, 2335219200, 2366755200, 2398291200, 2429913600, 2461449600, 2492985600, 2524521600, 2571782400, 2603318400, 2634854400, 2698012800, 2776982400, 2840140800, 2871676800, 2918937600, 2950473600, 2982009600, 3029443200, 3076704000, 3124137600, 3345062400, 3439756800, 3550089600, 3644697600, 3692217600];
    ConvertLeapSecTimeStamps();
    var LeapSecOffset = 10; // first entry, 1972-01-01, starts at 10 leap seconds

    var refTimeStamp = makeSurfaceTimeStamp(1991, 4, 21, 16, 54, 0); // This timestamp is in UTC
    var refDniHahr = 9647;
    var msPerHahr = 31556925216;
    var prorahnteePerHahr = 10 * 29 * 5 * 25 * 25 * 25;       // = 22656250
    var msPerProrahn = msPerHahr / prorahnteePerHahr;
    var refProrahnteePerHahr = 9647 * 290 * 5 * 25 * 25 * 25;

    function adjust() {
        while (prorahn > 25) {
            prorahn = prorahn - 25;
            gorahn = gorahn + 1;
        }
        while (prorahn < 0) {
            prorahn = prorahn + 25;
            gorahn = gorahn - 1;
        }

        while (gorahn > 25) {
            gorahn = gorahn - 25;
            tahvo = tahvo + 1;
        }
        while (gorahn < 0) {
            gorahn = gorahn + 25;
            tahvo = tahvo - 1;
        }

        while (tahvo > 25) {
            tahvo = tahvo - 25;
            gartahvo = gartahvo + 1;
        }
        while (tahvo < 0) {
            tahvo = tahvo + 25;
            gartahvo = gartahvo - 1;
        }

        while (gartahvo > 5) {
            gartahvo = gartahvo - 5;
            yahr = yahr + 1;
        }
        while (gartahvo < 0) {
            gartahvo = gartahvo + 5;
            yahr = yahr - 1;
        }

        while (yahr > 29) {
            yahr = yahr - 29;
            vailee = vailee + 1;
        }
        while (yahr < 0) {
            yahr = yahr + 29;
            vailee = vailee - 1;
        }

        while (vailee > 9) {
            vailee = vailee - 10;
            hahr = hahr + 1;
        }
        while (vailee < 0) {
            vailee = vailee + 10;
            hahr = hahr - 1;
        }
    }

    function makeSurfaceTimeStamp(year, month, day, hour, minute, second) {
        // convert a UTC date-time to a JavaScript timestamp
        month = parseInt(month);              // ensure that month & day are ints, not strings
        day = parseInt(day);
        if (month < 10) month = '0' + month;  // ensure that month & day are two-digit strings
        if (day < 10) day = '0' + day;        // otherwise Date.parse() fails

        var dt = new Date(year, month -1, day);
        dt.setUTCHours(hour);
        dt.setUTCMinutes(minute);
        dt.setUTCSeconds(second);
        var temp = Date.parse(dt.toISOString());
        return AdjustForLeapSeconds(temp);
    }

    function ConvertLeapSecTimeStamps() {
        // convert LeapSecTimeStamps from NTP epoch (number of seconds since 1900-01-01 00:00:00)
        // to JavaScript / Unix (number of milliseconds since 1970-01-01 00:00:00)
        var delta = Date.parse('1900-01-01');
        var arrayLen = LeapSecTimeStamps.length;
        for (var i = 0; i < arrayLen; i++) {
            LeapSecTimeStamps[i] = LeapSecTimeStamps[i] * 1000 + delta;
        }
    }

    function AdjustForLeapSeconds(TimeStamp) {
        // adjust a JavaScript timestamp for leap seconds
        var leapSecs = 0;
        var arrayLen = LeapSecTimeStamps.length;
        for (var i = 0; i < arrayLen && TimeStamp >= LeapSecTimeStamps[i]; leapSecs++, i++);
        if (leapSecs > 0) leapSecs += LeapSecOffset - 1;
        return TimeStamp + leapSecs * 1000;
    }

    function DejustForLeapSeconds(TimeStamp) {
        // adjust a JavaScript timestamp for leap seconds
        var leapSecs = 0;
        var arrayLen = LeapSecTimeStamps.length;
        for (var i = 0; i < arrayLen && TimeStamp >= LeapSecTimeStamps[i]; leapSecs++, i++);
        if (leapSecs > 0) leapSecs += LeapSecOffset - 1;
        return TimeStamp - leapSecs * 1000;
    }

    this.getHahr = function () {
        return hahr;
    }
    this.setHahr = function (h) {
        hahr = h;
        adjust();
    }

    this.getVailee = function () {
        return vailee;
    }
    this.setVailee = function (v) {
        vailee = v;
        adjust();
    }

    this.getYahr = function () {
        return yahr;
    }
    this.setYahr = function (y) {
        yahr = y;
        adjust();
    }

    this.getGartahvo = function () {
        return gartahvo;
    }
    this.setGartahvo = function (g) {
        gartahvo = g;
        adjust();
    }

    this.getPartahvo = function () {
        return Math.floor(tahvo / 5);
    }

    this.getTahvo = function () {
        return tahvo;
    }
    this.setTahvo = function (t) {
        tahvo = t;
        adjust();
    }

    this.getGorahn = function () {
        return gorahn;
    }
    this.setGorahn = function (g) {
        gorahn = g;
        adjust();
    }

    this.getProrahn = function () {
        return prorahn;
    }
    this.setProrahn = function (p) {
        prorahn = p;
        adjust();
    }

    this.toString = function () {
        return this.toDateString() + " " + this.toTimeString();
    }

    this.toCavernDateTimeString = function () {
        var tempTime = this;
        var tempSurfaceTime = this.toSurfaceDate();
        tempSurfaceTime.setUTCMinutes(tempSurfaceTime.getUTCMinutes() - (7 * 60));
        return tempSurfaceTime.toDateString() + " " + tempSurfaceTime.getUTCHours().pad(2) + ":" + tempSurfaceTime.getUTCMinutes().pad(2) + ":" + tempSurfaceTime.getUTCSeconds().pad(2) + " GMT-0700";
    }

    this.valueOf = function() {
        var sd = this.toSurfaceDate();
        return sd.valueOf();
    }

    this.toFontMappedString = function() {
        return this.toDateString(true) + " " + this.toTimeString();
    }

    this.toDateString = function (useDniFontMapping) {
        if (hahr < 0) {
            return this.getVaileeName(useDniFontMapping) + " " + yahr + " " + (hahr * -1) + " BE";
        }
        else {
            return this.getVaileeName(useDniFontMapping) + " " + yahr + " " + hahr + " DE";
        }
    }

    this.toTimeString = function () {
        return gartahvo + ":" + tahvo.pad(2) + ":" + gorahn.pad(2) + ":" + prorahn.pad(2);
    }

    this.getVaileeName = function (useDniFontMapping) {
        switch (vailee) {
            case 0:
                return useDniFontMapping === true ? "lEfo" : "Leefo";
            case 1:
                return useDniFontMapping === true ? "lEbro" : "Leebro";
            case 2:
                return useDniFontMapping === true ? "lEsan" : "Leesahn";
            case 3:
                return useDniFontMapping === true ? "lEtar" : "Leetar";
            case 4:
                return useDniFontMapping === true ? "lEvot" : "Leevot";
            case 5:
                return useDniFontMapping === true ? "lEvofo" : "Leevofo";
            case 6:
                return useDniFontMapping === true ? "lEvobro" : "Leevobro";
            case 7:
                return useDniFontMapping === true ? "lEvosan" : "Leevosahn";
            case 8:
                return useDniFontMapping === true ? "lEvotar" : "Leevotar";
            case 9:
                return useDniFontMapping === true ? "lEnovU" : "Leenovoo";
        }
    }

    this.setFromSurfaceDate = function (surface, isUTC) {
        if (surface === undefined) {
            surface = new Date();
        }
        // Treat the input date as UTC? This means the input date is read as the UTC date, so April 21, 1991 16:54:00 UTC is 0 DE Leefo 9647 0:0:0:0
        if (isUTC === true) {
            surface.setUTCMinutes(surface.getUTCMinutes() - surface.getTimezoneOffset());
        } else {
            // Using Cavern-local time (UTC-0700)
            surface.setUTCMinutes(surface.getUTCMinutes() - surface.getTimezoneOffset() + (7 * 60));
        }

        var surfaceTimeStamp = makeSurfaceTimeStamp(surface.getUTCFullYear(), surface.getUTCMonth() + 1, surface.getUTCDate(), surface.getUTCHours(), surface.getUTCMinutes(), surface.getUTCSeconds());

        var delta = surfaceTimeStamp - refTimeStamp;
        // calculate elapsed hahrtee from milliseconds delta
        hahr = Math.floor(delta / msPerHahr);
        delta -= hahr * msPerHahr;
        // convert milliseconds delta to prorahntee delta
        delta = delta * (prorahnteePerHahr / msPerHahr);
        // calculate all the D'ni units from the prorahntee delta
        vailee = Math.floor(delta / (29 * 5 * 25 * 25 * 25));
        delta -= vailee * (29 * 5 * 25 * 25 * 25);
        yahr = Math.floor(delta / (5 * 25 * 25 * 25));
        delta -= yahr * (5 * 25 * 25 * 25);
        gartahvo = Math.floor(delta / (25 * 25 * 25));
        delta -= gartahvo * (25 * 25 * 25);
        tahvo = Math.floor(delta / (25 * 25));
        delta -= tahvo * (25 * 25);
        gorahn = Math.floor(delta / 25);
        delta -= gorahn * 25;
        prorahn = Math.floor(delta);

        adjust();

        // add reference D'ni hahr (year) and make yahr (day) 1-based instead of 0-based
        hahr += refDniHahr;
        yahr++;
    }

    this.toSurfaceDate = function () {
        // Convert current values for D'ni date to prorahntee (essentially, time since 1 Leefo 0 DE 0:0:0:0)
        var dTimeInProrahntee = prorahn + (gorahn * 25) + (tahvo * 25 * 25) + (gartahvo * 25 * 25 * 25) + ((yahr - 1) * 5 * 25 * 25 * 25) + ((vailee - 1) * 29 * 5 * 25 * 25 * 25) + (hahr * 290 * 5 * 25 * 25 * 25);
        // Subtract from reference date prorahntee
        var dTimeDelta = refProrahnteePerHahr - dTimeInProrahntee;
        // Multiply by milliseconds per prorahn
        dTimeDelta = dTimeDelta * msPerProrahn;
        // Subtract milliseconds from reference timestamp
        dTimeDelta = refTimeStamp - dTimeDelta;
        // Convert new delta value to surface date (UTC)
        var surfaceDate = new Date(dTimeDelta);
        // Account for leap seconds in more contemporary dates
        surfaceDate = new Date(DejustForLeapSeconds(surfaceDate.getTime()));

        return surfaceDate;
    }

    if(arguments.length === 0) {
        this.setFromSurfaceDate(new Date());
    } else {
        if(vailee === undefined) {
            vailee = 0;
        }
        if(yahr === undefined) {
            yahr = 1;
        }
        if(gartahvo === undefined) {
            gartahvo = 0;
        }
        if(tahvo === undefined) {
            tahvo = 0;
        }
        if(gorahn === undefined) {
            gorahn = 0;
        }
        if(prorahn === undefined) {
            prorahn = 0;
        }
    }

    adjust();
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 1)) {s = "0" + s;}
    return s;
}