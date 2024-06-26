var Ajv = require("ajv")

/**
 * UNIVERSAL SCHEDULE STANDARD VALIDATOR
 * Takes an object or string, checks whether it's valid JSON, then validates against the USS schema.
 * Returns an object with isValid boolean, an info object and arrays of errors and warnings, if any.
 * This is written in ECMA Script 5 to ensure wide compatibility
 *
 * @param {Object|string} item - The object or string to be validated against the USS schema.
 * @returns {Object} - An object containing the validation result, info object, and arrays of errors and warnings.
 */

var schema_v100 = require('./schemas/schema_v1.0.0')
var error = require('./utils/errors')
var getArrayLengthForKey = require('./utils/getArrayLengthForKey')
var getValueForKey = require('./utils/getValueForKey')
var isJson = require('./utils/isJson')
var isObjectASchedule = require('./utils/isObjectASchedule')
var breakdownElementIdsInElements = require('./parity/breakdownElementIdsInElements')
var elementsHaveCategory = require('./parity/elementsHaveCategory')
var linkedElementsInElements = require('./parity/linkedElementsInElements')
var boardsBreakdownIdsEqualsBreakdowns = require('./parity/boardsBreakdownIdsEqualsBreakdowns')
var boardsBreakdownIdsExistsInBreakdowns = require('./parity/boardsBreakdownIdsExistsInBreakdowns')
var stripboardsHaveCalendar = require('./parity/stripboardsHaveCalendar')
var calendarsHaveStart = require('./parity/calendarsHaveStart')

// PRIMARY FUNCTION
module.exports = function(item) {
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
    if(isJson(item)) {
      // create an object from the JSON
      var objParsed = isJson(item, 'object')

      // build ajv validator
      var ajv = new Ajv()

      // determine which schema to use
      var validateUSS
      switch(objParsed?.universalScheduleStandard?.ussVersion) {
        case '1.0.0':
          validateUSS = ajv.compile(schema_v100)
          break
        default:
          break
      }
      if(!validateUSS) {
        response.isValid = false
        response.errors.push(error.createError({title: 'Schema Error', message: 'The file\'s USS version is not supported by this validator'}))
      }

      // if the object was successfully parsed
      if(objParsed!==null) {
        // check validation, collect any errors
        response.isValid = validateUSS(objParsed)
        response.errors = error.parseAjvErrors(validateUSS.errors) 

        if(response.errors.length===0) { // if there are no schema errors
          // update info object
          response.info.breakdowns = getArrayLengthForKey(objParsed, 'breakdowns')
          response.info.categories = getArrayLengthForKey(objParsed, 'categories')
          response.info.elements = getArrayLengthForKey(objParsed, 'elements')
          response.info.stripboards = getArrayLengthForKey(objParsed, 'stripboards')
          response.info.calendars = getArrayLengthForKey(objParsed, 'calendars')
          response.info.isSchedule = isObjectASchedule(objParsed)
          response.info.name = getValueForKey(objParsed, 'name')
          response.info.source = getValueForKey(objParsed, 'source')
          response.info.ussVersion = getValueForKey(objParsed, 'ussVersion')

          // check parity between object id arrays
          response.warnings = breakdownElementIdsInElements(objParsed, response.warnings)
          response.warnings = elementsHaveCategory(objParsed, response.warnings)
          response.warnings = linkedElementsInElements(objParsed, response.warnings)
          response.warnings = boardsBreakdownIdsEqualsBreakdowns(objParsed, response.warnings)
          response.warnings = boardsBreakdownIdsExistsInBreakdowns(objParsed, response.warnings)
          response.warnings = stripboardsHaveCalendar(objParsed, response.warnings)
          response.warnings = calendarsHaveStart(objParsed, response.warnings)
        }
      } else { // the item couldn't be converted into a JSON object
        response.isValid = false
        response.errors.push(error.createError({title: 'JSON Error', message: 'This data cannot be converted into a JSON object'}))
      }

    } else { // obj is not valid JSON
      response.isValid = false
      response.errors.push(error.createError({title: 'JSON Error', message: 'This is not a valid JSON object'}))
    }
  } catch(e) { // catch all other errors
    response.isValid = false
    response.errors.push(error.createError({message: e.message || 'There was an unknown error in the USS Validator'}))
  } finally {
    // return response object
    return response
  }
}
