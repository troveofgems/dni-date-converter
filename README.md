# D'ni Cavern And Surface Time Converters
This package facilitates the conversion of javascript date time objects or strings to D'ni formatted date-time strings
and D'ni date time strings to javascript date time objects.<br/><br/>

[Wikipedia - Myst & The D'ni](https://en.wikipedia.org/wiki/Myst_(series)#Plot)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Jest Test Suites](#jest-test-suites)
- [More Resources](#more-resources)
- [About](#about)
- [Contact and Issues](#contact-and-bug-reporting)
- [License](#license)

## Installation
This package is available through the npm registry.
Before installing, download and install Node.js. 
Node.js 20 or higher is required.
If this is a new project, make sure to create a package.json first with the npm init command.

Installation is done using the npm install command:<br/>
`$ npm install dni-cavern-time`

## Usage
The D'ni Cavern Time Converter Package exports a class called DniGorahyan. 

Once the DniGorahyan Class has been initialized in the file of your choice, the following methods become available to 
run:
1. surfaceToCavernTime(surfaceDateTime?: Date | string | null | undefined): string
   - This function
      - Accepts: <pre>new Date() | "2024-09-13T08:50:00" | null | undefined</pre>
      - Returns: string - Dn'i Datetime Formatted <pre>Leetar 29 9680 DE 4:11:16:08</pre>

Example - surfaceToCavern(surfaceDateTime?: Date | string | null | undefined):
```js
import DniGorahyan from 'dni-cavern-time';

let 
    dniTimeConverter = new DniGorahyan(),
    { surfaceToCavern } = dniTimeConverter,
    surfaceTimestampToConvertToDniDT = "1991-04-21T09:54:00"; // Dn'i Date Time Calendar Convergence, Provided time should be local.

const 
    usingString = surfaceToCavern(surfaceTimestampToConvertToDniDT),
    usingDate = surfaceToCavern(new Date(surfaceTimestampToConvertToDniDT)),
    usingCallWithNoParams = surfaceToCavern();

console.log(usingString); // => 1991-04-21T09:54:00 Always returns Leefo 1 9647 DE 0:00:00:00
console.log(usingDate); // => 1991-04-21T09:54:00 Always returns Leefo 1 9647 DE 0:00:00:00
console.log(usingCallWithNoParams) // => Returns the user's system's current date-time in D'ni;
```

2. cavernToSurface(cavernDateTimeString: string): {}
    - This
```js
import DniGorahyan from 'dni-cavern-time';

let 
    dniTimeConverter = new DniGorahyan(),
    { cavernToSurface } = dniTimeConverter,
    dniTimestampToConvertToSurfaceDT = "Leefo 1 9647 DE 0:00:00:00";

const convertedTS = cavernToSurface(dniTimestampToConvertToSurfaceDT);

console.log(convertedTS);
```
3. simulateCatastrophicObjectFailure(): <Unknown>Thrown Error
    - This function:
      - Accepts: No Parameters
      - Returns: Thrown Error 
      ``` 
      Error: cavernToSurfaceTime(), surfaceToCavernTime(), or gorahyan{} is not initialized
        at DniGorahyan._handleUninitializedConstructorArtifact
      ```
        - Purpose:
            - To test the error handling when any of the DniGorahyan properties or methods are somehow overwritten.
              
Example - Simulate Catastrophic Failure:
```js
import DniGorahyan from 'dni-cavern-time';

let dniTimeConverter = new DniGorahyan();

dniTimeConverter.simulateCatastrophicObjectFailure();
```
4. runControlTests(): {}
    - This function:
      - Accepts: No Parameters
      - Returns: Object <pre>{
    runtimeMetrics,
    generated: {
      first_test: string,
      second_test: string,
      third_test: string,
      fourth_test: { utc: string, cavern: string, local: string }
    }
}</pre>
      - Purpose: 
        - To Execute Associated DniGorahyan Functions And Confirm Return Values of Known Date Conversions. 
      - Functions Executed:
        - first_test: surfaceToCavernTime() => Date defaults to new Date(), Returns formatted to D'ni DateTime, 
        - second_test: surfaceToCavernTime(`'1991-04-21T09:54:00'`) => Returns string formatted to D'ni DateTime,
        - third_test: surfaceToCavernTime(`new Date('1991-04-21T09:54:00')`) => Returns string formatted to D'ni DateTime,
        - fourth_test: cavernToSurfaceTime(`'Leefo 1 9647 DE 0:00:00:00'`) => Returns object with UTC, Cavern, and Local DateTimes
in earth notation.
        
Example - Run Control Tests:
```js
import DniGorahyan from 'dni-cavern-time';

let dniTimeConverter = new DniGorahyan();

console.log(dniTimeConverter.runControlTests());
```

## Contributing
Contributions will not be accepted under the following conditions:
- Work without jest test files written for the contribution,<br/>
- If there have been changes made to the following file: `src/archive/original.source.code.js`
<br/><br/>
See the [About Section](#about) for more information.

Otherwise, if proper test files have been written and no changes have been made to the original source code file,
you may share your contributions, to do so:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and include your test files.
4. Push your branch: `git push origin feature-name`
5. Create a pull request.

## Jest Test Suites
The last coverage test report may be viewed [here]().

This package utilizes the Jest Testing Framework to test the code contained within this package.
All tests are found at the following directory structure and this is where all tests should be placed: `src/test` 

The naming convention for test files should follow the format:<br/>
`src/test/<dot-notation-filename>.test.ts`

1. The following command will run the package tests: `npm run test`

Expected Output: 
<pre>
 PASS  src/tests/dni.month.constants.test.ts
  D'ni Month Artifact Constants
    ✓ D'ni Month List Loaded (34 ms)
    ✓ D'ni Month: 1 - Leefo/lEfo (1 ms)
    ✓ D'ni Month: 2 - Leebro/lEbro (3 ms)
    ✓ D'ni Month: 3 - Leesahn/lEsan (1 ms)
    ✓ D'ni Month: 4 - Leetar/lEtar (1 ms)
    ✓ D'ni Month: 5 - Leevot/lEvot (1 ms)
    ✓ D'ni Month: 6 - Leevofo/lEvofo (1 ms)
    ✓ D'ni Month: 7 - Leevobro/lEvobro (1 ms)
    ✓ D'ni Month: 8 - Leevosahn/lEvosan (1 ms)
    ✓ D'ni Month: 9 - Leevotar/lEvotar (1 ms)
    ✓ D'ni Month: 10 - Leenovoo/lEnovU (4 ms)

 PASS  src/tests/gorahyan.init.lib.test.ts
  Gorahyan Init Lib Test Suite
    Library Loaded
      ✓ Library Loaded{} Instantiated (29 ms)
    Functions Exposed
      ✓ GorahyanInitLib() Function Exposed (1 ms)
      ✓ setConvergenceTimeArtifacts() Function Exposed
    Functions Called
      ✓ GorahyanInitLib() Function Called (1 ms)

 PASS  src/tests/earth.month.constants.test.ts
  Earth Month Artifact Constants
    ✓ Earth Month List Loaded (36 ms)
    ✓ Earth Month: 1 - January (6 ms)
    ✓ Earth Month: 2 - February (1 ms)
    ✓ Earth Month: 3 - March
    ✓ Earth Month: 4 - April (2 ms)
    ✓ Earth Month: 5 - May
    ✓ Earth Month: 6 - June (1 ms)
    ✓ Earth Month: 7 - July (1 ms)
    ✓ Earth Month: 8 - August (1 ms)
    ✓ Earth Month: 9 - September (1 ms)
    ✓ Earth Month: 10 - October
    ✓ Earth Month: 11 - November (3 ms)
    ✓ Earth Month: 12 - December (1 ms)

 PASS  src/tests/utils.lib.test.ts
  Test Suite For Utils Library
    Library Import
      ✓ Library Loaded (7 ms)
    Functions Exposed
      ✓ safeStringOperation() Function Exposed
      ✓ safeDateOperation() Function Exposed (7 ms)
      ✓ safeDateOperation() Function Exposed
    Functions Tested
      ✓ safeStringOperation() Function Called (3 ms)
      ✓ safeStringOperation() Function Called With Non-String (28 ms)
      ✓ safeDateOperation() Function Called (1 ms)
      ✓ safeDateOperation() Function Called With Malformed-DateObject (4 ms)
      ✓ safeDateOperation() Function Called

 PASS  src/tests/index.test.ts
  Interface Test Suite
    DniGorahyan Instantiation
      ✓ Class DniGorahyan{} Instantiated (2 ms)
    Gorahyan Initialization
      ✓ Gorahyan Initialized (1 ms)
    DniGorahyan Function Definitions
      ✓ surfaceToCavernTimeConverter() is Defined (1 ms)
      ✓ cavernToSurfaceTimeConverter() is Defined (1 ms)
      ✓ runControlTests() is Defined (1 ms)
    DniGorahyan surfaceToCavernTimeConverter() Function Calls
      ✓ surfaceToCavernTimeConverter() Called With No Arguments Passed (15 ms)
      ✓ surfaceToCavernTimeConverter('1991-04-21T09:54:00') Called With DateString Passed (10 ms)
      ✓ surfaceToCavernTimeConverter(new Date('1991-04-21T09:54:00')) Called With DateObject Passed (5 ms)
    DniGorahyan cavernToSurfaceTimeConverter() Function Calls
      ✓ cavernToSurfaceTimeConverter() Called With D'ni DateTime String Passed (2 ms)
    DniGorahyan runControlTests() Function Calls
      ✓ runControlTests(false) Called (12 ms)
    DniGorahyan Uninitialized Value Detected
      ✓ Catastrophic Program Error (96 ms)
      ✓ From Attached Test Object (3 ms)

 PASS  src/tests/surface.converter.lib.test.ts
  Test Suite For Surface Converter Library
    Library Loaded
      ✓ Successfully Loaded (2 ms)
    Functions Exposed
      ✓ safeDateOperation() Function Exposed (1 ms)
    Imported Util Functions Tested
      ✓ safeStringOperation() Function Called With Non-String (85 ms)
      ✓ safeDateOperation() Function Called With Malformed-DateObject (6 ms)
    Default Exported Function Test
      ✓ surfaceToCavernTimeConverter() Called With No Arguments Passed (23 ms)
      ✓ surfaceToCavernTimeConverter('1991-04-21T09:54:00') Called With DateString Passed (6 ms)
      ✓ surfaceToCavernTimeConverter(new Date('1991-04-21T09:54:00')) Called With DateObject Passed (20 ms)
    Adjustment Tests
      ✓ Test adjustTimeValue() For Out of Bounds Prorahn (15 ms)
      ✓ Test adjustTimeValue() For Out of Bounds Vailee (4 ms)
      ✓ Test _subAdjustment() (3 ms)
      ✓ Test adjustTimeValue() For Out of Bounds Gorahn (3 ms)
      ✓ Test adjustTimeValue() For Out of Bounds Tahvo (8 ms)
      ✓ Test adjustTimeValue() For Out of Bounds Yahr (8 ms)
      ✓ Test adjustTimeValue() For Out of Bounds Gartahvo (16 ms)
    Exported Functions Tests
      ✓ mapVaileeName() Called With valid Vailee Id - 7 (15 ms)
      ✓ mapVaileeName() Called With invalid Vailee Id - 17 (22 ms)
      ✓ getDniConvertedTimestamp() Called To Expect Date In BE (4 ms)
      ✓ getDniConvertedTimestamp() Called To Expect Date In DE (2 ms)
    Exported Functions Debug Test
      ✓ convertSurfaceTimestampToCavern(null, true) (2 ms)

 PASS  src/tests/dni.constants.test.ts
  Dn'i Constants Test Suite
    Gorahyan D'ni Time Artifact Constants
      ✓ Milliseconds Per Hahr Value (1 ms)
      ✓ Reference D'ni Hahr Value
      ✓ Prorahntee Per Hahr (1 ms)
      ✓ Reference Prorahntee Per Hahr (1 ms)
      ✓ Milliseconds Per Prorahntee
    Gorahyan D'ni Time Artifact Delta Shift Constants
      ✓ Hahr Delta Shift (1 ms)
      ✓ Vailee Delta Shift (1 ms)
      ✓ Yahr Delta Shift
      ✓ Gartahvo Delta Shift (1 ms)
      ✓ Tahvo Delta Shift (1 ms)
      ✓ Goran Delta Shift

 PASS  src/tests/leap.second.lib.test.ts
  Test Suite For Leap Second Library and Constants
    Functions Loaded
      ✓ attachLeapSecondData() Function Loaded (2 ms)
      ✓ adjustForLeapSeconds() Function Loaded (1 ms)
    Constants Tested
      ✓ leapProcessingConstants - leapDelta (1 ms)
      ✓ leapProcessingConstants - leapSecondOffset (1 ms)
      ✓ leapProcessingConstants - leapSecondList (4 ms)
      ✓ leapProcessingConstants - Initial Value leapSecondListEpoch: []
    Functions Tested
      ✓ attachLeapSecondData() Called. LeapSecondListEpoch List Generated (3 ms)

---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |     100 |      100 |     100 |     100 |                   
 src                       |     100 |      100 |     100 |     100 |                   
  index.ts                 |     100 |      100 |     100 |     100 |                   
 src/constants             |     100 |      100 |     100 |     100 |                   
  dni.date.constants.ts    |     100 |      100 |     100 |     100 |                   
  dni.month.constants.ts   |     100 |      100 |     100 |     100 |                   
  earth.month.constants.ts |     100 |      100 |     100 |     100 |                   
 src/lib                   |     100 |      100 |     100 |     100 |                   
  cavern.converter.lib.ts  |     100 |      100 |     100 |     100 |                   
  gorahyan.init.lib.ts     |     100 |      100 |     100 |     100 |                   
  leap.second.lib.ts       |     100 |      100 |     100 |     100 |                   
  surface.converter.lib.ts |     100 |      100 |     100 |     100 |                   
  utils.lib.ts             |     100 |      100 |     100 |     100 |                   
---------------------------|---------|----------|---------|---------|-------------------
Test Suites: 8 passed, 8 total
Tests:       86 passed, 86 total
Snapshots:   0 total
Time:        4.126 s
Ran all test suites.
</pre>

## More Resources
Check out work done by others regarding D'ni Timekeeping!
1. [D'ni Time Converter Program](https://www.guildofarchivists.org/utilities/dateconverter/) by @alahmnat (On Twitter). 
Based on work by RIUM+, Jehon the Scribe, and rokama. Additional contributions by Brett Middleton on 
the Guild of Archivists.
2. [25-Hour Digital Myst Clock/Chronometer](https://www.riumplus.com/25-hour-digital-myst-dni-clock-chronometer/) 
by Real Of Rium+
3. [General D'ni Time Wiki](https://archive.guildofarchivists.org/wiki/D%27ni_time) by the Guild of Archivists
4. [D'ni Time Conversion Wiki](https://archive.guildofarchivists.org/wiki/D%27ni_time_conversion)

## About
The first item in the [More Resources](#more-resources) Section is the inspiration for this npm package. I would not 
have been able to create this package without the efforts of those who came before me. I have stored their original 
work in the following location of this software package: `src/archive/original.source.code.js` for posterity's sake and
to preserve their original work and my source.

The code has been updated and implemented using Node and TypeScript.

## Contact And Bug Reporting
You can reach me at dkgreco@thetroveofgems.tech

To report a Bug, please create an issue [here](https://github.com/troveofgems/dni-date-converter/issues/new).

## License
This project is licensed under the [MIT License](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).