var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all calendars have a start date event.
 * @module calendarsHaveStart
 * @param {Object} obj - The object containing the calendars.
 * @param {Array} warnings - The array to store the warning messages.
 * @returns {Array} - The updated array of warning messages.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var c=0;c<obj.universalScheduleStandard.calendars.length;c++) {
      var calendar = obj.universalScheduleStandard.calendars[c]
      var idInArray = false
      for(var e=0;e<calendar.events.length;e++) {
        if(calendar.events[e].type==='start') {
          idInArray = true
          break
        }
        if(idInArray===false) {
          hasParity = false
          location.push(calendar.id)
        }
      }
    }
    if(!hasParity) warnings.push(warning.calendarsHaveStart(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}
