import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'
import {Popconfirm, message} from 'antd'

@pureRender
class PassengerOperator extends React.Component {

    constructor() {
        super()

        this.s = [];
    }

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

    doRefresh() {
        const fetchPassengers = this.props.fetchPassengers

        if (typeof fetchPassengers === 'function') {
            fetchPassengers();
        }
    }

    doCheckin() {

        this.context.updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_CHECKIN,
            block: C.BLOCK_FORM
        })
    }

    doCancelCheckin() {

    }

    createBtn(idIndex, btnText, handler) {
        const id = PassengerOperator.generateId(idIndex);
        const c = this.context.immutableContext.toJS()

        return <button key={'key-' + id} id={id} className={F.getSelClass(c.activeEid == id, 'button')}
                       onFocus={ this.context.handleFocus }
                       onClick={ handler } style={{margin: 'auto 5px'}}>
            <span className="glyphicon">{btnText}</span>
        </button>
    }

    notCancelCheckin() {

        // const c = this.context.immutableContext.toJS()
        //
        // c.updateData({
        //     page: C.PAGE_EDIT,
        //     pageName: C.PAGE_CHECKIN
        // })
    }

    generateBtns() {

        let idIndex = 1
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        // const activeEid = c.activeEid
        // const handleFocus = this.context.handleFocus
        //
        // const a = C.BLOCK_OPERATOR == p.page ? ' f1-active' : ''
        const btns = [];

        if (p.pageName == C.PAGE_CHECKIN) {
            return null
        }

        //刷新
        btns.push(this.createBtn(idIndex++, '刷新', this.doRefresh.bind(this)))

        //值机按钮
        const showCheckinBtn = c.selectList && c.selectList.some(function (id) {

                const pl = F.getDataByEid(id, c.passengerData)[1]
                return !pl.wci;
            });
        if (showCheckinBtn) {
            btns.push(this.createBtn(idIndex++, '值机', this.doCheckin.bind(this)))
        }

        //取消值机按钮
        const showCancelCheckinBtn = c.selectList && c.selectList.some(function (id) {
                const pl = F.getDataByEid(id, c.passengerData)[1]
                return pl.wci;
            });
        if (showCancelCheckinBtn) {
            btns.push(
                <Popconfirm title="你确定要取消值机吗？"
                            onConfirm={this.doCancelCheckin.bind(this)}
                            onCancel={this.notCancelCheckin.bind(this)}>{this.createBtn(idIndex++, '取消值机', this.doCancelCheckin.bind(this))}</Popconfirm>
            )
        }

        // this.setState(Object.assign({}, this.state, {
        //     buttons: btns
        // }))
        this.s = btns

        this.context.setOperatorList(btns.map((b, i)=>PassengerOperator.generateId(i + 1)));

        return btns;
    }

    render() {
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus

        const a = C.BLOCK_OPERATOR == p.page ? ' f1-active' : ''

        const buttons = this.generateBtns();

        if (!buttons || buttons.length == 0) {
            return <div></div>;
        } else {
            return (
                <div className="panel panel-default" style={{margin: '10px auto'}}>
                    <div className="panel-body">
                        <div className="col-xs-1"><span className="glyphicon glyphicon-wrench">F5</span></div>
                        <div className={"col-xs-11" + a}>
                            {/*<button id="ope_1" className={F.getSelClass(activeEid == 'ope_1', 'button')}*/}
                            {/*onFocus={ handleFocus }*/}
                            {/*onClick={ this.doRefresh.bind(this) }>*/}
                            {/*<span className="glyphicon glyphicon-refresh">Alt+Q</span>*/}
                            {/*</button>*/}
                            {/*<b> </b>*/}
                            {buttons.map(btn =>btn)}
                            {/*<button id="ope_2" className={F.getSelClass(activeEid == 'ope_2', 'button')}*/}
                            {/*onFocus={handleFocus}*/}
                            {/*onClick={ this.addPassenger.bind(this) }>*/}
                            {/*<span className="glyphicon glyphicon-plus">Alt-B</span>*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            )
        }

    }

    static generateId(idIndex) {

        return C.PREFIX[C.BLOCK_OPERATOR] + idIndex
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
    setOperatorList: React.PropTypes.func
}
export default PassengerOperator