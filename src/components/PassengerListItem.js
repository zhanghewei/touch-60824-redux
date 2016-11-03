import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'

const DEFAULT_INPUT = "mainInput"
const PAGE_QUERY = 'page-query'
const PAGE_EDIT = 'page-edit'
const DEFAULT_PAGE = PAGE_QUERY
const BLOCK_LIST = 'block-list'
const BLOCK_SELECT = 'block-select'
const BLOCK_OPERATOR = 'block-operator'
const BLOCK_FORM = 'block-form'
const BLOCK_SELECT2 = 'block-select2'
const BLOCK_DEVICE = 'block-device'
const BLOCK_CONFIG = 'block-config'
const BLANK = ''
const PREFIX = {
    [BLOCK_LIST]: "qry_",
    [BLOCK_SELECT]: "sel_",
    [BLOCK_OPERATOR]: "ope_",
    [BLOCK_FORM]: "edt_",
}

@pureRender
class PassengerListItem extends React.Component {
    get p() {
        return this.props.immutableProps.toJS()
    }

    render() {
        // console.log(this.props.key)
        const it = this.p
        const b = PREFIX[BLOCK_LIST] + it.id
        let c = "list-group-item dcs-list"
        if (this.props.isActive) {
            c += " sel-active"
        }
        if (this.props.isSelection) {
            c += " active"
        }
       return (
           <li id={b}
               tabIndex="-1"
               className={c}
               onFocus={this.props.onFocus}
           >id: {b},
               name: {it.name}</li>
       )
    }
}
PassengerListItem.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
    isActive: React.PropTypes.bool.isRequired,
    isSelection: React.PropTypes.bool.isRequired,
    onFocus: React.PropTypes.func.isRequired,
}
export default PassengerListItem