
/**
 * Takes an array and returns an array of only the unique values of that array.
 *
 * @param {Array} arr - The input array.
 * @returns {Array} - An array containing only the unique values of the input array.
 */

module.exports = function(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  })
}