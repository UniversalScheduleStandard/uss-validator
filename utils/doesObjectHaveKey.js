var isObject = require('./isObject')

/**
 * Checks if an object has a specific key.
 *
 * @param {Object} obj - The object to check.
 * @param {string} key - The key to check for.
 * @returns {boolean} - Returns true if the object has the specified key, otherwise false.
 */

module.exports = function(obj, key) {
  if(isObject(obj)) {
    var objKeys = Object.keys(obj)
    if(objKeys && objKeys.length && objKeys.includes(key)) {
      return true
    }
  }
  return false
}