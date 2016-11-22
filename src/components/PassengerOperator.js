import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerOperator extends React.Component {
    addPassenger() {
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const passengerData = c.passengerData
        const updateData = this.context.updateData
        const newId = passengerData.reduce((maxId, ele) => Math.max(ele.id, maxId), -1) + 1
        passengerData.push({id: newId, name: "abcdaaa"})
        const queryList = [C.DEFAULT_INPUT]
        passengerData.map(ele => {
            queryList.push(C.PREFIX[C.BLOCK_LIST] + ele.id)
        })
        updateData({
            queryList,
            passengerData,
            activeEid: C.PREFIX[C.BLOCK_LIST] + newId,
        })
    }
    render() {
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        const fetchPassengers = this.props.fetchPassengers
        const a = C.BLOCK_OPERATOR == p.page ? ' f1-active' : ''
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-wrench">F5</span></div>
                    <div className={"col-xs-11" + a}>
                        <button id="ope_1" className={F.getSelClass(activeEid == 'ope_1', 'button')}
                                onFocus={ handleFocus }
                                onClick={ fetchPassengers }>
                            <span className="glyphicon glyphicon-refresh">Alt-Q</span>
                        </button>
                        <b> </b>
                        <button id="ope_2" className={F.getSelClass(activeEid == 'ope_2', 'button')}
                                onFocus={handleFocus}
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
    fetchPassengers: React.PropTypes.func.isRequired,
}
PassengerOperator.contextTypes = {
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
}
export default PassengerOperator