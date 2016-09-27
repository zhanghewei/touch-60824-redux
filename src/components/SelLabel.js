import React, {PropTypes} from "react"
class SelLabel extends React.Component {
  render() {
    const {
      id,
      color,
      children,
      sta,
    } = this.props
    let cla = "label label-" + color
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
  children: PropTypes.node,
  sta: PropTypes.bool,
}

export default SelLabel

