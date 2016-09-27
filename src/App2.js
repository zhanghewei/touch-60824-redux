import React from 'react'
import Cki from './Cki'

class App2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // login: false,
      login: true,
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
  }

  doLogin() {
    $.getJSON("session.json", (data => {
      const a = {
        ...this.state,
        user: data.user,
        flight: data.flight,
        login: true,
      }
      this.setState(a)
    }).bind(this))
  }

  render() {
    return (() => {
      if (this.state.login) {
        return <Cki/>
      } else {
        return (<div>
          <button onClick={this.doLogin.bind(this)}>登录</button>
        </div>)
      }
    })()
  }
}

export default App2