import * as types from '../constants/ActionTypes'

const initialState = {
  activePage: "main",
  activeSel: "mainInput",
  // main:["mainInput"],
  passengerLabels: [],
}

export default function sel(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SEL:
      const defaultActiveSel = initialState.activeSel;
      return {
        ...state,
        // main: action.ids.unshift(defaultActiveSel),
        activeSel: defaultActiveSel,
      };
    case types.ACTIVE_SEL:
      return {
        ...state,
        activeSel: action.id,
      };

    default:
      return state
  }
}
