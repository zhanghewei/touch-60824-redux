import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerOperator extends React.Component {
    get p() {
        return this.props.immutableProps.toJS()
    }
    render() {
        const activeEid = this.context.activeEid
        const handleFocus = this.context.handleFocus
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-wrench">F5</span></div>
                    <div className={"col-xs-11" + a}>
                        <button id="ope_1" className={F.getSelClass(activeEid == 'ope_1', 'button')}
                                onFocus={this.handleFocus.bind(this)}
                                onClick={ this.fetchPassengers.bind(this) }>
                            <span className="glyphicon glyphicon-refresh">Alt-Q</span>
                        </button>
                        <b> </b>
                        <button id="ope_2" className={F.getSelClass(activeEid == 'ope_2', 'button')}
                                onFocus={this.handleFocus.bind(this)}
                                onClick={ this.addPassenger.bind(this) }>
                            <span className="glyphicon glyphicon-plus">Alt-B</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
PassengerOperator.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
PassengerOperator.contextTypes = {
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
}
export default PassengerOperator