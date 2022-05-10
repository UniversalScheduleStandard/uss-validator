var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')
var isUssObjectKeyAnArray = require('./isUssObjectKeyAnArray')

// getArrayLengthForKey
// take uss object and key string, return the array length of the object.key

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