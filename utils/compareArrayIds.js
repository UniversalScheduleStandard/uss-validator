var isArray = require('./isArray')

// compareArrayIds
// is everthing in arr1 in arr2, return array of items that aren't in arr2

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