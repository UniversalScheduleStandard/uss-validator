var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

// stripboardsHaveCalendar
// do all stripboards have a calendar id?

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