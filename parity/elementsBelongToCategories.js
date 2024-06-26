var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if there are any elements that don't belong to a category.
 * @param {Object} obj - The object containing the universal schedule standard.
 * @param {Array} warnings - The array to store warning messages.
 * @returns {Array} - The updated array of warning messages.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var categories = obj.universalScheduleStandard.categories
    for(var e=0;e<obj.universalScheduleStandard.elements.length;e++) {
      var element = obj.universalScheduleStandard.elements[e]
      var isInArray = false
      for(var c=0;c<categories.length;c++) {
        if(categories[c].elements.includes(element.id)) {
          isInArray = true
          continue
        }
      } 
      if(!isInArray) {
        hasParity = false
        location.push(element.id)
      }
    }
    if(!hasParity) warnings.push(warning.elementsBelongToCategories(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}