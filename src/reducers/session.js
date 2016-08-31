import * as types from '../constants/ActionTypes'

const initialState = {
  login: false,
  counter: null,
  pattern: "cki",
  user: {
    id: null,
    name: null,
    level: null,
  },
  flight: {
    id: null,
    flightNo: null,
  },
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_OUT:
      return {
        ...initialState,
        login: false,
        counter: state.counter,
        pattern: state.pattern,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        flight: action.data.flight,
        login: true,
      }

    default:
      return state
  }
}
