var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')

// getValueForKey
// takes a uss object, if that object has key string, return that key value

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