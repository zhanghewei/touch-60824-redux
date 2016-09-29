import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as act from '../actions'
import Passengers from '../containers/Passengers'

@connect(
  state => ({
    session: state.session,
    activePage: state.sel.activePage,
    queryActive: state.sel.queryActive,
  }),
  act,
)
class Main extends Component {

  static childContextTypes = {
    activePage: React.PropTypes.string,
    activeSel: React.PropTypes.string
  }

  getChildContext() {
    const {activePage, activeSel} = this.props;
    return {activePage, activeSel}
  }

  render() {
    return (() => {
      if (this.props.session.login) {
        return <Passengers />
      } else {
        return (<div>
          <button style={styles.panel} onClick={this.props.login}>登录</button>
        </div>)
      }
    })()
  }
}


Main.propTypes = {
  // activePage: PropTypes.string,
  activeSel: PropTypes.string,
  session: PropTypes.object,
  login: PropTypes.func,
}

export default Main
