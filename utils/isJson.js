var isObject = require('./isObject')

// isJson
// takes an object or string and returns based on the return type - boolean, string or object
module.exports = function(item, returnType) {
  if(item!==undefined && item!==null) {
    try {
      var jsonString = item
      if(typeof jsonString !== 'string') {
        jsonString = JSON.stringify(item)
      }
      var jsonObject = JSON.parse(jsonString)
    } catch(e) {
      if(returnType==='boolean') {
        return false
      }
      return null      
    }
    switch(returnType) {
      case 'string': return jsonString
      case 'object': return jsonObject
      default: return isObject(jsonObject) // boolean
    }
  }
  return false  
}