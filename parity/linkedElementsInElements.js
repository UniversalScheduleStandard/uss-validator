var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

/**
 * Checks if all elements.linkedElements exist in elements.
 * @module linkedElementsInElements
 * @param {Object} obj - The object containing the elements and linkedElements.
 * @param {Array} warnings - The array to store any warnings.
 * @returns {Array} - The updated warnings array.
 */

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var e=0;e<obj.universalScheduleStandard.elements.length;e++) {
      var element = obj.universalScheduleStandard.elements[e]
      for(var c=0;c<element.linkedElements.length;c++) {
        if(!elementIds.includes(element.linkedElements[c])) {
          hasParity = false
          location.push(element.linkedElements[c])
        }
      }
    }
    if(!hasParity) warnings.push(warning.linkedElementsInElements(uniq(location)))
    return warnings
  } catch(e){
    console.error(e)
  }
}