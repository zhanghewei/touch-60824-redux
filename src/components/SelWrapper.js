import React from "react"

// const styles = {
//   activeWrapper: {
//     borderStyle: "dash",
//     borderWidth: 2,
//     borderColor: "green",
//   },
//   defaultWrapper: {
//     borderStyle: "solid",
//     borderWidth: 2,
//     borderColor: "grey",
//   },
// }
// function clickMe(e) {
//   // console.log("click selWrapper")
//   // e.preventDefault()
//   // e.stopPropagation()
//   this.setState(
//     {
//       active: true
//     }
//   )
// }
// function keydownSelWrapper(e) {
//   // e.preventDefault()
//   // e.stopPropagation()
//   console.log("SelWrapper key code ", e.keyCode)
// }
class SelWrapper extends React.Component {
  // static PropTypes = {
  //   children: React.PropTypes.node,
  //   color: React.PropTypes.string.isRequired,
  // }
  //
  // state = {
  //   active: false
  // }

  // static contextTypes = {
  //   activeSel: React.PropTypes.string,
  // }

  render() {
    const{
      // id,
      sta,
    } = this.props

    // const{
    //   // activePage,
    //   activeSel,
    // } = this.context

    // console.log(`wrapper active sel is ${activeSel}`)

    let cls = sta ? "passenger-sel-wrapper-active" : "passenger-sel-wrapper"

    const r =
      <div
        tabIndex="-1"
        className={cls}
      >
        {this.props.children}
      </div>
    return r
  }
}

SelWrapper.propTypes = {
  children: React.PropTypes.node,
  // id: React.PropTypes.string.isRequired,
  sta: React.PropTypes.bool.isRequired,
  // color: React.PropTypes.string.isRequired,
}

export default SelWrapper