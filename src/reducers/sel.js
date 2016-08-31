import * as types from '../constants/ActionTypes'

const initialState = {
  activePage: "main",
  activeSel: "mainInput",
  main:["mainInput", "selLabel_1", "selLabel_2"],
  passengerLabels: [],
}

export default function sel(state = initialState, action) {
  switch (action.type) {
    case types.SEL:
      return {
        ...state,
        activeSel: action.id,
      };

    default:
      return state
  }
}
