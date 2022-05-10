var isObject = require('./isObject')

// isJson
// takes an object or string and returns true if it is a JSON object
module.exports = function(item) {
  if(item!==undefined && item!==null) {
    var jsonString = typeof item !== 'string' ? JSON.stringify(item) : item
    try {
      var jsonParsed = JSON.parse(jsonString)
    } catch(e) {
      return false
    }
    return isObject(jsonParsed)
  }
  return false  
}