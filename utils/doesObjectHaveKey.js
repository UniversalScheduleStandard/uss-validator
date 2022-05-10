var isObject = require('./isObject')

// doesObjectHaveKey
// takes object and string and returns true if object.string exists

module.exports = function(obj, key) {
  if(isObject(obj)) {
    var objKeys = Object.keys(obj)
    if(objKeys && objKeys.length && objKeys.includes(key)) {
      return true
    }
  }
  return false
}