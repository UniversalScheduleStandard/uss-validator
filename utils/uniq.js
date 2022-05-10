
// uniq
// takes an array and returns array of only the unique values of that array

module.exports = function(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  })
}