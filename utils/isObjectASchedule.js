var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')
var isUssObjectKeyAnArray = require('./isUssObjectKeyAnArray')
var getArrayLengthForKey = require('./getArrayLengthForKey')

/**
 * Checks if the given object is a valid schedule.
 *
 * @param {Object} obj - The uss object to be checked.
 * @returns {boolean} - Returns true if the object has stripboards and calendars, false otherwise.
 */

module.exports = function(obj) {
  try {
    return doesUssObjectHaveKey(obj, 'stripboards') && isUssObjectKeyAnArray(obj, 'stripboards') && getArrayLengthForKey(obj, 'stripboards') > 0 &&
           doesUssObjectHaveKey(obj, 'calendars') && isUssObjectKeyAnArray(obj, 'calendars') && getArrayLengthForKey(obj, 'calendars') > 0
  } catch(e) {
    console.error(e)
  }
}