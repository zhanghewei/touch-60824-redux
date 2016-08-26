import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
// import { showPassenger } from './actions'
// import 'todomvc-app-css/index.css'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = configureStore()

// store.dispatch(showPassenger())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
