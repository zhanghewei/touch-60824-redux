import * as types from '../constants/ActionTypes'

// const initialState = [
//   {"id": 1, "name": "aa"},
// ]

export default function passengers(state = [], action) {
  switch (action.type) {
    case types.SHOW_PASSENGER:
      return action.data;

    case types.ADD_PASSENGER:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          name: action.text
        },
      ]

    default:
      return state
  }
}
