import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerListItem extends React.Component {
    get p() {
        return this.props.immutableProps.toJS()
    }

    render() {
        // console.log(this.props.key)
        const p = this.p
        const activeEid = this.context.activeEid;
        const handleFocus = this.context.handleFocus;
        const b = C.PREFIX[C.BLOCK_LIST] + p.id
        const isActive = activeEid == b
        let c = "list-group-item dcs-list"
        if (isActive) {
            c += " sel-active"
        }
        if (this.props.isSelection) {
            c += " active"
        }
       return (
           <li id={b}
               tabIndex="-1"
               className={c}
               onFocus={handleFocus}
           >id: {b},
               name: {p.name}</li>
       )
    }
}
PassengerListItem.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
    isSelection: React.PropTypes.bool.isRequired,
}
PassengerListItem.contextTypes = {
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
}
export default PassengerListItem