import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerSelect extends React.Component {
    handleClickSelect(e) {
        F.stopEvent(e)
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const updateData = this.context.updateData
        let activeEid = c.activeEid

        const selectList = p.selectList
        let activeIndex = [...selectList.entries()].find(ele => ele[1] == activeEid)[0]
        selectList.splice(activeIndex, 1)
        if (selectList.length < 1) {
            // document.getElementById(p.defaultActive).focus()
            updateData({
                selectList,
                block: p.defaultBlock,
                activeEid: p.defaultActive,
                page: C.DEFAULT_PAGE,
                pageName: C.DEFAULT_PAGENAME
            })
            document.getElementById(p.defaultActive).focus()
        } else {
            activeIndex--
            if (activeIndex < 0) {
                activeIndex++
            }
            activeEid = selectList[activeIndex]
            document.getElementById(activeEid).focus()
            updateData({selectList, activeEid})
        }
    }

    render() {
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        const a = C.BLOCK_SELECT == p.page ? ' f1-active' : ''
        return (
            <div className="panel panel-default" style={{margin: '10px auto'}}>
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-user"></span>F1</div>
                    <div className={"col-xs-11" + a}>
                        {p.selectList.map(
                            it => {
                                const b = "btn btn-xs btn-" + (activeEid == it ? 'danger' : 'default')
                                const dt = F.getDataByEid(it, c.passengerData)
                                return (
                                    <span key={it}>
                                        <button id={it} className={b} onFocus={handleFocus}
                                                onClick={this.handleClickSelect.bind(this)}>
                                          <span className="glyphicon glyphicon-user">{dt[1].cn || dt[1].en}</span>
                                        </button>
                                        <b> </b>
                                    </span>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
PassengerSelect.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
PassengerSelect.contextTypes = {
    immutableContext: React.PropTypes.any,
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
}
export default PassengerSelect