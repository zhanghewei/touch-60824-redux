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
        // console.log(this.props.key)
        const a = p.passengerData.map(
            it => {
                const b = C.PREFIX[C.BLOCK_LIST] + it.id
                // 是否在选中区
                const isSelection = p.selectList.find(ele => ele == C.PREFIX[C.BLOCK_SELECT] + it.id)
                    != null
                return (
                    <PassengerListItem key={b} isSelection={isSelection}
                                       immutableProps={Immutable.Map(it)}/>
                )
            }
        )
        return (
            <div>
                <br/>
                <div className="row">
                    <div className="col-xs-12">
                        <ul className="list-group">{a}</ul>
                    </div>
                </div>
            </div>
        )
    }
}
PassengerList.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
export default PassengerList