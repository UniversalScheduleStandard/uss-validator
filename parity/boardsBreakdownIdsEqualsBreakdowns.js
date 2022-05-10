var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

// boardsBreakdownIdsEqualsBreakdowns
// do all stripboard.boards.breakdownIds equal the number of breakdowns?

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      var breakdownCount = 0
      stripboard.boards.forEach(function(board) {
        breakdownCount = breakdownCount + board.breakdownIds.length
      })
      if(obj.universalScheduleStandard.breakdowns.length!==breakdownCount) {
        hasParity = false
        location.push(stripboard.id)
      }
    }
    if(!hasParity) warnings.push(warning.boardsBreakdownIdsEqualsBreakdowns(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}