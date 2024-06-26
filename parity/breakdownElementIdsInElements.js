var compareArrayIds = require('../utils/compareArrayIds')
var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if the breakdown.elements ids are all present in the elements array.
 * @param {Object} obj - The object containing the universal schedule standard.
 * @param {Array} warnings - The array to store any warnings.
 * @returns {Array} - The updated warnings array.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var b=0;b<obj.universalScheduleStandard.breakdowns.length;b++) {
      var breakdown = obj.universalScheduleStandard.breakdowns[b]
      if(breakdown.elements.length>0) {
        var badItems = compareArrayIds(breakdown.elements, elementIds)
        if(badItems && badItems.length) {
          hasParity = false
          location = location.concat(badItems)
        }
      } 
    }
    if(hasParity) {
      return warnings
    } else {
      warnings.push(warning.breakdownElementIdsInElements(uniq(location)))
      return warnings
    }
  } catch(e){
    console.error(e)
  }
}
