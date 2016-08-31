import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as act from '../actions'
import Passengers from '../containers/Passengers'

const styles = {
  panel: {
    borderWidth: 1,
    borderColor: "green",
    borderStyle: "solid",
  },
}
// console.log(act)
class Main extends Component {

  // static propTypes = {
  //
  // }
  // state = {
  //   open: false,
  // };

  // handleShowPassenger(){
  //   this.props.showPassenger()
  // }
  //
  // handleAddPassenger(){
  //   this.props.addPassenger(11)
  // }

  render() {
    // console.log(this.context.store);
    // const { ...prop} = this.props
    // const { ...prop} = this.props
    // console.log(act.login)
    // console.log(prop.login)
    // const { ...prop} = this.props
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
  // activeSel: PropTypes.string,
  session: PropTypes.object,
  login: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    session: state.session,
  }
}

export default connect(
  mapStateToProps,
  act
)(Main)
