var compareArrayIds = require('../utils/compareArrayIds')
var warning = require('../utils/warnings')
var uniq = require('../utils/uniq')

// categoryElementIdsInElements
// are category.elements ids all in the elments array?

module.exports = function(obj, warnings) {
  try {
    var location = []
    var hasParity = true
    var elementIds = obj.universalScheduleStandard.elements.map(function(e){return e.id})
    for(var c=0;c<obj.universalScheduleStandard.categories.length;c++) {
      var category = obj.universalScheduleStandard.categories[c]
      if(category.elements.length>0) {
        var badItems = compareArrayIds(category.elements, elementIds)
        if(badItems && badItems.length) {
          hasParity = false
          location = location.concat(badItems)
        }
      }      
    }
    if(hasParity) {
      return warnings
    } else {  
      warnings.push(warning.categoryElementIdsInElements(uniq(location)))
      return warnings
    }
  } catch(e){
    console.error(e)
  }
}
