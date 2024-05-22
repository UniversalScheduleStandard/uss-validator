var doesObjectHaveKey = require('./doesObjectHaveKey')

/**
 * Checks if an object contains a specific key within the 'universalScheduleStandard' property.
 *
 * @param {Object} obj - The object to check.
 * @param {string} key - The key to search for within the 'universalScheduleStandard' property.
 * @returns {boolean} - Returns true if the object contains the specified key, otherwise false.
 */

module.exports = function(obj, key) {
  try {
    if(doesObjectHaveKey(obj, 'universalScheduleStandard') && doesObjectHaveKey(obj.universalScheduleStandard, key)) {
      return true
    }
    return false
  } catch(e) {
    console.error(e)
  }
}