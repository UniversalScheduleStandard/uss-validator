var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all elements have a category ID that matches a category object.
 * @param {Object} obj - The object containing the elements and categories.
 * @param {Array} warnings - The array to store any warnings.
 * @returns {Array} - The updated array of warnings.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    for(var c=0;c<obj.universalScheduleStandard.elements.length;c++) {
      var element = obj.universalScheduleStandard.elements[c]
      var category = obj.universalScheduleStandard.categories.find(function(category){ return element.category===category.id})
      if(!category) {
        hasParity = false
        location.push(element.id)
      }
    }
    if(!hasParity) warnings.push(warning.elementsHaveCategory(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}
