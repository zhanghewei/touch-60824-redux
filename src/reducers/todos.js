import * as types from '../constants/ActionTypes'

const initialState = [
  {"id": 1, "name": "aa"},
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_PASSENGER:
      return action.data;

    case types.ADD_PASSENGER:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          name: action.text
        },
        ...state
      ]

    default:
      return state
  }
}
