import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'
import PassengerList from './PassengerList'
import PassengerEdit from './PassengerEdit'
import PassengerSelect from './PassengerSelect'
import PassengerOperator from './PassengerOperator'
import CheckInPage from './CheckInPage'

@pureRender
class PassengerPage extends React.Component {

    constructor() {
        super();

        this.state = {
            cmd: ''
        }
    }

    renderOperator() {
        const pp = this.props.immutableProps.toJS()
        const p = {
            page: pp.page,
            pageName: pp.pageName,
            cmd: pp.cmd
        }
        const fetchPassengers = this.props.fetchPassengers
        return (
            <PassengerOperator immutableProps={Immutable.Map(p)} fetchPassengers={fetchPassengers}
                               onCheckin={this.doCheckin.bind(this)}/>
        )
    }

    /**
     * 旅客列表
     * @returns {*}
     */
    renderQuery() {
        const pp = this.props.immutableProps.toJS()
        if (pp.page == C.PAGE_QUERY) {
            const p = {
                selectList: pp.selectList,
            }
            return (
                <PassengerList immutableProps={Immutable.Map(p)} onCheckin={this.doCheckin.bind(this)}/>
            )
        }
    }

    /**
     * 选中区1
     * @returns {*}
     */
    renderSelect() {
        const pp = this.props.immutableProps.toJS()
        if (pp.selectList.length > 0) {
            const p = {
                page: pp.page,
                defaultBlock: pp.defaultBlock,
                defaultActive: pp.defaultActive,
                selectList: pp.selectList,
            }
            return (
                <PassengerSelect immutableProps={Immutable.Map(p)}/>
            )
        }
    }

    /**
     * 编辑界面
     * @returns {*}
     */
    renderEdit() {
        const pp = this.props.immutableProps.toJS()
        // const c = this.context.immutableContext.toJS()
        if (pp.page == C.PAGE_EDIT) {
            switch (pp.pageName) {
                case C.PAGE_CHECKIN :

                    const canCheckinPassengers = []
                    for (const id of pp.selectList) {
                        const o = F.getDataByEid(id, pp.passengerData);
                        const pl = o[1]
                        if (pl.wci === false) {
                            canCheckinPassengers.push(pl)
                        }
                    }
                    const s = {
                        canCheckinPassengers: canCheckinPassengers
                    }
                    return <CheckInPage immutableProps={Immutable.Map(s)} fetchPassengers={this.props.fetchPassengers}/>
            }
            throw 'page not found !!' + pp.pageName
            // return (
            //     <PassengerEdit immutableProps={{}}/>
            // )
        }
    }

    doOnKeyDown(e) {

        const keyCode = e.which
        const $t = $(e.target)
        const newValue = $.trim($t.val())

        if (keyCode == 13) {
            // console.log(newValue, this.props.fetchPassengers)
            this.props.fetchPassengers(newValue)
            F.stopEvent(e);

            if ($t.is(':text')) {
                $t.select();
            }
        }
    }

    doCheckin() {

        const c = this.context.immutableContext.toJS()
        const canCheckin = c.selectList && c.selectList.some(function (id) {

                const pl = F.getDataByEid(id, c.passengerData)[1]
                return !pl.wci;
            });
        if(canCheckin) {
            this.context.updateData({
                page: C.PAGE_EDIT,
                pageName: C.PAGE_CHECKIN,
                block: C.BLOCK_LIST
            })
        }
    }

    // doOnCmdChange(e) {
    //
    //     this.setState(Object.assign({}, this.state, {
    //         cmd: e.target.value.toLocaleUpperCase()
    //     }))
    // }

    componentWillReceiveProps(nextProps) {
        const p = nextProps.immutableProps.toJS();
        this.setState(Object.assign({}, this.state, {
            cmd: p.cmd
        }))
    }

    render() {
        const p = this.props.immutableProps.toJS();
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        return (
            <div>
                <nav className="navbar navbar-default" style={{marginBottom: 0}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="input-group" style={{paddingTop: ".5em"}}>
                                  <span className="input-group-btn">
                                  <button className="btn btn-default" tabIndex="-1" title="返回">
                                    <span className="glyphicon glyphicon-menu-left">Esc</span>
                                  </button>
                                  </span>
                                    <input id="mainInput" key="mainInput"
                                           className={F.getSelClass(activeEid == C.DEFAULT_INPUT)}
                                           onFocus={ handleFocus } tabIndex="-1"
                                           style={{marginLeft: 2}} value={this.state.cmd}
                                           onKeyDown={this.doOnKeyDown.bind(this)}
                                           onChange={this.props.onCmdChange}/>
                                    <span className="input-group-btn">
                                  <button className="btn btn-default" tabIndex="-1" style={{marginLeft: 3}}>
                                    Enter<span className="glyphicon glyphicon-menu-right"></span>
                                  </button>
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div id="mainContainer" className="container-fluid">
                    {this.renderSelect()}
                    {this.renderOperator()}
                    {this.renderQuery()}
                    {this.renderEdit()}
                </div>
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container-fluid" style={{paddingTop: '1em'}}>
                        <div className="row">
                            <div className="col-xs-1">
                                <span className="glyphicon glyphicon-tasks">F6</span>
                            </div>
                            <div className="col-xs-7">
                                <button className="btn btn-xs btn-success">
                                    <span className="glyphicon glyphicon-print">登机牌打印机</span>
                                </button>
                                <b> </b>
                                <button className="btn btn-xs btn-success">
                                    <span className="glyphicon glyphicon-print">行李条打印机</span>
                                </button>
                                <b> </b>
                                <button className="btn btn-xs btn-success">
                                    <span className="glyphicon glyphicon-eye-open">身份证阅读器</span>
                                </button>
                                <b> </b>
                                <button className="btn btn-xs btn-danger">
                                    <span className="glyphicon glyphicon-camera">登机牌扫描枪</span>
                                </button>
                            </div>
                            <div className="col-xs-3 text-right">
                                <button className="btn btn-xs btn-success">
                                    <span className="glyphicon glyphicon-globe">正常</span>
                                </button>
                                <b> </b>
                                <button className="btn btn-xs btn-default">
                                    <span className="glyphicon glyphicon-log-out">退出</span>
                                </button>
                            </div>
                            <div className="col-xs-1 text-right">
                                <span className="glyphicon glyphicon-cog">F8</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
PassengerPage.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
    fetchPassengers: React.PropTypes.func.isRequired,
}
PassengerPage.contextTypes = {
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
}
export default PassengerPage