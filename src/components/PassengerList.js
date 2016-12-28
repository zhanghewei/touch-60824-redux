import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'
import PassengerListItem from './PassengerListItem'

@pureRender
class PassengerList extends React.Component {
    render() {
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        // console.log(this.props.key)
        let a;
        if (c.passengerData && c.passengerData.length > 0) {
            a = c.passengerData.map(
                it => {
                    const b = C.PREFIX[C.BLOCK_LIST] + it.id
                    // 是否在选中区
                    const isSelection = c.selectList.find(ele => ele == C.PREFIX[C.BLOCK_SELECT] + it.id)
                        != null
                    return (
                        <PassengerListItem key={b} isSelection={isSelection}
                                           immutableProps={Immutable.Map(it)} onEnter={this.props.onCheckin}/>
                    )
                }
            )
        } else {
            a = '未查询到任何旅客记录！'
        }

        return (
            <div>
                <br/>
                <div className="row">
                    <div className="col-xs-12">
                        {/*<ul className="list-group">{a}</ul>*/}
                        <div style={{
                            'overflowY': 'auto',
                            'overflowX': 'hidden'
                        }}>{a}</div>
                    </div>
                </div>
            </div>
        )
    }
}
PassengerList.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
PassengerList.contextTypes = {
    immutableContext: React.PropTypes.any,
}
export default PassengerList