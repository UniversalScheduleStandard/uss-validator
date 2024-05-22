var isArray = require('./isArray')

/**
 * Checks if the value of a given key in a uss object is an array.
 *
 * @param {Object} obj - The uss object.
 * @param {string} key - The key string to check.
 * @returns {boolean} - Returns true if the value of the object.key is an array, otherwise false.
 */

module.exports = function(obj, key) {
  try {
    return isArray(obj.universalScheduleStandard[key])
  } catch(e) {
    console.error(e)
  }
}