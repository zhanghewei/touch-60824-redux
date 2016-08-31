import { combineReducers } from 'redux'
import sel from './sel'
import session from './session'
import passengers from './passengers'

const rootReducer = combineReducers({
  session,
  passengers,
  sel,
})

export default rootReducer
