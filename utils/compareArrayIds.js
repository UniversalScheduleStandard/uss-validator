var isArray = require('./isArray')

/**
 * Compare the elements of two arrays and return an array of items that are not present in the second array.
 *
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {Array|null} - An array of items that are in `arr1` but not in `arr2`, or `null` if either `arr1` or `arr2` is not an array.
 */

module.exports = function(arr1, arr2) {
  try {
    if(isArray(arr1) && isArray(arr2)) {
      var response = []
      for(var a=0;a<arr1.length;a++) {
        if(!arr2.includes(arr1[a])) {
          response.push(arr1[a])
        }
      }
      return response
    }
    return null
  } catch(e){
    console.error(e)
  }
}