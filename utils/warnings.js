var error = require('./errors')

module.exports = {
  breakdownElementIdsInElements: function(location) {
    return error.createError({
      title: 'Breakdown Elements', 
      location: location,
      message: 'There are element IDs in at least one breakdown object that don\'t exist in the elements array'
    })
  },
  
  categoryElementIdsInElements: function(location) {
    return error.createError({
      title: 'Category Elements',  
      location: location,
      message: 'There are element IDs in at least one category object that don\'t exist in the elements array'
    })
  },
  
  elementsBelongToCategories: function(location) {
    return error.createError({
      title: 'Elements not in Category', 
      location: location,
      message: 'There is at least one element that does not belong to a category'
    })
  },
  
  linkedElementsInElements: function(location) {
    return error.createError({
      title: 'Linked Elements not in Elements', 
      location: location,
      message: 'There is at least one linked element that does not appear in the elements array'
    })
  },
  
  boardsBreakdownIdsEqualsBreakdowns: function(location) {
    return error.createError({
      title: 'Boards does not equal Breakdowns', 
      location: location,
      message: 'The number of breakdownIds in the boards does not equal the number of objects in the breakdowns array'
    })
  },
  
  boardsBreakdownIdsExistsInBreakdowns: function(location) {
    return error.createError({
      title: 'Boards breakdownIds not in Breakdowns', 
      location: location,
      message: 'There are breakdownIds in the boards that are not in the breakdowns array'
    })
  },
  
  stripboardsHaveCalendar: function(location) {
    return error.createError({
      title: 'Stripboard missing Calendar', 
      location: location,
      message: 'There is a stripboard that is missing its calendarId'
    })
  },
  
  calendarsHaveStart: function(location) {
    return error.createError({
      title: 'Calendar missing start date', 
      location: location,
      message: 'There is a calendar that is missing a start date event'
    })
  }
}