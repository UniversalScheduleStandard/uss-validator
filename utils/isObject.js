
/**
 * Checks if the given value is an object.
 *
 * @param {any} obj - The value to be checked.
 * @returns {boolean} - Returns true if the value is an object, otherwise false.
 */

module.exports = function(obj) {
  return typeof obj === "object" && obj !== null
}