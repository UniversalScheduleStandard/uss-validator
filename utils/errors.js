var doesObjectHaveKey = require('./doesObjectHaveKey')

module.exports = {
  // createError
  // takes an object and returns a USS Validator error object
  createError: function(obj) {
    try {
      var title = 'Unknown Error'
      var location = []
      var message = 'There was an unknown error in the USS Validator'
      if(doesObjectHaveKey(obj,'title')) title = obj.title || 'Unknown Error'
      if(doesObjectHaveKey(obj,'location')) location = obj.location || []
      if(doesObjectHaveKey(obj,'message')) message = obj.message || 'There was an unknown error in the USS Validator'
      return {
        title: title,  
        location: location,
        message: message
      }
    } catch(e) {
      console.error(e)
    } 
  },

  // parseAjvErrors
  // takes an arr of Ajv error objects and returns USS Validator error objects
  parseAjvErrors: function(arr) {
    try {
      if(arr===null) return []
      if(_isArray(arr)) {
        var errorArr = []
        for(var e=0;e<arr.length;e++) {
          errorArr.push(createError({
            title: 'Schema Error', 
            location: [arr[e].schemaPath], 
            message: `There is a \'${arr[e].keyword}\' error in the schema: ${arr[e].message}`
          }))
        }
        return errorArr
      }
      return [createError({message: 'USS Validator error: Ajv threw an error that wasn\'t an array'})]
    } catch(e) {
      console.error(e)
    }
  }
}
