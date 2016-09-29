// import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import Main from './containers/Main'
// import configureStore from './store/configureStore'
import App2 from './App2'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// const store = configureStore()

render(
  // <Provider store={store}>
  //   <Main />
  // </Provider>,
  <App2/>,
  document.getElementById('root')
)
