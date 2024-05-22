var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all stripboards have a calendar id.
 * @module stripboardsHaveCalendar
 * @param {Object} obj - The object containing the stripboards.
 * @param {Array} warnings - The array to store any warnings.
 * @returns {Array} - The array of warnings.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      if(typeof stripboard.calendar !== 'string' && stripboard.calendar.length<1) {
        hasParity = false
        location.push(stripboard.id)
      }
    }
    if(!hasParity) warnings.push(warning.stripboardsHaveCalendar(uniq(location))) 
    return warnings
  } catch(e){
    console.error(e)
  }
}