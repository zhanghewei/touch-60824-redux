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

function keydownWin(e){
  e.preventDefault()
  e.stopPropagation()
  // console.log("tag " + e.target.tagName)
  console.log("Win key code ", e.keyCode)
}
function keydownDoc(e){
  e.preventDefault()
  e.stopPropagation()
  // console.log("tag " + e.target.tagName)
  console.log("Doc key code ", e.keyCode)
}

// console.log(act)
@connect(
  state => ({
    session: state.session,
  }),
  act,
)
class Main extends Component {

  // static PropTypes = {
  //   // activePage: PropTypes.string,
  //   // activeSel: PropTypes.string,
  //   session: PropTypes.object,
  //   login: PropTypes.func,
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



  componentWillMount () {
    window.addEventListener('keydown', keydownWin)
    // document.addEventListener('keydown', keydownDoc)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', keydownWin)
    // document.removeEventListener('keydown', keydownDoc)
  }

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

// function mapStateToProps(state) {
//   return {
//     session: state.session,
//   }
// }

// export default connect(
//   mapStateToProps,
//   act
// )(Main)

export default Main
