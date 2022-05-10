var doesUssObjectHaveKey = require('./doesUssObjectHaveKey')
var isUssObjectKeyAnArray = require('./isUssObjectKeyAnArray')
var getArrayLengthForKey = require('./getArrayLengthForKey')

// isObjectASchedule
// takes uss object and returns true if it has stripboards and calendars

module.exports = function(obj) {
  try {
    return doesUssObjectHaveKey(obj, 'stripboards') && isUssObjectKeyAnArray(obj, 'stripboards') && getArrayLengthForKey(obj, 'stripboards') > 0 &&
           doesUssObjectHaveKey(obj, 'calendars') && isUssObjectKeyAnArray(obj, 'calendars') && getArrayLengthForKey(obj, 'calendars') > 0
  } catch(e) {
    console.error(e)
  }
}