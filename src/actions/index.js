import * as types from '../constants/ActionTypes'
// import data from '../api/passenger.json'

// const data = [
//   {"id": 1, "name": "zhangsan"},
//   {"id": 2, "name": "lisi"}
// ]

export function showPassenger(text) {
  return dispatch => {
    $.getJSON("passenger.json", function (data) {
      console.log(data.length)
      dispatch({ type: types.SHOW_PASSENGER, data })
    })
  }
}

export function addPassenger(text) {
  return  dispatch => {
    dispatch({ type: types.ADD_PASSENGER, text })
  }
}

