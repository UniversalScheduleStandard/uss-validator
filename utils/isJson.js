var isObject = require('./isObject')

/**
 * Checks if the given item is a valid JSON string or object.
 * @param {string|object} item - The item to be checked.
 * @param {string} returnType - The desired return type. Can be 'boolean', 'string', or 'object'.
 * @returns {boolean|string|object|null} - The result based on the return type. Returns false if the item is not a valid JSON string or object.
 */

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