import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {sel} from '../actions/index'
import * as act from '../actions/PassengerActions'
import SelLabel from "../components/SelLabel"
import SelWrapper from "../components/SelWrapper"

const styles = {
  panel: {
    borderWidth: 1,
    borderColor: "green",
    borderStyle: "solid",
  },
};
class Passengers extends Component {
  getChildContext() {
    // console.log(this.props)
    return {
      activePage: this.props.activePage,
      activeSel: this.props.activeSel,
    }
  }

  render() {
    // console.log(this.props.activeSel)
    let r =
      <div>
        <nav className="navbar navbar-default">
          <div className="row">
            <div className="col-xs-1"></div>
            <div className="col-xs-10">
              <div className="input-group" style={{paddingTop: ".5em"}}>
                <input id="mainInput" className="form-control"/>
                <span className="input-group-btn">
                  <button className="btn btn-default" tabIndex="-1">
                    <span className="glyphicon glyphicon-play">执行(Enter)</span>
                  </button>
                </span>
              </div>
            </div>
            <div className="col-xs-1"></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-xs-1"></div>
          <div className="col-xs-11">
            <SelWrapper>
              <SelLabel id="selLabel_1" color="default" sel={this.props.sel}>测试</SelLabel>
              <SelLabel id="selLabel_2" color="default" sel={this.props.sel}>测试</SelLabel>
            </SelWrapper>
          </div>
        </div>
        <div style={styles.panel}>状态区</div>
        <div style={styles.panel}>选择区</div>
        <div style={styles.panel}>列表区<br/>
          <button onClick={ this.props.showPassenger }>refresh</button>
          <button onClick={ () => this.props.addPassenger(11) }>add</button>
          <ul className="todo-list">
            {this.props.passengers.map(
              todo =>
                <li key={todo.id}>id: {todo.id} name: {todo.name}</li>
            )}
          </ul>
        </div>
        <div style={styles.panel}>表单区</div>
        <div className="panel-red">状态区2</div>
      </div>
    return r
  }
}

Passengers.propTypes = {
  // activeSel: PropTypes.string,
  passengers: PropTypes.array,
  showPassenger: PropTypes.func,
  addPassenger: PropTypes.func,
  sel: PropTypes.func,
}

Passengers.childContextTypes = {
  activePage: React.PropTypes.string,
  activeSel: React.PropTypes.string
};

function mapStateToProps(state) {
  // console.log(state)
  return {
    passengers: state.passengers,
    activePage: state.sel.activePage,
    activeSel: state.sel.activeSel,
  }
}

export default connect(
  mapStateToProps,
  {...act, sel}
)(Passengers)
