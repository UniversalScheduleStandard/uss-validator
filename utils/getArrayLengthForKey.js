var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')
var isUssObjectKeyAnArray = require('./isUssObjectKeyAnArray')

/**
 * @module getArrayLengthForKey
 * @description Takes a uss object and a key string, and returns the array length of the object.key.
 * @param {Object} obj - The uss object.
 * @param {string} key - The key string.
 * @returns {number|null} The array length of the object.key, or null if the key is not found or not an array.
 */

module.exports = function(obj, key) {
  try {
    if(doesUssObjectHaveKey(obj, key) && isUssObjectKeyAnArray(obj, key)) {
      return obj.universalScheduleStandard[key].length
    }
    return null
  } catch(e){
    console.error(e)
  }
}