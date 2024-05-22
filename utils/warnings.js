var error = require('./errors')

/**
 * Contains functions that create error objects for various warning scenarios.
 * @module warnings
 */

module.exports = {
  /**
   * Creates an error object for the scenario where there are element IDs in at least one breakdown object that don't exist in the elements array.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  breakdownElementIdsInElements: function(location) {
    return error.createError({
      title: 'Breakdown Elements', 
      location: location,
      message: 'There are element IDs in at least one breakdown object that don\'t exist in the elements array'
    })
  },
  
  /**
   * Creates an error object for the scenario where there is at least one element that is missing a category ID.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  elementsHaveCategory: function(location) {
    return error.createError({
      title: 'Element missing Category', 
      location: location,
      message: 'There is at least one element that is missing a category ID'
    })
  },
  
  /**
   * Creates an error object for the scenario where there is at least one linked element that does not appear in the elements array.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  linkedElementsInElements: function(location) {
    return error.createError({
      title: 'Linked Elements not in Elements', 
      location: location,
      message: 'There is at least one linked element that does not appear in the elements array'
    })
  },
  
  /**
   * Creates an error object for the scenario where the number of breakdown IDs in the boards does not equal the number of objects in the breakdowns array.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  boardsBreakdownIdsEqualsBreakdowns: function(location) {
    return error.createError({
      title: 'Boards does not equal Breakdowns', 
      location: location,
      message: 'The number of breakdown IDs in the boards does not equal the number of objects in the breakdowns array'
    })
  },
  
  /**
   * Creates an error object for the scenario where there are breakdown IDs in the boards that are not in the breakdowns array.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  boardsBreakdownIdsExistsInBreakdowns: function(location) {
    return error.createError({
      title: 'Boards breakdownIds not in Breakdowns', 
      location: location,
      message: 'There are breakdown IDs in the boards that are not in the breakdowns array'
    })
  },
  
  /**
   * Creates an error object for the scenario where there is a stripboard that is missing its calendar ID.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  stripboardsHaveCalendar: function(location) {
    return error.createError({
      title: 'Stripboard missing Calendar', 
      location: location,
      message: 'There is a stripboard that is missing its calendar ID'
    })
  },
  
  /**
   * Creates an error object for the scenario where there is a calendar that is missing a start date event.
   * @param {string} location - The location of the error.
   * @returns {Object} - The error object.
   */
  calendarsHaveStart: function(location) {
    return error.createError({
      title: 'Calendar missing start date', 
      location: location,
      message: 'There is a calendar that is missing a start date event'
    })
  }
}