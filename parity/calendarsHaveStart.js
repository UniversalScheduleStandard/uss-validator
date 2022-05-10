var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

// calendarsHaveStart
// do all calendars have a start date event?

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
