var doesObjectHaveKey = require('./doesObjectHaveKey')
var isArray = require('./isArray')

/**
 * Takes an object and returns a USS Validator error object.
 *
 * @typedef {Object} ErrorObject
 * @property {string} title - The title of the error.
 * @property {Array} location - The location of the error.
 * @property {string} message - The error message.
 * 
 * @param {ErrorObject} obj - The object containing the error properties.
 * @returns {Object} - The error object with the specified properties.
 */
function createError(obj) {
  try {
    var title = 'Unknown Error'
    var location = []
    var message = 'There was an unknown error in the USS Validator'
    if(doesObjectHaveKey(obj,'title')) title = obj.title || 'Unknown Error'
    if(doesObjectHaveKey(obj,'location')) location = obj.location || []
    if(doesObjectHaveKey(obj,'message')) message = obj.message || 'There was an unknown error in the USS Validator'
    return {
      title: title,  
      location: location,
      message: message
    }
  } catch(e) {
    console.error(e)
  } 
}

/**
 * Parses an array of Ajv errors and returns an array of error objects.
 * 
 * @param {Array} arr - The array of Ajv errors to be parsed.
 * @returns {Array} - An array of error objects.
 */
function parseAjvErrors(arr) {
  try {
    if(arr===null) return []
    if(isArray(arr)) {
      var errorArr = []
      for(var e=0;e<arr.length;e++) {
        errorArr.push(createError({
          title: 'Schema Error', 
          location: [arr[e].schemaPath], 
          message: `There is a \'${arr[e].keyword}\' error in the schema: ${arr[e].message}`
        }))
      }
      return errorArr
    }
    return [createError({message: 'USS Validator error: Ajv threw an error that wasn\'t an array'})]
  } catch(e) {
    console.error(e)
  }
}

module.exports = { createError, parseAjvErrors }
