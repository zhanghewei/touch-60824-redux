import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import PassengerList from './components/PassengerList'
import PassengerEdit from './components/PassengerEdit'
import * as C from './Constants'
import * as F from './Functions'

// private methods
const getDataByEid = Symbol('getDataById')
// const getSelClass = Symbol('getSelClass')

/**
 * 操作模式
 *
 * - 查询模式
 * - 选择区1
 * - 选择区2
 * - 操作区
 * - 表单模式
 * - 编辑模式
 * - 编辑模式
 *
 */
@pureRender
class Cki extends React.Component {
    constructor() {
        super()

        // console.log(C.DEFAULT_INPUT1)
        this.s = {
            passengerData: [],
            page: C.PAGE_QUERY,
            block: C.BLOCK_LIST,
            defaultBlock: C.BLOCK_LIST,
            defaultActive: C.DEFAULT_INPUT,
            activeEid: C.DEFAULT_INPUT,
            queryList: [C.DEFAULT_INPUT],
            selectList: [],
            operatorList: ['ope_1', 'ope_2'],
            editList: ['edt_in1', 'edt_in2', 'edt_chk1', 'edt_chk2',
                'edt_chk3',
                'edt_sel1',
                'edt_in3', 'edt_btn1'],
        }
        this.state = {immutableState: Immutable.Map(this.s)}
    }

    getChildContext(){
        return {
            activeEid: this.s.activeEid,
            handleFocus: this.handleFocus.bind(this),
        }
    }

    /**
     * 触发状态变更
     * @param data
     */
    set data(data) {
        if (!data) {
            return
        }
        const immutableState = this.state.immutableState.merge(data)
        this.s = immutableState.toJS()
        this.setState({immutableState})
    }

    /**
     * 可选择的元素列表
     * @returns {Array}
     */
    get validList() {
        switch (this.s.block) {
            case C.BLOCK_LIST:
                return this.s.queryList
            case C.BLOCK_FORM:
                return this.s.editList
            case C.BLOCK_SELECT:
                return this.s.selectList
            case C.BLOCK_OPERATOR:
                return this.s.operatorList
        }
        return []
    }

    set activeEid(active) {
        const tma = {}
        for (const k of Object.keys(C.PREFIX)) {
            const v = C.PREFIX[k]
            if (active.startsWith(v)) {
                tma.block = k
                break
            }
        }
        // console.log(`active is ${active}, block is ${tma.block}`)
        tma.activeEid = active
        this.data = tma
    }

    /**
     * 触发焦点
     * @param e
     */
    handleFocus(e) {
        F.stopEvent(e)
        let a = this.s.activeEid
        console.log(`${a} ${e.target.id} ${e.target}`)
        let id = e.target.id
        // console.log(`trigger focus ${id}`)
        // avoid dead loop
        if (id == null || id == a) {
            return
        }
        this.activeEid = id
    }

    fetchPassengers() {
        // console.log("call fetch pas")
        $.getJSON("passenger.json", (passengerData => {
            // console.log(`fetch data ${data.length}`)
            const queryList = [C.DEFAULT_INPUT]
            passengerData.map(ele => {
                queryList.push(C.PREFIX[C.BLOCK_LIST] + ele.id)
            })
            this.data = {
                queryList,
                passengerData,
                page: C.PAGE_QUERY,
                block: C.BLOCK_LIST,
                defaultBlock: C.BLOCK_LIST,
                activeEid: C.DEFAULT_INPUT,
            }
        }).bind(this))
    }

    addPassenger() {
        const passengerData = this.s.passengerData
        const newId = passengerData.reduce((maxId, ele) => Math.max(ele.id, maxId), -1) + 1
        passengerData.push({id: newId, name: "abcdaaa"})
        const queryList = [C.DEFAULT_INPUT]
        passengerData.map(ele => {
            queryList.push(C.PREFIX[C.BLOCK_LIST] + ele.id)
        })
        this.data = {
            queryList,
            passengerData,
            activeEid: C.PREFIX[C.BLOCK_LIST] + newId,
        }
    }

    /**
     * 根据元素id获取对应数据
     *
     * todo 目前只用于选中区元素
     * @param eid
     * @returns {*}
     */
    [getDataByEid](eid) {
        if (eid == null) {
            return false
        }
        let dataId = C.BLANK
        for (const k of Object.keys(C.PREFIX)) {
            const v = C.PREFIX[k]
            if (eid.startsWith(v)) {
                dataId = eid.substring(v.length, eid.length)
            }
        }
        if (dataId == C.BLANK) {
            return false
        }
        for (const [i, o] of this.s.passengerData.entries()) {
            if (o.id == dataId) {
                return [i, o]
            }
        }
        return false
    }

    /**
     * 键盘导航
     *
     * 选择搜索框, 重置
     * esc  27
     *
     * 选择下一个元素
     * tab  9
     * right  39
     * down   40
     *
     * 选择上一个元素
     * shift + tab  16 + 9
     * left 37
     * up   38
     *
     * 选择选中区
     * enter 13
     *
     *
     * @param e
     */
    handleWinKeydown(e) {
        const etn = e.target.tagName
        const ett = e.target.type
        const kc = e.keyCode
        const ckc = e.ctrlKey
        const akc = e.altKey
        const skc = e.shiftKey
        // console.log(`Win key code ${kc}, alt ${akc}, shift ${skc}, ctrl ${ckc}`)
        let b
        if (kc == 112) {
            b = this.keyF1(e)
        } else if (kc == 116) {
            b = this.keyF5(e)
        } else if (kc == 27) {
            b = this.keyEsc(e)
        } else if (kc == 32 && !skc && !akc && !ckc) {
            b = this.keySpace(e, etn)
        } else if (kc == 13 && !skc && !akc && !ckc) {
            b = this.keyEnter(e, etn)
        } else if ((kc == 9 && skc && !akc && !ckc) || kc == 37 || kc == 38) {
            // tab arrow-left arrow-up
            b = this.keyMove(-1, e, etn, ett, kc)
        } else if ((kc == 9 && !skc && !akc && !ckc) || kc == 39 || kc == 40) {
            // shift+tab arrow-right arrow-down
            b = this.keyMove(1, e, etn, ett, kc)
        }
        if (!!b) {
            this.data = b
        }
    }

    /**
     * 选择区1
     * @param e
     * @returns {*}
     */
    keyF1(e) {
        F.stopEvent(e)
        if (this.s.block == C.BLOCK_SELECT || this.s.selectList.length < 1) {
            return false
        }
        document.getElementById(this.s.selectList[0]).focus()
        return false
    }

    /**
     * 操作区
     * @param e
     * @returns {*}
     */
    keyF5(e) {
        F.stopEvent(e)
        if (this.s.block == C.BLOCK_OPERATOR) {
            return false
        }
        document.getElementById(this.s.operatorList[0]).focus()
        return false
    }

    /**
     * 取消
     * @param e
     * @returns {*}
     */
    keyEsc(e) {
        if (this.s.block != this.s.defaultBlock) {
            document.getElementById(this.s.defaultActive).focus()
            return {
                block: this.s.defaultBlock,
            }
        }
        if (this.s.page != C.DEFAULT_PAGE) {
            document.getElementById(C.DEFAULT_INPUT).focus()
            return {
                page: C.DEFAULT_PAGE,
                defaultBlock: C.BLOCK_LIST,
                defaultActive: C.DEFAULT_INPUT,
                activeEid: C.DEFAULT_INPUT,
            }
        }
    }

    /**
     * 选中激活
     * @param e
     * @param etn
     * @returns {*}
     */
    keySpace(e, etn) {
        if (etn == 'INPUT' || etn == 'SELECT' || etn == 'BUTTON') {
            return null
        }

        if (this.s.block == C.BLOCK_LIST) {
            // 旅客列表
            F.stopEvent(e)
            const selectList = this.s.selectList
            for (const [i, a] of selectList.entries()) {
                let dt = this[getDataByEid](a)
                if (dt != null && C.PREFIX[C.BLOCK_LIST] + dt[1].id == this.s.activeEid) {
                    // 取消选中
                    selectList.splice(i, 1)
                    return {selectList}
                }
            }
            for (const p of this.s.passengerData) {
                if (C.PREFIX[C.BLOCK_LIST] + p.id == this.s.activeEid) {
                    selectList.push(C.PREFIX[C.BLOCK_SELECT] + p.id)
                    break
                }
            }
            return {selectList}
        }
        return false
    }

    handleClickSelect(e) {
        F.stopEvent(e)
        const selectList = this.s.selectList
        let activeEid = this.s.activeEid
        let activeIndex = [...selectList.entries()].find(ele => ele[1] == activeEid)[0]
        selectList.splice(activeIndex, 1)
        if (selectList.length < 1) {
            document.getElementById(this.s.defaultActive).focus()
            this.data = {
                selectList,
                block: this.s.defaultBlock,
            }
        } else {
            activeIndex--
            if (activeIndex < 0) {
                activeIndex++
            }
            activeEid = selectList[activeIndex]
            document.getElementById(activeEid).focus()
            this.data = {selectList, activeEid}
        }
    }

    /**
     * 触发操作
     * @param e
     * @param etn
     * @returns {*}
     */
    keyEnter(e, etn) {
        if (etn == 'INPUT' || etn == 'SELECT' || etn == 'BUTTON') {
            return null
        }
        if (this.s.block == C.BLOCK_LIST) {
            // 值机
            F.stopEvent(e)
            return {
                page: C.PAGE_EDIT,
                block: C.BLOCK_FORM,
                defaultBlock: C.BLOCK_FORM,
                defaultActive: this.s.editList[0],
                activeEid: this.s.editList[0],
            }
        }
    }

    /**
     * 快捷键导航
     * @param step
     * @param e
     * @param etn
     * @param ett
     * @param kc
     */
    keyMove(step, e, etn, ett, kc) {
        if ((kc == 37 || kc == 39) && etn == 'INPUT' && ett == 'text') {
            return
        }
        let validList = this.validList
        // console.log(validList)
        if (validList.length < 2) {
            return
        }
        F.stopEvent(e)
        let activeEid = this.s.activeEid
        let activeIndex = [...validList.entries()].find(ele => ele[1] == activeEid)[0]

        activeIndex += step
        if (activeIndex < 0) {
            activeIndex += validList.length
        }
        if (activeIndex >= validList.length) {
            activeIndex -= validList.length
        }

        activeEid = validList[activeIndex]
        // console.log(activeEid)
        this.activeEid = activeEid
        document.getElementById(activeEid).focus()
    }

    renderOperator() {
        const a = C.BLOCK_OPERATOR == this.s.page ? ' f1-active' : ''
        const activeEid = this.s.activeEid
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-wrench">F5</span></div>
                    <div className={"col-xs-11" + a}>
                        <button id="ope_1" className={F.getSelClass(activeEid == 'ope_1', 'button')}
                                onFocus={this.handleFocus.bind(this)}
                                onClick={ this.fetchPassengers.bind(this) }>
                            <span className="glyphicon glyphicon-refresh">Alt-Q</span>
                        </button>
                        <b> </b>
                        <button id="ope_2" className={F.getSelClass(activeEid == 'ope_2', 'button')}
                                onFocus={this.handleFocus.bind(this)}
                                onClick={ this.addPassenger.bind(this) }>
                            <span className="glyphicon glyphicon-plus">Alt-B</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 旅客列表
     * @returns {*}
     */
    renderQuery() {
        if (this.s.page == C.PAGE_QUERY) {
            const p = {
                passengerData: this.s.passengerData,
                selectList: this.s.selectList,
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
        if (this.s.selectList.length < 1) {
            return null
        }
        const a = C.BLOCK_SELECT == this.s.page ? ' f1-active' : ''
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-1"><span className="glyphicon glyphicon-user"></span>F1</div>
                    <div className={"col-xs-11" + a}>
                        {this.s.selectList.map(
                            it => {
                                const b = "btn btn-xs btn-" + (this.s.activeEid == it ? 'danger' : 'default')
                                const dt = this[getDataByEid](it)
                                return (
                                    <span key={it}>
                    <button id={it} className={b} onFocus={this.handleFocus.bind(this)}
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

    /**
     * 编辑界面
     * @returns {*}
     */
    renderEdit() {
        if (this.s.page == C.PAGE_EDIT) {
            return (
                <PassengerEdit immutableProps={{}}/>
            )
        }
    }

    componentWillMount() {
        window.addEventListener('resize', F.resizeWin)
        window.addEventListener('keydown', this.handleWinKeydown.bind(this))
    }

    componentDidMount() {
        this.fetchPassengers()
        F.resizeWin()
        document.getElementById(this.s.activeEid).focus()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', F.resizeWin)
        window.removeEventListener('keydown', this.handleWinKeydown)
    }

    render() {
        const activeEid = this.s.activeEid
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
                                           onFocus={this.handleFocus.bind(this)} tabIndex="-1"
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

Cki.childContextTypes = {
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
}

export default Cki





