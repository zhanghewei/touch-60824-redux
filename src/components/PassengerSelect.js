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
        const updateData = this.context.updateData
        let activeEid = this.context.activeEid

        const selectList = p.selectList
        let activeIndex = [...selectList.entries()].find(ele => ele[1] == activeEid)[0]
        selectList.splice(activeIndex, 1)
        if (selectList.length < 1) {
            document.getElementById(p.defaultActive).focus()
            updateData({
                selectList,
                block: p.defaultBlock,
            })
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
        const activeEid = this.context.activeEid
        const handleFocus = this.context.handleFocus
        const a = C.BLOCK_SELECT == p.page ? ' f1-active' : ''
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-user"></span>F1</div>
                    <div className={"col-xs-11" + a}>
                        {p.selectList.map(
                            it => {
                                const b = "btn btn-xs btn-" + (activeEid == it ? 'danger' : 'default')
                                const dt = F.getDataByEid(it, p.passengerData)
                                return (
                                    <span key={it}>
                                    <button id={it} className={b} onFocus={handleFocus}
                                            onClick={this.handleClickSelect.bind(this)}>
                                      <span className="glyphicon glyphicon-user">{dt[1].name}</span>
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
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
}
export default PassengerSelect