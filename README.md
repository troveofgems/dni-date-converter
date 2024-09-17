# D'ni Cavern And Surface Time Converters
This package facilitates the conversion of javascript date time objects or strings to D'ni formatted date-time strings
and D'ni date time strings to javascript date time objects.<br/><br/>

[Wikipedia - Myst & The D'ni](https://en.wikipedia.org/wiki/Myst_(series)#Plot)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](https://github.com/troveofgems/dni-date-converter/blob/main/CONTRIBUTING.md)
- [Jest Test Suites](#jest-test-suites)
- [More Resources](#more-resources)
- [About](#about)
- [Contact and Issues](#contact-and-bug-reporting)
- [License](#license)

## Installation
This package is available through the [npm registry](https://www.npmjs.com/package/dni-cavern-time). Before installing, download and install Node.js. 
Node.js 20 or higher is suggested.

If this is a new project, make sure to create a package.json first with the npm init command.

Installation is done using the npm install command:<br/>
`$ npm install dni-cavern-time`

## Usage
The D'ni Cavern Time Converter Package exports a default function called initDniGorahyan which once called, returns a 
new instance of a DniGorahyan Class. 

The following methods become available to run:
1. surfaceToCavern(surfaceDateTime?: Date | string | null | undefined): string
   - This function
      - Accepts: <pre>new Date() | "2024-09-13T08:50:00" | null | undefined</pre>
      - Returns: string - Dn'i Datetime Formatted <pre>Leetar 29 9680 DE 4:11:16:08</pre>

Example: ES6 Import Syntax -  surfaceToCavern(surfaceDateTime?: Date | string | null | undefined):
```js
import initDniGorahyan from 'dni-cavern-time';

let 
    dniTimeConverter = initDniGorahyan(),
    { surfaceToCavern } = dniTimeConverter.converters,
    surfaceTimestampToConvertToDniDT = "1991-04-21T09:54:00"; // Dn'i Date Time Calendar Convergence, Provided time should be local.

const 
    usingString = surfaceToCavern(surfaceTimestampToConvertToDniDT),
    usingDate = surfaceToCavern(new Date(surfaceTimestampToConvertToDniDT)),
    usingCallWithNoParams = surfaceToCavern();

console.log(usingString); // => 1991-04-21T09:54:00 Always returns Leefo 1 9647 DE 0:00:00:00
console.log(usingDate); // => 1991-04-21T09:54:00 Always returns Leefo 1 9647 DE 0:00:00:00
console.log(usingCallWithNoParams) // => Returns the user's system's current date-time in D'ni;
```
Example: CommonJs Import Syntax -  surfaceToCavern(surfaceDateTime?: Date | string | null | undefined):
```js
const dniTimeConverter = require('dni-cavern-time').default();

let { surfaceToCavern } = dniTimeConverter.converters,
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
    - This function
        - Accepts/Requires: Dn'i Datetime Formatted String <pre>Leetar 29 9680 DE 4:11:16:08</pre>
        - Returns: object <pre>{ utc: string, cavern: string, local: string }</pre>

Example: ES6 Import Syntax - cavernToSurface(surfaceDateTime: string):
```js
import initDniGorahyan from 'dni-cavern-time';

let
    dniTimeConverter = initDniGorahyan(),
    { cavernToSurface } = dniTimeConverter.converters,
    dniTimestampToConvertToSurfaceDT = "Leefo 1 9647 DE 0:00:00:00";

const convertedTS = cavernToSurface(dniTimestampToConvertToSurfaceDT);

console.log(convertedTS);
```
Example: CommonJs Import Syntax - cavernToSurface(surfaceDateTime: string):
```js
const dniTimeConverter = require('dni-cavern-time').default();

let { cavernToSurface } = dniTimeConverter.converters,
    dniTimestampToConvertToSurfaceDT = "Leefo 1 9647 DE 0:00:00:00";

const convertedTS = cavernToSurface(dniTimestampToConvertToSurfaceDT);

console.log(convertedTS);
```
3. simulateCatastrophicObjectFailure(): <Unknown>Thrown Error
    - This function:
      - Accepts: No Parameters
      - Returns: Thrown Error 
      ``` 
      Error: cavernToSurface(), surfaceToCavern(), or gorahyan{} is not initialized
        at DniGorahyan._handleUninitializedConstructorArtifact
      ```
        - Purpose:
            - To test the error handling when any of the DniGorahyan properties or methods are somehow overwritten.

Example: ES6 Import Syntax -  Simulate Catastrophic Failure:
```js
import initDniGorahyan from 'dni-cavern-time';

let
    dniTimeConverter = initDniGorahyan(),
    { simulateCatastrophicInitFailure } = dniTimeConverter.tests;

console.log(simulateCatastrophicInitFailure());
```
Example: CommonJs Import Syntax -  Simulate Catastrophic Failure:
```js
const dniTimeConverter = require('dni-cavern-time').default();

let { simulateCatastrophicInitFailure } = dniTimeConverter.tests;

console.log(simulateCatastrophicInitFailure());
```

4. runControlTests(): {}
    - This function:
      - Accepts: No Parameters
      - Returns: Object <pre>{
    runtimeMetrics,
    generated: {
      first_test_results: string,
      second_test_results: string,
      third_test_results: string,
      fourth_test_results: { utc: string, cavern: string, local: string },
      fifth_test_results: { utc: string, cavern: string, local: string },
      sixth_test_results: { utc: string, cavern: string, local: string },
    }
}</pre>
      - Purpose: 
        - To Execute Associated DniGorahyan Functions And Confirm Return Values of Known Date Conversions. 
      - Functions Executed:
        - first_test_results: surfaceToCavern() => Date defaults to new Date(), Returns formatted to D'ni DateTime, 
        - second_test_results: surfaceToCavern(`'1991-04-21T09:54:00'`) => Returns string formatted to D'ni DateTime,
        - third_test_results: surfaceToCavern(`new Date('1991-04-21T09:54:00')`) => Returns string formatted to D'ni DateTime,
        - fourth_test_results: cavernToSurface(`'Leefo 1 9647 DE 0:00:00:00'`) => Returns object with UTC, Cavern, and Local DateTimes,
        - fifth_test_results: cavernToSurface(`'Leevofo 8 9798 DE 2:13:00:00'`) => Returns object with UTC, Cavern, and Local DateTimes,
        - sixth_test_results: cavernToSurface(`'Leevosahn 5 9000 BE 1:05:06:07'`) => Returns object with UTC, Cavern, and Local DateTimes
in earth notation.

Example: ES6 Import Syntax -  Run Control Tests:
```js
import initDniGorahyan from 'dni-cavern-time';

let
    dniTimeConverter = initDniGorahyan(),
    { runControlTests } = dniTimeConverter.tests;

console.log(runControlTests());
```
Example: CommonJs Import Syntax -  Run Control Tests:
```js
const dniTimeConverter = require('dni-cavern-time').default();

let { runControlTests } = dniTimeConverter.tests;

console.log(runControlTests());
```

## Jest Test Suites
The last run coverage test report may be viewed [here](https://troveofgems.github.io/dni-date-converter/).

This package utilizes the Jest Testing Framework to test the code contained within this package.
All tests are found at the following directory structure and this is where all tests should be placed: `src/test` 

The naming convention for test files should follow the format:<br/>
`src/test/<dot-notation-filename>.test.ts`

1. The following command will run the package tests: `npm run test`

## More Resources
Check out work done by others regarding D'ni Timekeeping!
1. [D'ni Time Converter Program](https://www.guildofarchivists.org/utilities/dateconverter/) by @alahmnat (On Twitter). 
Based on work by RIUM+, Jehon the Scribe, and rokama. Additional contributions by Brett Middleton on 
the Guild of Archivists.
2. [25-Hour Digital Myst Clock/Chronometer](https://www.riumplus.com/25-hour-digital-myst-dni-clock-chronometer/) 
by Real Of Rium+
3. [General D'ni Time Wiki](https://archive.guildofarchivists.org/wiki/D%27ni_time) by the Guild of Archivists
4. [D'ni Time Conversion Wiki](https://archive.guildofarchivists.org/wiki/D%27ni_time_conversion)
5. [Original Source Code](https://www.guildofarchivists.org/utilities/dateconverter/js/DniDate.js) Based on work by RIUM+, Jehon the Scribe, and rokama. Additional contributions by Brett Middleton on
   the Guild of Archivists. 

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