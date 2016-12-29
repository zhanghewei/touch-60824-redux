import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerListItem extends React.Component {
    doOnItemClick(e) {
        const c = this.context.immutableContext.toJS()
        const id = $(e.target).parents('a').attr('id')
        const isSelection = c.selectList.some((eid)=> {
            const pl = F.getDataByEid(eid, c.passengerData)
            return id == C.PREFIX[C.BLOCK_LIST] + pl[1].id
        })

        this.context.setActiveEid(id);

        // let sl;
        //
        // if (isSelection) {
        //     sl = c.selectList.filter((eid)=>eid != id)
        // } else {
        //     sl = Array.from(c.selectList)
        //     sl.push(id)
        // }
        // this.context.updateData({
        //     selectList: sl
        // })
    }

    doOnKeyDown(e) {
        if (e.which == 13) {
            this.props.onEnter();
        } else if (e.which == 48 && e.altKey && this.props.isSelection) {

            console.log('e.target.id::', e.target.id)
        }
    }

    render() {
        // console.log(this.props.key)
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        const b = C.PREFIX[C.BLOCK_LIST] + p.id
        const isActive = activeEid == b
        let cc = "list-group-item dcs-list perPassenger"//perPassenger
        if (isActive) {
            cc += " sel-active"
        }

        // const isSelection = c.selectList.some(eid=>eid == b)
        if (this.props.isSelection) {
            cc += " active"
        }
        // return (
        //     <li id={b}
        //         tabIndex="-1"
        //         className={cc}
        //         onFocus={handleFocus}
        //     >id: {b},
        //         name: {p.name}</li>
        // )
        return (
            <div className={cc} style={{padding: '5px auto'}}>
                <a href="javascript:void(0);" id={b} onFocus={handleFocus} onKeyDown={this.doOnKeyDown.bind(this)}
                   onClick={this.doOnItemClick.bind(this)}>
                    <div className="row margin0">
                        <div className="col-xs-3">
                            <p>
                                {p.scf && $.trim(p.scf).toUpperCase() == 'DEL' ?
                                    <span className="label redColor">退</span> : ''}
                                {p.wcc ? <span className="glyphicon glyphicon-asterisk"></span> : ''}
                                {p.ws ? <span className="glyphicon glyphicon-warning-sign"></span> : ''}
                                {p.wml ? <span className="label labelColor">中转</span> : ''}
                                {p.isCheckin && $.trim(p.isCheckin).toLocaleUpperCase() == 'AC' ?
                                    <span className="label dcs-seat-success margin10 labelFamily">{p.isCheckin}</span>
                                    : <span className="label labelColor margin10 labelFamily">{p.isCheckin}</span>
                                }
                                <span className="margin10">{p.cins}</span>
                                <span>{p.ss}-</span>
                                <span className="fontBolder">{p.ds}</span>
                            </p>
                            <p>
                                {p.style == 1 ? <span className="fontBolder enter">{p.sea}</span> : ''}
                                {p.style == 0 ? <span className="fontBolder">{p.sea}</span> : ''}
                                {$.trim(p.es) ? <span><span
                                    className="label labelColor margin10">ES</span><span> {p.es} </span></span> : ''}
                                <span className="margin10">{p.ca}</span>
                            </p>
                            <p>
                                <span className="label redColor">{p.ws ? '截留' : ''}</span>
                                {$.trim(p.note) ? <span className="fontBolder wordBreak">:{p.note}</span> : ''}
                                {$.trim(p.ost) && p.ost != '*' ?
                                    <span className="label labelColor margin10">{p.ost}</span> : ''}
                            </p>
                            <p>
                                <span className="glyphicon glyphicon-phone-alt phoneColor"></span>
                                {$.trim(p.te) ? <span className="margin10 wordBreak">{p.te}</span> : ''}
                            </p>
                        </div>
                        <div className="col-xs-3">
                            <p>
                                <span className="fontBolder wordBreak">{p.cn}</span>
                                {
                                    p.sex == 'M' ?
                                        <span className="label labelColor margin10">成人</span> : (p.sex == 'C' ?
                                        <span className="label labelColor margin10">儿童</span> :
                                        <span className="label labelColor margin10">婴儿</span>)
                                }
                            </p>
                            <p className="wordBreak">{p.en}</p>
                            <p>
                                <span>{p.dtc}</span>
                                {$.trim(p.dna) ? <span className="margin10">{p.dna}</span> : ''}
                            </p>
                            <p>{p.dn}</p>
                        </div>

                        <div className="col-xs-3">
                            <p>
                                <span>行李</span>
                                <span className="margin10">{p.bn}/{p.tbw}</span>
                                {p.bagNums ? <span className="wordBreak">[{p.bagNums}]</span> : ''}
                            </p>
                            <p>
                                <span>免额行李</span>
                                <span className="margin10">{p.fbw}</span>
                                <span>AK={p.ak}</span>
                            </p>
                            <p>
                                <span>打印次数</span>
                                <span className="margin10">{p.ppt}</span>
                            </p>
                            {p.yzsf && p.yzsf > 0 ?
                                <p><span>逾重收费</span><span className="margin10"> {p.yzsf} </span></p> : ''}
                            {p.ztcf && p.ztcf > 0 ?
                                <p><span>直通车收费</span><span className="margin10"> {p.ztcf} </span></p> : ''}
                            {p.kdjf && p.kdjf > 0 ?
                                <p><span>快登机收费</span><span className="margin10"> {p.kdjf} </span></p> : ''}
                            {p.rin ? <span><span className="label labelColor">绑定婴儿</span><span
                                className="margin10"> {p.rin} </span></span> : ''}
                            {$.trim(p.osi) ? <p><span className="label labelColor">辅助信息</span><span
                                className="margin10 wordBreak fontBolder"> {p.osi} </span></p> : ''}
                        </div>
                        <div className="col-xs-3">
                            <p>
                                <span>订单号</span>
                                <span className="margin10">{p.orn}</span>
                            </p>
                            <p>
                                <span>机票价格</span><span className="margin10">{p.atp}</span>
                            </p>
                            <p>
                                {p.wet ? <span>ET票</span> : ''}
                                <span className="margin10">{p.eti}</span>
                            </p>
                            <p>{p.od}</p>
                        </div>
                    </div>
                </a>
            </div>
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
    setActiveEid: React.PropTypes.func,
    updateData: React.PropTypes.func,
}
export default PassengerListItem