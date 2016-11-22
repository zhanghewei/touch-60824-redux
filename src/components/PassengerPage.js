import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'
import PassengerList from './PassengerList'
import PassengerEdit from './PassengerEdit'
import PassengerSelect from './PassengerSelect'
import PassengerOperator from './PassengerOperator'

@pureRender
class PassengerPage extends React.Component {
    renderOperator() {
        const pp = this.props.immutableProps.toJS()
        const p = {
            page: pp.page,
        }
        const fetchPassengers = this.props.fetchPassengers
        return (
            <PassengerOperator immutableProps={Immutable.Map(p)} fetchPassengers={fetchPassengers}/>
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
                <PassengerList immutableProps={Immutable.Map(p)}/>
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
        if (pp.page == C.PAGE_EDIT) {
            return (
                <PassengerEdit immutableProps={{}}/>
            )
        }
    }

    render() {
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
                                           style={{marginLeft: 2}}/>
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