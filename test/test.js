var validator = require('../index')
const fs = require('fs')
let jsonData = JSON.parse(fs.readFileSync('./test/small_sample_schedule.uss', 'utf-8'))

var response = validator(jsonData)
console.log(response)