import * as types from '../constants/ActionTypes'

export function login(userName, userPass) {
  return dispatch => {
    // dispatch({type: types.LOGIN_PROCESS})
    $.getJSON("session.json", function (data) {
      dispatch({type: types.LOGIN_SUCCESS, data})
    })
  }
}

export function sel(id) {
  return dispatch => {
    dispatch({type: types.SEL, id})
  }
}



