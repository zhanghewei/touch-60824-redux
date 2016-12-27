import React from 'react'
import SeatMap from './SeatMap'
import * as F from '../Functions'
import * as C from '../Constants'

export default class SeatSetting extends React.Component {

    getId() {

        return C.PREFIX[C.BLOCK_LIST] + this.idIndex++
    }

    componentDidMount() {
        this.context.setActiveEid(C.PREFIX[C.BLOCK_LIST] + '1')
    }

    updateMainList() {

        const l = []

        for (let i = 1; i < this.idIndex; i++) {
            l.push(C.PREFIX[C.BLOCK_LIST] + i)
        }

        this.context.setMainList(l)
    }

    tagChange() {
        this.props.tag = $.trim(e.target.value || '').toLocaleUpperCase()
    }

    doSubmit(e) {

        const which = e.which
        if (which == 13) {

            const btn = $(e.target)
            btn.val($.trim(btn.val()) || 'ABCDEF')

            const form = btn.parents('form'),
                params = F.serializeForm(form)


            this.context.request('seat', 'seatSet', function (data) {

                if (data) {

                    this.context.updateData({
                        page: C.PAGE_QUERY,
                        pageName: C.DEFAULT_PAGENAME,
                        activeEid: C.DEFAULT_INPUT
                    })
                }
            }.bind(this), params)

            F.stopEvent(e)
        }
    }

    render() {
        this.idIndex = 1;

        const c = this.context.immutableContext.toJS()
        const g = this.context.globalContext.toJS()
        const fl = g.token.fl
        const seatModal = c.refreshData[fl.uui].seat
        const tag = this.props.tag
        let id;

        if (tag) {
            this.tagBtn =
                <input type="text" className="form-control" name="st" value={tag} onChange={this.tagChange.bind(this)}
                       readOnly="readOnly"/>
        } else {
            id = this.getId()
            this.tagBtn =
                <input id={id} type="text" name="st" className={F.getSelClass(c.activeEid == id)}
                       data-parsley-trigger="focusout"
                       maxLength="1" placeholder="/Z/K/G/C/X/S*" pattern="^[cCKkXxLlZzSsGg#*-]{1}$" required="required"
                       data-parsley-pattern-message="只能输入CkXLZSG#*-"/>
        }

        id = this.getId()
        this.btn1 = <input id={id} type="text" name="startRn"
                           className={F.getSelClass(c.activeEid == id)}
                           pattern="[1-9][0-9]{0,1}" maxLength="2" data-minlength="1"
                           placeholder="如 8或28"
                           required="true" data-parsley-max="31"/>
        id = this.getId()
        this.btn2 = <input id={id} type="text" name="endRn" className={F.getSelClass(c.activeEid == id)}
                           pattern="[1-9][0-9]{0,1}" maxLength="2" data-minlength="1"
                           placeholder="如 8或28"
                           required="true" data-parsley-maxvalue="#start_rn_open"
                           data-parsley-maxvalue-message="必须大于或等于开始框输入值"/>

        id = this.getId()
        this.btn3 = <input id={id} type="text" className={F.getSelClass(c.activeEid == id)}
                           maxLength="6" name="cn"
                           placeholder="如 A或ABC" pattern="[a-fA-F]+" onKeyDown={this.doSubmit.bind(this)}/>

        this.updateMainList()
        return <div>
            <SeatMap ta={fl.ta} modal={seatModal}/>

            <div className="row">
                <form>
                    <div style={{textAlign: 'center'}}>
                        <div className="col-xs-2">
                            <div className="input-group">
                                <span className="input-group-addon">标记</span>
                                {this.tagBtn}
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="input-group">
                                <span className="input-group-addon">开始</span>
                                {this.btn1}
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="input-group">
                                <span className="input-group-addon">结束</span>
                                {this.btn2}
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="input-group">
                                <span className="input-group-addon">座位</span>
                                {this.btn3}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}

SeatSetting.contextTypes = {
    immutableContext: React.PropTypes.any,
    globalContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
    updateData: React.PropTypes.func,
    setActiveEid: React.PropTypes.func,
    request: React.PropTypes.func
}