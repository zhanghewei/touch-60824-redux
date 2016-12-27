import React from 'react'
import * as C from '../Constants'
import * as F from '../Functions'
import PassengerSexStatistics from './PassengerSexStatistics'

export default class FlightStatusManage extends React.Component {
    constructor() {
        super()

        this.idIndex = null;
    }

    doOnClick(e) {

        const btn = $(e.target),
            label = btn.html(),
            opr = btn.data('opr')
        if (confirm('您确认执行[' + label + ']操作吗？')) {
            this.context.request('flight', 'closeOrOpen', function (data) {

                if (data && data.length > 0) {

                    const g = this.context.globalContext.toJS();
                    const newToken = g.token
                    newToken.fl = data[0]

                    this.context.updateGlobal({
                        token: newToken
                    })

                    this.context.updateData({
                        page: C.PAGE_QUERY,
                        pageName: C.DEFAULT_PAGENAME,
                        activeEid: C.DEFAULT_INPUT
                    })
                }
            }.bind(this), {opr: opr})
        }
    }

    creataBtn(btnTxt, opr, enable) {
        const c = this.context.immutableContext.toJS();

        if (enable) {
            const id = C.PREFIX[C.BLOCK_LIST] + this.idIndex++
            return <button id={id} data-opr={opr} onFocus={this.context.handleFocus} onClick={this.doOnClick.bind(this)}
                           className={F.getSelClass(c.activeEid == id, 'button')}>{btnTxt}</button>
        }
        else {
            return <button data-opr={opr} disabled="disabled"
                           className="btn btn-default">{btnTxt}</button>
        }
    }

    componentDidMount() {
        // console.log('this.idIndex', this.idIndex)
        if (!this.idIndex) return
        const firstEl = $('#' + C.PREFIX[C.BLOCK_LIST] + '1')
        firstEl.focus();

        this.keyDownFn = function (e) {
            if (e.altKey && e.which != 18) {
                const charCode = e.which - 48

                const btn = $(':button:contains("(' + charCode + ')")')
                btn.click();
            }
        }

        $(window).on('keydown', this.keyDownFn)
    }

    componentWillUnmount() {
        if (this.keyDownFn) {
            $(window).off('keydown', this.keyDownFn)
        }
    }

    render() {

        const fl = this.props.fl;
        const fs = fl.fs
        const gs = fl.gs

        this.idIndex = 1;

        const o = <div className="modal-body">
            <div className="row">
                <div className="col-xs-8 panel_padding_right_0">
                    <div className="panel panel-default dcs-selectable-container">
                        <div id="option_div" className="panel-body">
                            <form id="myForm" className="form-horizontal" data-toggle="validator" autoComplete="off">
                                <div className="form-group">
                                    <div className="text-left" style={{paddingLeft: '50px'}}>
                                        <h4>
                                            <strong id="flightStatusShow">
                                                航班号：<span className="value_code"
                                                          data-name="fn">{fl.fn.toLocaleUpperCase()}</span>&nbsp;
                                                航班状态：<span data-name="fs"
                                                           className="value_code">{fl.fs.toLocaleUpperCase()}</span>&nbsp;
                                                闸口状态：<span data-name="gs"
                                                           className="value_code">{fl.gs.toLocaleUpperCase()}</span>
                                            </strong>
                                        </h4>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row" style={{marginBottom: '10px'}}>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(0)打开航班', 'op', fs == 'close')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(1)航班初始关闭', 'c1', fs == 'op')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(2)航班中间关闭', 'c2', fs == 'ci')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(3)航班最后关闭', 'c3', fs == 'cl')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(7)闸口关闭', 'gc', gs == 'op')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2">
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(4)恢复初始关闭', 'o1', fs == 'ci')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(5)恢复中间关闭', 'o2', fs == 'cl')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(6)恢复最后关闭', 'o3', fs == 'cc')}
                                        </div>
                                        <div className="col-lg-2">
                                            {this.creataBtn('(8)恢复闸口', 'go', gs == 'close')}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <PassengerSexStatistics />
            </div>
        </div>

        this.updateMainList();

        return o;
    }

    updateMainList() {

        const ml = []
        for (let i = 1; i < this.idIndex; i++) {
            ml.push(C.PREFIX[C.BLOCK_LIST] + i);
        }

        this.context.setMainList(ml)
    }
}

FlightStatusManage.contextTypes = {
    globalContext: React.PropTypes.any,
    immutableContext: React.PropTypes.any,
    setFormList: React.PropTypes.func,
    setMainList: React.PropTypes.func,
    updateData: React.PropTypes.func,
    handleFocus: React.PropTypes.func,
    setActiveEid: React.PropTypes.func,
    updateGlobal: React.PropTypes.func,
    request: React.PropTypes.func
}