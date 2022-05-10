
// isObject
// takes an object and returns true if it is an object

module.exports = function(obj) {
  return typeof obj === "object" && obj !== null
}