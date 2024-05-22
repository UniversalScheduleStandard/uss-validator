var fs = require('fs')
var validator = require('../index')
var doesObjectHaveKey = require('../utils/doesObjectHaveKey')
var isArray = require('../utils/isArray')
var isObject = require('../utils/isObject')

var jsonData = JSON.parse(fs.readFileSync('./small_sample_schedule.uss', 'utf-8'))

var res = validator(jsonData)

test(isObject(res),'the response is an object')
test(doesObjectHaveKey(res, 'isValid'),'the object has key \'isValid\'')
test(doesObjectHaveKey(res, 'info'),'the object has key \'info\'')
test(doesObjectHaveKey(res.info, 'breakdowns'),'the info object has key \'breakdowns\'')
test(Number.isInteger(res.info.breakdowns) || res.info.breakdowns===null,'the info.breakdowns value is an integer or null')
test(doesObjectHaveKey(res.info, 'categories'),'the info object has key \'categories\'')
test(Number.isInteger(res.info.categories) || res.info.categories===null,'the info.categories value is an integer or null')
test(doesObjectHaveKey(res.info, 'elements'),'the info object has key \'elements\'')
test(Number.isInteger(res.info.elements) || res.info.elements===null,'the info.elements value is an integer or null')
test(doesObjectHaveKey(res.info, 'stripboards'),'the info object has key \'stripboards\'')
test(Number.isInteger(res.info.stripboards) || res.info.stripboards===null,'the info.stripboards value is an integer or null')
test(doesObjectHaveKey(res.info, 'calendars'),'the info object has key \'calendars\'')
test(Number.isInteger(res.info.calendars) || res.info.calendars===null,'the info.calendars value is an integer or null')
test(doesObjectHaveKey(res.info, 'isSchedule'),'the info object has key \'isSchedule\'')
test(res.info.isSchedule===true||res.info.isSchedule===false,'the info.isSchedule value is a boolean')
test(doesObjectHaveKey(res.info, 'name'),'the info object has key \'name\'')
test(typeof res.info.name==='string' || res.info.name===null,'the info.name value is a string or null')
test(doesObjectHaveKey(res.info, 'source'),'the info object has key \'source\'')
test(typeof res.info.source==='string' || res.info.source===null,'the info.source value is a string or null')
test(doesObjectHaveKey(res.info, 'ussVersion'),'the info object has key \'ussVersion\'')
test(typeof res.info.ussVersion==='string' || res.info.ussVersion===null,'the info.ussVersion value is a string or null')
test(doesObjectHaveKey(res, 'errors'),'the object has key \'errors\'')
test(isArray(res.errors),'the errors value is an array')
test(doesObjectHaveKey(res, 'warnings'),'the object has key \'warnings\'')
test(isArray(res.warnings),'the errors value is an array')
console.log(res)

function test(query, message) {
  if(query) {
    print('pass',message)
  } else {
    print('fail',message)
  }
}

function print(type, message) {
  if(type==='pass') {
    console.log(`\u001b[1;32m ${type}: ${message}`)
  } else {
    console.log(`\u001b[1;31m ${type}: ${message}`)
  }
}
