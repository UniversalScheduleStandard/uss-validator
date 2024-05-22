var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all stripboard.boards.breakdownIds equal the number of breakdowns.
 *
 * @param {Object} obj - The object containing the stripboards and breakdowns.
 * @param {Array} warnings - The array to store any warnings.
 * @returns {Array} - The updated warnings array.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      var breakdownCount = 0
      stripboard.boards.forEach(function(board) {
        if(board.breakdownIds.length>0) {
          if(Array.isArray(board.breakdownIds[0])) {
            board.breakdownIds.forEach(function(dayArray) {
              breakdownCount += dayArray.length
            })
          } else {
            breakdownCount += board.breakdownIds.length
          }
        }
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