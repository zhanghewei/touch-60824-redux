import React from 'react'
import SeatMap from './SeatMap'
import * as F from '../Functions'
import * as C from '../Constants'

export default class CheckInPage extends React.Component {
    constructor() {
        super();

        this.inputId = C.PREFIX[C.BLOCK_FORM] + 'choose-seat'

        this.state = {
            seat: null
        }
    }

    doOnSeatChange(e) {

        this.setState(Object.assign({}, this.state, {
            seat: $.trim(e.target.value || '').toLocaleUpperCase()
        }))
    }

    componentDidMount() {
        // this.context.updateData({
        //     activeEid: this.inputId
        // })
        this.context.setActiveEid(this.inputId)
    }

    render() {

        const immutableProps = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const passengers = immutableProps.canCheckinPassengers || []
        const fl = F.dcs().token.fl
        // const inputId = C.PREFIX[C.BLOCK_FORM] + 'choose-seat'

        this.context.setFormList([this.inputId])

        const focus = c.activeEid == this.inputId
        const cc = focus ? 'form-control sel-active' : 'form-control '

        if (!c.refreshData) {
            alert('座位数据尚未准备好！');
            return '';
        }
        return (
            <div>
                <SeatMap ta={fl.ta} modal={c.refreshData[fl.uui].seat}/>
                <div style={{height: '8px'}}></div>
                <div className="row">
                    <form id="checkInForm" className="form-horizontal" data-toggle="validator" autoComplete="off">
                        <div className="col-xs-2"><input id="plu" type="hidden" value=""/></div>
                        <div className="col-xs-7">
                            <div className="input-group">
                                <span className="input-group-addon">本次值机人数：<span
                                    id="checkin_number">{passengers.length}</span>人，输入座位</span>
                                <input id={this.inputId} type="text"
                                       className={cc}
                                       value={this.state.value}
                                       onChange={this.doOnSeatChange.bind(this)}
                                       onFocus={this.context.handleFocus}
                                       placeholder="如25A"/>
                                <span className="input-group-btn">
                                        <button id="saveBtn" type="button"
                                                className="btn btn-default dcs-selectable">值机</button>
                                    </span>
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <button id="cancelBtn" type="button" className="btn btn-default hidden"
                                    data-dismiss="modal">取消
                            </button>
                        </div>
                    </form>
                </div>
                <div style={{height: '8px'}}></div>
                <div className="panel panel-default">
                    <table className="table table-hover table-condensed dcs-table">
                        <tbody>
                        <tr style={{
                            'backgroundColor': '#f1f1f1',
                            'fontWeight': 'bold',
                            'borderBottomWidth': '1px',
                            'borderBottomStyle': 'solid',
                            'borderBottomColor': '#D5D3D3'
                        }}>
                            <td width="0%" style={{display: 'none'}}></td>
                            <td className="col-xs-2">姓名</td>
                            <td className="col-xs-2">座位</td>
                            <td className="col-xs-1">舱位</td>
                            <td className="col-xs-1">目的站</td>
                            <td className="col-xs-2">行李</td>
                            <td className="col-xs-2">支付</td>
                            <td className="col-xs-2">旅客称谓</td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="checkin-passenger-list" className="table-responsive form-inline"
                         style={{height: '93px', overflow: 'auto'}}>
                        <table id="inflistTable" className="table table-hover table-condensed dcs-table">

                            <tbody>
                            {
                                passengers.map((pl, i)=> {

                                    return (
                                        <tr key={'key-checkin-list-' + pl.uui} className={i % 2 == 1 ? 'active' : ''}>
                                            <td className="idvalue" style={{display: 'none'}}>{pl.sid}</td>
                                            <td className="col-xs-2 wordBreak">{pl.cn}</td>
                                            <td className="col-xs-2">{pl.sea}</td>
                                            <td className="col-xs-1">{pl.ca}</td>
                                            <td className="col-xs-1">{pl.ds}</td>
                                            <td className="col-xs-2">({pl.fbw}){pl.bn}/{pl.tbw}</td>
                                            <td className="col-xs-2">{pl.atp}</td>
                                            <td className="col-xs-2">{pl.dti}</td>
                                        </tr>)

                                })
                            }

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}

CheckInPage.contextTypes = {
    immutableContext: React.PropTypes.any,
    setFormList: React.PropTypes.func,
    updateData: React.PropTypes.func,
    handleFocus: React.PropTypes.func,
    setActiveEid: React.PropTypes.func,
}