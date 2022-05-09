var Ajv = require("ajv")
var ussFullSchema = require('./schemas/ussFullSchema')

/* 
UNIVERSAL SCHEDULE STANDARD VALIDATOR
Takes a USS object, checks whether it's valid JSON, then validates against a ussFullSchema.
Returns an object with isValid boolean, an info object and an array of errors, if any.
This is written in ECMA Script 5 to ensure wide compatibility
*/

// PRIMARY FUNCTION
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
      name: null,
      source: null,
      ussVersion: null,
    },
    errors: [],
    warnings: []
  }
  try {
    if(_isJson(obj)) {
      // build ajv validator
      var ajv = new Ajv()
      var validateUSS = ajv.compile(ussFullSchema)

      // create an object from the JSON
      var objParsed = JSON.parse(JSON.stringify(obj))

      // check validation, collect any errors
      response.isValid = validateUSS(objParsed)
      response.errors = validateUSS.errors

      // update info object
      response.info.breakdowns = _getArrayLengthForKey(objParsed, 'breakdowns')
      response.info.categories = _getArrayLengthForKey(objParsed, 'categories')
      response.info.elements = _getArrayLengthForKey(objParsed, 'elements')
      response.info.stripboards = _getArrayLengthForKey(objParsed, 'stripboards')
      response.info.calendars = _getArrayLengthForKey(objParsed, 'calendars')
      response.info.isSchedule = _isObjectASchedule(objParsed)
      response.info.name = _getValueForKey(objParsed, 'name')
      response.info.source = _getValueForKey(objParsed, 'source')
      response.info.ussVersion = _getValueForKey(objParsed, 'version')

      // check parity between object id arrays
      response.warnings = _breakdownElementIdsInElements(objParsed, response.warnings)
      response.warnings = _categoryElementIdsInElements(objParsed, response.warnings)
      response.warnings = _elementsBelongToCategories(objParsed, response.warnings)
      response.warnings = _linkedElementsInElements(objParsed, response.warnings)
      response.warnings = _boardsBreakdownIdsEqualsBreakdowns(objParsed, response.warnings)
      response.warnings = _boardsBreakdownIdsExistsInBreakdowns(objParsed, response.warnings)
      response.warnings = _stripboardsHaveCalendar(objParsed, response.warnings)
      response.warnings = _calendarsHaveStart(objParsed, response.warnings)

    } else { // obj is not JSON
      response.isValid = false
      response.errors.push(isNotJsonError)
    }
  } catch(e) {
    response.isValid = false
    response.errors.push(_createGeneralErrorReponse(e))
  } finally {
    // return response object
    console.log('response',response)
    return response
  }
}

// PARITY CHECKS

// are breakdown.elements ids all in the elments array?
function _breakdownElementIdsInElements(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var b=0;b<obj.universalScheduleStandard.breakdowns.length;b++) {
      var breakdown = obj.universalScheduleStandard.breakdowns[b]
      if(breakdown.elements.length>0) {
        var badItems = _compareArrayIds(breakdown.elements, elementIds)
        if(badItems && badItems.length) {
          hasParity = false
          location.concat(badItems)
        }
      } 
    }
    if(hasParity) {
      return warnings
    } else {
      warnings.push(_breakdownElementIdsInElementsWarning(location))
      return warnings
    }
  } catch(e){
    console.error(e)
  }
}

// are category.elements ids all in the elments array?
function _categoryElementIdsInElements(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var c=0;c<obj.universalScheduleStandard.categories.length;c++) {
      var category = obj.universalScheduleStandard.categories[c]
      if(category.elements.length>0) {
        var badItems = _compareArrayIds(category.elements, elementIds)
        if(badItems && badItems.length) {
          hasParity = false
          location.concat(badItems)
        }
      }      
    }
    if(hasParity) {
      return warnings
    } else {  
      warnings.push(_categoryElementIdsInElementsWarning(location))
      return warnings
    }
  } catch(e){
    console.error(e)
  }
}

// are there any elements that don't belong to a category?
function _elementsBelongToCategories(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var categories = obj.universalScheduleStandard.categories
    for(var e=0;e<obj.universalScheduleStandard.elements.length;e++) {
      var element = obj.universalScheduleStandard.elements[e]
      for(var c=0;c<categories.length;c++) {
        if(!categories[c].elements.includes(element.id)) {
          hasParity = false
          location.push(element.id)
        }
      } 
    }
    if(!hasParity) warnings.push(_elementsBelongToCategoriesWarning(location))
    return warnings
  } catch(e){
    console.error(e)
  }
}

// do all elements.linkedElements exist in elements?
function _linkedElementsInElements(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var e=0;e<obj.universalScheduleStandard.elements.length;e++) {
      var element = obj.universalScheduleStandard.elements[e]
      for(var c=0;c<element.linkedElements.length;c++) {
        if(!elementIds.includes(element.linkedElements[c])) {
          hasParity = false
          location.push(element.linkedElements[c])
        }
      }
    }
    if(!hasParity) warnings.push(_linkedElementsInElementsWarning(location))
    return warnings
  } catch(e){
    console.error(e)
  }
}

// do all stripboard.boards.breakdownIds equal the number of breakdowns?
function _boardsBreakdownIdsEqualsBreakdowns(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      var breakdownCount = 0
      stripboard.boards.forEach(function(board) {
        breakdownCount = breakdownCount + board.breakdownIds.length
      })
      if(obj.universalScheduleStandard.breakdowns.length!==breakdownCount) {
        hasParity = false
        location.push(stripboard.id)
      }
    }
    if(!hasParity) warnings.push(_boardsBreakdownIdsEqualsBreakdownsWarning(location))
    return warnings
  } catch(e){
    console.error(e)
  }
}

// do all stripboards.boards.breakdownIds exist in breakdowns array?
function _boardsBreakdownIdsExistsInBreakdowns(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      stripboard.boards.forEach(function(board) {
        for(var b=0;b<obj.universalScheduleStandard.breakdowns.length;b++) {
          if(!board.breakdownIds.includes(obj.universalScheduleStandard.breakdowns[b])) {
            hasParity = false
            location.push(stripboard.id)
          }
        }
      })
    }
    if(!hasParity) warnings.push(_boardsBreakdownIdsExistsInBreakdownsWarning(location))
    return warnings
  } catch(e){
    console.error(e)
  }
}

// do all stripboards have a calendar id?
function _stripboardsHaveCalendar(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      if(typeof stripboard.calendar !== 'string' && stripboard.calendar.length<1) {
        hasParity = false
        location.push(stripboard.id)
      }
    }
    if(!hasParity) warnings.push(_stripboardsHaveCalendarWarning(location)) 
    return warnings
  } catch(e){
    console.error(e)
  }
}

// do all calendars have a start date event?
function _calendarsHaveStart(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var c=0;c<obj.universalScheduleStandard.calendars.length;c++) {
      var calendar = obj.universalScheduleStandard.calendars[c]
      var idInArray = false
      for(var e=0;e<calendar.events.length;e++) {
        if(calendar.events[e].type==='start') {
          idInArray = true
          break
        }
        if(idInArray===false) {
          hasParity = false
          location.push(calendar.id)
        }
      }
    }
    if(!hasParity) warnings.push(_calendarsHaveStartWarning(location))
    return warnings
  } catch(e){
    console.error(e)
  }
}

// HELPER FUNCTIONS

// is everthing in arr1 in arr2, return array of items that aren't in arr2
function _compareArrayIds(arr1, arr2) {
  try {
    if(_isArray(arr1) && _isArray(arr2)) {
      var response = []
      for(var a=0;a<arr1.length;a++) {
        if(!arr2.includes(arr1[a])) {
          response.push(arr1[a])
        }
      }
      return response
    }
    return null
  } catch(e){
    console.error(e)
  }
}

function _getValueForKey(obj, key) {
  try {
    if(_doesUssObjectHaveKey(obj, key)) {
      return obj.universalScheduleStandard[key]
    }
    return null
  } catch(e){
    console.error(e)
  }
}

function _getArrayLengthForKey(obj, key) {
  try {
    if(_doesUssObjectHaveKey(obj, key) && _isUssObjectKeyAnArray(obj, key)) {
      return obj.universalScheduleStandard[key].length
    }
    return null
  } catch(e){
    console.error(e)
  }
}

function _doesUssObjectHaveKey(obj, key) {
  try {
    if(typeof obj==='object') {
      var objKeys = Object.keys(obj)
      if(objKeys && objKeys.length && objKeys.includes('universalScheduleStandard')) {
        var ussKeys = Object.keys(obj.universalScheduleStandard)
        if(ussKeys && ussKeys.length && ussKeys.includes(key)) {
          return true
        }
      }
    }
    return false
  } catch(e) {
    console.error(e)
  }
}

function _isUssObjectKeyAnArray(obj, key) {
  try {
    return _isArray(obj.universalScheduleStandard[key])
  } catch(e) {
    console.error(e)
  }
}

function _isArray(arr) {
  return Array.isArray(arr)
}

function _isObjectASchedule(obj) {
  try {
    return _doesUssObjectHaveKey(obj, 'stripboards') && _isUssObjectKeyAnArray(obj, 'stripboards') && _getArrayLengthForKey(obj, 'stripboards') > 0 &&
           _doesUssObjectHaveKey(obj, 'calendars') && _isUssObjectKeyAnArray(obj, 'calendars') && _getArrayLengthForKey(obj, 'calendars') > 0
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
  return { 
    instancePath: 'error',
    ussFullSchemaPath: 'error',
    keyword: 'error',
    params: { error: 'USS Validator Error' },
    message: e && e.message ? e.message : 'There was an unknown error in the USS Validator'
  }
}

var isNotJsonError = { 
  instancePath: '/universalScheduleStandard',
  ussFullSchemaPath: '#/properties/universalScheduleStandard',
  keyword: 'type',
  params: { type: 'JSON' },
  message: 'must be a valid JSON object' 
}

function _breakdownElementIdsInElementsWarning(location) {
  return {
    title: 'Breakdown Elements', 
    location: location,
    message: 'There are element IDs in at least one breakdown object that don\'t exist in the elements array'
  }
}

function _categoryElementIdsInElementsWarning(location) {
  return {
    title: 'Category Elements',  
    location: location,
    message: 'There are element IDs in at least one category object that don\'t exist in the elements array'
  }
}

function _elementsBelongToCategoriesWarning(location) {
  return {
    title: 'Elements not in Category', 
    location: location,
    message: 'There is at least one element that does not belong to a category'
  }
}

function _linkedElementsInElementsWarning(location) {
  return {
    title: 'Linked Elements not in Elements', 
    location: location,
    message: 'There is at least one linked element that does not appear in the elements array'
  }
}

function _boardsBreakdownIdsEqualsBreakdownsWarning(location) {
  return {
    title: 'Boards does not equal Breakdowns', 
    location: location,
    message: 'The number of breakdownIds in the boards does not equal the number of objects in the breakdowns array'
  }
}

function _boardsBreakdownIdsExistsInBreakdownsWarning(location) {
  return {
    title: 'Boards breakdownIds not in Breakdowns', 
    location: location,
    message: 'There are breakdownIds in the boards that are not in the breakdowns array'
  }
}

function _stripboardsHaveCalendarWarning(location) {
  return {
    title: 'Stripboard missing Calendar', 
    location: location,
    message: 'There is a stripboard that is missing its calendarId'
  }
}

function _calendarsHaveStartWarning(location) {
  return {
    title: 'Calendar missing start date', 
    location: location,
    message: 'There is a calendar that is missing a start date event'
  }
}





var obj = {
  "universalScheduleStandard": {
    "id": "2022-06-11T00:12:02.000Z",
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
        "elements": ["foo"],
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
    ]
  }
}


validator(obj)