import * as types from '../constants/ActionTypes'

export function login(userName, userPass) {
  return dispatch => {
    // dispatch({type: types.LOGIN_PROCESS})
    $.getJSON("session.json", function (data) {
      dispatch({type: types.LOGIN_SUCCESS, data})
    })
  }
}

export function showSel() {
  // ids.unshift("mainInput");
  // let act = activeSel
  // if( act == null){
  //   act = ids[0];
  // }
  // console.log(111)
  return dispatch => {

    // console.log(222)
    dispatch({type: types.SHOW_SEL})
  }
}

export function doSel(id) {
  // console.log(111)
  return dispatch => {
    // console.log(222)
    dispatch({type: types.ACTIVE_SEL, id})
  }
}



