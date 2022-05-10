var doesObjectHaveKey = require('./doesObjectHaveKey')

// doesUssObjectHaveKey
// takes an object and a string and returns true if the object contains obj.universalScheduleStandard.string

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