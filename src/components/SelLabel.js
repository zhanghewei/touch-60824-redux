import React, {PropTypes} from "react"
import {doSel} from '../actions/index'
import {connect} from 'react-redux'
// const styles = {
//   activeWrapper: {
//     borderStyle: "dashed",
//     borderWidth: 2,
//     borderColor: "green",
//   },
//   defaultWrapper: {
//     borderStyle: "solid",
//     borderWidth: 2,
//     borderColor: "grey",
//   },
// }



@connect(
  state => ({
    activeSel: state.sel.activeSel,
  }),
  {
    doSel: doSel,
  },
)
class SelLabel extends React.Component {
  // static PropTypes = {
  //   id: PropTypes.string.isRequired,
  //   color: PropTypes.string,
  //   doSel: PropTypes.func,
  //   children: PropTypes.node,
  //   activeSel: PropTypes.string,
  // }


  // static defaultProps = {
  //   color: "default",
  // }

  // static contextTypes = {
  //   activeSel: PropTypes.string,
  // }

  // state = {
  //   active: false
  // }



  render() {
    const {
      id,
      color,
      doSel,
      children,
      activeSel,
    } = this.props
    let idText = id;
    let cla = "label label-" + color
    // console.log("active sel is " + this.context.activeSel)
    // if(this.context.activeSel === idText){
    if(activeSel === idText){
      cla += " passenger-sel-wrapper-active"
    } else {
      cla += " passenger-sel-wrapper"
    }

    function keydownSelLabel(e){
      // e.preventDefault()
      e.stopPropagation()
      console.log("SelLabel key code ", e.keyCode)
    }
    function clickSelLabel(e){
      // e.preventDefault()
      e.stopPropagation()
      doSel(idText)
    }

    const r =
      <span
        id={ idText }
        tabIndex="1"
        className={cla}
        onClick={clickSelLabel}
        onKeyDown={keydownSelLabel}
      >
        {children}
      </span>
    return r
  }
}

SelLabel.defaultProps = {
  color: "default",
}

SelLabel.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  doSel: PropTypes.func,
  children: PropTypes.node,
  activeSel: PropTypes.string,
}

// SelLabel.contextTypes = {
//   activeSel: PropTypes.string
// }

export default SelLabel

