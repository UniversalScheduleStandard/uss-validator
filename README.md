# Universal Schedule Standard Validator 

Provides validation for [Universal Schedule Standard](https://github.com/UniversalScheduleStandard/UniversalScheduleStandard) objects. 

**This project is currently a work in progress and is not ready for use in production.**

This package may be used either on the frontend or backend. Is is written in ECMA Script 5, so it is widely compatible with any Javascript project. 

## Install

Navigate to your project folder and enter the following in terminal:

```
npm i uss-validator
```

The uss-validator will be added into your project and your package.json file. 

## How to Use

You call the validator with a Universal Schedule Standard Object as the only argument. The validator accepts Universal Schedule Standard objects as either JSON strings or JSON objects.

```js
import validator from 'uss-validator'

// then get get a .uss file or an object

const universalScheduleStandardObject = JSON.parse(file)
const response = validator(universalScheduleStandardObject)

console.log(response)

```

It will return a [response object](#response-object). 

## Response Object

The response object has four primary key values: `isValid`, `errors`, `warnings` and `info`. 

```js
{  
  isValid: true,
  errors: [],
  warnings: [
    { 
      title: 'Stripboard missing Calendar', 
      location: '5d01230c987033001725c908',
      message: 'There is a stripboard that is missing its calendarId'
    }
  ],
  info: { 
    isSchedule: true,
    name: 'Small Sample Schedule',
    source: 'Think Crew',
    ussVersion: '1.0.0' 
    breakdowns: 3,
    categories: 5,
    elements: 6,
    stripboards: 2,
    calendars: 1,
  }
}
```

The `isValid` value is a boolean that denotes whether the USS object is considered to be a valid constrution. 

The `errors` and `warnings` values are arrays that will contain [error objects](#error-objects) that describe any issues with the USS object. Errors are considered fatal and always result in `isValid` returning false. Warnings are merely related to the user's data potentially being malformed, and are not fatal. 

The `info` object contains various pieces of information about the USS object:

| Key        | Value |
| :---       | :--- |
| isSchedule | boolean \| true if the USS object contains both schedule and calendar info |
| name       | string \| the name of the schedule   |
| source     | string \| the originating site or app   |
| ussVersion | string \| the version of the standard this file is using   |
| breakdowns | number \| the number of breakdowns in the object |
| categories | number \| the number of categories in the object |
| elements   | number \| the number of elements in the object |
| stripboards| number \| the number of stripboards in the object |
| calendars  | number \| the number of calendars in the object |

### Error Objects

The uss-validator will return errors or warnings in the following format:

```
{
  title: string | the title of the error or warning,
  message: string | the full error or warning message,
  location: array | an array of text strings that will give clues as to where the error occurred in the file
}
```

Errors and warnings use the same object construction. 