import * as types from '../constants/ActionTypes'

export function showPassenger(text) {
  return dispatch => {
    // $.getJSON("passenger.json", data => {
      // console.log(data.length)
      dispatch({type: types.SHOW_PASSENGER, data})
    // })
  }
}

export function addPassenger(text) {
  return dispatch => {
    dispatch({type: types.ADD_PASSENGER, text})
  }
}

