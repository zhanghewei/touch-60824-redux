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
export default class SelWrapper extends React.Component {
  static PropTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string.isRequired,
  }

  state = {
    active: false
  }

  render() {
    let r =
      <div
        tabIndex="1"
        style={
          this.state.active ? styles.activeWrapper : styles.defaultWrapper
        }
        onClick={(e)=> {
          console.log("click selWrapper")
          e.preventDefault()
          e.stopPropagation()
          this.setState(
            {
              active: true
            }
          )
        }}
      >
        {this.props.children}
      </div>
    return r
  }
}
