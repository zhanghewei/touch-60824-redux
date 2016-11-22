import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerListItem extends React.Component {
    render() {
        // console.log(this.props.key)
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        const b = C.PREFIX[C.BLOCK_LIST] + p.id
        const isActive = activeEid == b
        let cc = "list-group-item dcs-list"
        if (isActive) {
            cc += " sel-active"
        }
        if (this.props.isSelection) {
            cc += " active"
        }
       return (
           <li id={b}
               tabIndex="-1"
               className={cc}
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
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
}
export default PassengerListItem