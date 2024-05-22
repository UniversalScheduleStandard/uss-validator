var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')

/**
 * getValueForKey
 * Takes a uss object and a key string, and returns the value associated with that key if it exists in the object.
 *
 * @param {Object} obj - The uss object to search for the key in.
 * @param {string} key - The key to search for in the uss object.
 * @returns {*} - The value associated with the key if it exists, otherwise null.
 */

module.exports = function(obj, key) {
  try {
    if(doesUssObjectHaveKey(obj, key)) {
      return obj.universalScheduleStandard[key]
    }
    return null
  } catch(e){
    console.error(e)
  }
}