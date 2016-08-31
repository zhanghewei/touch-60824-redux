import React from "react"

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

class SelLabel extends React.Component {
  static PropTypes = {
    id: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    sel: React.PropTypes.func.isRequired,
    children: React.PropTypes.node,
  }

  // state = {
  //   active: false
  // }

  render() {
    let idText = this.props.id;
    let cla = "label label-" + this.props.color;
    console.log("active sel is " + this.context.activeSel)
    if(this.context.activeSel === idText){
      cla += " passenger-sel-wrapper-active"
    } else {
      cla += " passenger-sel-wrapper"
    }
    let r =
      <span
        id={ idText }
        tabIndex="1"
        className={cla}
        onClick={(e)=> {
          e.preventDefault()
          e.stopPropagation()
          this.props.sel(idText)
        }}
      >
        {this.props.children}
      </span>
    return r
  }
}

SelLabel.contextTypes = {
  activeSel: React.PropTypes.string
}

export default SelLabel

