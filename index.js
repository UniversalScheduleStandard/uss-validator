var Ajv = require("ajv")
var schema = require('./schemas/schema')

/* 
UNIVERSAL SCHEDULE STANDARD VALIDATOR
Takes a USS object, checks whether it's valid JSON, then validates against a schema
Returns an object with isValid boolean and an array of errors, if any
*/

function validator(obj) {
  // establish response object
  var response = { 
    isValid: false, 
    info: {
      breakdowns: null, 
      categories: null, 
      elements: null, 
      stripboards: null, 
      calendars: null, 
      isSchedule: null,
    },
    errors: null 
  }
  try {
    if(_isJson(obj)) {
      // build ajv validator
      var ajv = new Ajv()
      var validate = ajv.compile(schema)
      // create an object from the JSON
      var objParsed = JSON.parse(JSON.stringify(obj))
      // check validation, collect any errors
      response.isValid = validate(objParsed)
      response.errors = validate.errors
      response.info.breakdowns = _getArrayLengthForKey(objParsed, 'breakdowns')
      response.info.categories = _getArrayLengthForKey(objParsed, 'categories')
      response.info.elements = _getArrayLengthForKey(objParsed, 'elements')
      response.info.stripboards = _getArrayLengthForKey(objParsed, 'stripboards')
      response.info.calendars = _getArrayLengthForKey(objParsed, 'calendars')
      response.info.isSchedule = _isObjectASchedule(objParsed)
    } else { // obj is not JSON
      response.isValid = false
      response.errors = isNotJsonError
    }
  } catch(e) {
    response.isValid = false
    response.errors = _createGeneralErrorReponse(e)
  } finally {
    // return response object
    console.log('response',response)
    return response
  }
}

function _getArrayLengthForKey(obj, key) {
  try {
    return _doesUssObjectHaveKey(obj, key) && Array.isArray(obj.universalScheduleStandard[key])
      ? obj.universalScheduleStandard[key].length
      : null
  } catch(e){
    console.error(e)
  }
}

function _doesUssObjectHaveKey(obj, key) {
  try {
    return typeof obj==='object' && obj.hasOwnProperty('universalScheduleStandard') && obj.universalScheduleStandard.hasOwnProperty(key)
  } catch(e) {
    console.error(e)
  }
}

function _isObjectASchedule(obj) {
  try {
    return _doesUssObjectHaveKey(obj, 'stripboards') && _doesUssObjectHaveKey(obj, 'calendars')
  } catch(e) {
    console.error(e)
  }
}

function _isJson(item) {
  if(item!==undefined && item!==null) {
    var jsonString = typeof item !== 'string' ? JSON.stringify(item) : item
    try {
      var jsonParsed = JSON.parse(jsonString)
    } catch(e) {
      return false
    }
    return typeof jsonParsed === 'object' && jsonParsed !== null
  }
  return false  
}

function _createGeneralErrorReponse(e) {
  return [{ 
    instancePath: 'error',
    schemaPath: 'error',
    keyword: 'error',
    params: { error: 'USS Validator Error' },
    message: e && e.message ? e.message : 'There was an unknown error in the USS Validator'
  }]
}

var isNotJsonError = [{ 
  instancePath: '/universalScheduleStandard',
  schemaPath: '#/properties/universalScheduleStandard',
  keyword: 'type',
  params: { type: 'JSON' },
  message: 'must be a valid JSON object' 
}]





const obj = {
  "universalScheduleStandard": {
    "id": "5cfe7d2510c4330017ab5ed5",
    "author": "Michael R. Williams",
    "company": "RKO Pictures",
    "created": "2022-05-04T00:12:06.000Z",
    "description": "This is a small example file that illustrates the structure without containing too much data",
    "episode": null,
    "episodeName": null,
    "name": "Small Sample Schedule",
    "project": "It's A Wonderful Life",
    "schedColor": "Blue",
    "schedDate": "2022-03-07T07:00:00.000Z",
    "scriptColor": "Pink",
    "scriptDate": "2022-03-06T07:00:00.000Z",
    "season": null,
    "source": "Think Crew",
    "version": "0.9.0",

    "breakdowns": [
      {
        "id": "5cfe7d2510c4330017ab5ed5",
        "comments":  null,
        "created": "2022-06-11T00:12:02.000Z",
        "description": "It's A Wonderful Life Production Schedule",
        "elements": [],
        "pages":  null,
        "scene":  null,
        "scriptPage":  null,
        "time": null,
        "type": "banner"
      },
      {
        "id": "5cfe7d2510c4330017ab5ed1",
        "comments": "This scene must be shot at night",
        "created": "2022-06-11T00:12:02.000Z",
        "description": "George finds Zuzu's petals in his pocket",
        "elements": ["5d9fc8cfc0efae0017a32e31", "5d9fc8cfc0efae0017a32de8", "5d9fc8d0c0efae0017a32e39", "5d9fc8cfc0efae0017a32d46", "5d9fc8cfc0efae0017a3201a", "5d9fc8cfc0efae0017a32dfc"],
        "pages": 0.25,
        "scene": "89PT1",
        "scriptPage": "112",
        "time": 5700000,
        "type": "scene"
      },
      {
        "id": "5cfe7d2510c4330017ab5ed3",
        "comments":  null,
        "created": "2022-06-11T00:12:02.000Z",
        "description": null,
        "elements": [],
        "pages":  null,
        "scene":  null,
        "scriptPage":  null,
        "time": null,
        "type": "day"
      }
    ],

    "calendars": [
      {
        "id" : "5d01230c987033001725c908",
        "events" : [ 
            {
              "id" : "5dcee721d3ebb20017bbeb6a",
              "type" : "start",
              "name" : null,
              "date" : "2022-06-20T08:00:00.000Z"
            },
            {
              "id" : "5d3b5c6d35bc890017e4eacb",
              "type" : "event",
              "name" : "travel",
              "date" : "2022-06-15T08:00:00.000Z"
            }
        ],
        "daysOff" : [0, 6],
        "name" : "Start on 6/20"
      }
    ],

    "categories": [
      {
        "id": "5d9fc8cfc0efae0017a32d6a",
        "ucid": 0,
        "created": "2022-06-11T00:11:59.000Z",
        "elements": ["5d9fc8cfc0efae0017a32de8"],
        "name": "Set"
      },
      {
        "id": "5d9fc8cfc0efae0017a32e12",
        "ucid": 1,
        "created": "2022-06-11T00:11:59.000Z",
        "elements": ["5d9fc8cfc0efae0017a32e31"],
        "name": "INT/EXT"
      },
      {
        "id": "5d9fc8cfc0efae0017a32aab",
        "ucid": 2,
        "created": "2022-06-11T00:11:59.000Z",
        "elements": ["5d9fc8d0c0efae0017a32e39"],
        "name": "Day/Night"
      },
      {
        "id": "5d9fc8cfc0efae0017a32d35",
        "ucid": 100,
        "created": "2022-06-11T00:11:59.000Z",
        "elements": ["5d9fc8cfc0efae0017a32d46", "5d9fc8cfc0efae0017a32dfc"],
        "name": "Cast Members"
      },
      {
        "id": "5d9fc8cfc0efae0017a32e16",
        "ucid": 104,
        "created": "2022-06-11T00:11:59.000Z",
        "elements": ["5d9fc8cfc0efae0017a3201a"],
        "name": "Props"
      }
    ],

    "elements": [
      {
        "id": "5d9fc8cfc0efae0017a32e31",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "",
        "isIdLock": false,
        "linkedElements": [], 
        "events": [],
        "name": "EXT"
      }, 
      {
        "id": "5d9fc8cfc0efae0017a32de8",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "",
        "isIdLock": false,
        "linkedElements": [], 
        "events": [],
        "name": "BEDFORD FALLS BRIDGE"
      }, 
      {
        "id": "5d9fc8d0c0efae0017a32e39",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "",
        "isIdLock": false,
        "linkedElements": [], 
        "events": [],
        "name": "NIGHT"
      }, 
      {
        "id": "5d9fc8cfc0efae0017a32d46",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [1,5],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "1",
        "isIdLock": true,
        "linkedElements": ["5d9fc8cfc0efae0017a3201a"], 
        "name": "GEORGE",
        "events": [
          {
            "id" : "5d3cb8c31044290017d1d6ea",
            "type" : "event",
            "name" : "travel",
            "date" : "2022-06-06T07:00:00.000Z"
          },
          {
            "id" : "5d3cb8c31044290017d1d6ea",
            "type" : "event",
            "name" : "rehearsal",
            "date" : "2022-06-07T07:00:00.000Z"
          }
        ]
      }, 
      {
        "id": "5d9fc8cfc0efae0017a3201a",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "",
        "isIdLock": false,
        "linkedElements": [], 
        "events": [],
        "name": "Zuzu's Petals"
      },
      {
        "id": "5d9fc8cfc0efae0017a32dfc",
        "created": "2022-06-11T00:11:59.000Z",
        "daysOff": [],
        "isDrop": true,
        "dropDayCount": 10,
        "isHold": false,
        "isDood": true,
        "elementId": "2",
        "isIdLock": false,
        "linkedElements": [], 
        "events": [],
        "name": "CLARENCE"
      }
    ],

    "stripboards": [
      {
        "id" : "5cff4bcb10c4330017ab6afd",
        "boards" : [
          {
            "id": "5cff4bcb10c4330017ab6e12",
            "name": "stripboard",
            "breakdownIds": ["5cfe7d2510c4330017ab5ed1"]
          }, 
          {
            "id": "5cff4bcb10c4330017ab6fab",
            "name": "boneyard",
            "breakdownIds": ["5cfe7d2510c4330017ab5ed5", "5cfe7d2510c4330017ab5ed3"]
          }
        ],
        "calendar" : "5d01230c987033001725c908",
        "name" : "Script Order"
      },
      {
        "id" : "5cff4bcb10c4330017ab6eea",
        "boards" : [
          {
            "id": "5cff4bcb10c4330017ab6da1",
            "name": "stripboard",
            "breakdownIds": ["5cfe7d2510c4330017ab5ed5", "5cfe7d2510c4330017ab5ed1", "5cfe7d2510c4330017ab5ed3"]
          }, 
          {
            "id": "5cff4bcb10c4330017ab6cab",
            "name": "boneyard",
            "breakdownIds": []
          }
        ],
        "calendar" : "5d01230c987033001725c908",
        "name" : "First Pass"
      }
    ]
  }
}

validator(obj)