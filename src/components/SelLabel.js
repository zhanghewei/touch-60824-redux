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
//
// function keydownSelLabel(e){
//   // e.preventDefault()
//   // e.stopPropagation()
//   // console.log("SelLabel event canceled " + e.cancelBubble)
//   console.log("SelLabel key code ", e.keyCode)
// }
// function clickSelLabel(e){
//   // e.preventDefault()
//   e.stopPropagation()
//   doSel(idText)
// }
//
// @connect(
//   state => ({
//     activeSel: state.sel.activeSel,
//   }),
//   {
//     doSel: doSel,
//   },
// )
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
      // doSel,
      children,
      // activeSel,
      sta,
    } = this.props
    // let idText = id;
    let cla = "label label-" + color
    // console.log("active sel is " + this.context.activeSel)
    // if(this.context.activeSel === idText){
    if(sta){
      cla += " sel-active"
    } else {
      cla += " sel"
    }
    const r =
      <span
        id={ id }
        className={cla}
      >
        {children}
      </span>
    return r
  }
}

SelLabel.defaultProps = {
  color: "default",
  sta: false,
}

SelLabel.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  // doSel: PropTypes.func,
  children: PropTypes.node,
  // activeSel: PropTypes.string,
  sta: PropTypes.bool,
}

// SelLabel.contextTypes = {
//   activeSel: PropTypes.string
// }

export default SelLabel

