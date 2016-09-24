import React from "react"

const styles = {
  activeWrapper: {
    borderStyle: "dash",
    borderWidth: 2,
    borderColor: "green",
  },
  defaultWrapper: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "grey",
  },
}
function clickMe(e){
  // console.log("click selWrapper")
  // e.preventDefault()
  e.stopPropagation()
  this.setState(
    {
      active: true
    }
  )
}
export default class SelWrapper extends React.Component {
  static PropTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string.isRequired,
  }

  state = {
    active: false
  }



  render() {

    function keydownSelWrapper(e){
      // e.preventDefault()
      // e.stopPropagation()
      console.log("SelWrapper key code ", e.keyCode)
    }

    const r =
      <div
        tabIndex="1"
        style={
          this.state.active ? styles.activeWrapper : styles.defaultWrapper
        }
        onClick={clickMe.bind(this)}
        onKeyDown={keydownSelWrapper}
      >
        {this.props.children}
      </div>
    return r
  }
}
