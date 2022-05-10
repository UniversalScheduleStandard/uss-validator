var isArray = require('./isArray')

// isUssObjectKeyAnArray
// takes a uss object and key string, returns true if the object.key is an array
module.exports = function(obj, key) {
  try {
    return isArray(obj.universalScheduleStandard[key])
  } catch(e) {
    console.error(e)
  }
}