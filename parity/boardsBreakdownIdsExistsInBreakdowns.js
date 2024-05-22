var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all stripboards.boards.breakdownIds exist in the breakdowns array.
 *
 * @param {Object} obj - The input object containing universalScheduleStandard and breakdowns.
 * @param {Array} warnings - The array to store warning messages.
 * @returns {Array} - The updated warnings array.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var breakdownIds = obj.universalScheduleStandard.breakdowns.map(function(e){return e.id})
    for(var s=0;s<obj.universalScheduleStandard.stripboards.length;s++) {
      var stripboard = obj.universalScheduleStandard.stripboards[s]
      stripboard.boards.forEach(function(board) {
        if(board.breakdownIds.length>0) {
          var failed = false
          if(Array.isArray(board.breakdownIds[0])) {
            board.breakdownIds.forEach(function(dayArray) {
              for(var b=0;b<dayArray.length;b++) {
                if(!breakdownIds.includes(dayArray[b])) {
                  failed = true
                  continue
                }
              } 
            })
          } else {
            for(var b=0;b<board.breakdownIds.length;b++) {
              if(!breakdownIds.includes(board.breakdownIds[b])) {
                failed = true
                continue
              }
            } 
          }
          if(failed) {
            hasParity = false
            location.push(board.id)
          }
        }
      })
    }
    if(!hasParity) warnings.push(warning.boardsBreakdownIdsExistsInBreakdowns(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}
