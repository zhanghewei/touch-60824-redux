import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import KeyNav from './components/KeyNav'
import PassengerPage from './components/PassengerPage'
import * as C from './Constants'
import * as F from './Functions'

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

        this.s = {
            passengerData: [],
            page: C.PAGE_QUERY,
            pageName: C.DEFAULT_PAGENAME,
            block: C.BLOCK_LIST,
            defaultBlock: C.BLOCK_LIST,
            defaultActive: C.DEFAULT_INPUT,
            activeEid: C.DEFAULT_INPUT,
            queryList: [C.DEFAULT_INPUT],
            selectList: [],
            operatorList: [],
            editList: [],
            cmd: C.DEFAULT_CMD,
            refreshData: null
        }
        this.state = {immutableState: Immutable.Map(this.s)}
    }

    /**
     * context for child items
     * @returns {{activeEid: *, handleFocus: (function(this:Cki))}}
     */
    getChildContext() {
        const c = {
            passengerData: this.s.passengerData,
            page: this.s.page,
            defaultBlock: this.s.defaultBlock,
            defaultActive: this.s.defaultActive,
            selectList: this.s.selectList,
            activeEid: this.s.activeEid,
            refreshData: this.s.refreshData,
            block: this.s.block
        }
        return {
            immutableContext: Immutable.Map(c),
            handleFocus: this.handleFocus.bind(this),
            updateData: this.updateData.bind(this),
            getValidList: this.getValidList.bind(this),
            setActiveEid: this.setActiveEid.bind(this),
            setOperatorList: this.setOperatorList.bind(this),
            setFormList: this.setFormList.bind(this),
            setMainList: this.setMainList.bind(this)
        }
    }

    setMainList(mainList) {

        mainList = mainList || []
        this.s.queryList = [C.DEFAULT_INPUT, ...mainList]
    }

    setFormList(formFieldList) {

        this.s.editList = formFieldList;
    }

    setOperatorList(operatorList) {

        this.s.operatorList = operatorList;
    }

    /**
     * 触发状态变更
     * @param data
     */
    updateData(data) {
        if (!data) {
            return
        }
        const immutableState = this.state.immutableState.merge(data)
        this.s = immutableState.toJS()
        this.setState({immutableState}, function () {
            const $t = $('#' + this.s.activeEid)
            $t.focus()
        })
    }

    /**
     * 可选择的元素列表
     * @returns {Array}
     */
    getValidList(block) {

        const b = block || this.s.block
        switch (b) {
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

    setActiveEid(active, cancel) {

        const tma = {}
        for (const k of Object.keys(C.PREFIX)) {
            const v = C.PREFIX[k]
            if (active.startsWith(v)) {
                tma.block = k
                break
            }
        }

        tma.block = tma.block || this.s.defaultBlock
        tma.activeEid = active
        this.updateData(tma)
    }

    /**
     * 触发焦点
     * @param e
     */
    handleFocus(e) {

        let a = this.s.activeEid
        let id = e.target.id
        // avoid dead loop
        if (id == null || id == a) {
            return
        }
        this.setActiveEid(id)
    }

    static formatData(data) {

        if (!data || !(data instanceof Array)) return data;
        return data.map(function (r) {
            let isCheckin = "NA";
            for (let k in r) {
                let v = r[k];
                if (k !== 'uui') {
                    r[k] = v && typeof v === 'string' ? v.toLocaleUpperCase() : v;
                }
            }
            if (r.wci) {
                isCheckin = "AC";
            }
            r.isCheckin = isCheckin;
            if (r.wcfs) {//座位冲突旅客突出显示
                r.style = 1;
            } else {
                r.style = 0;
            }
            if (r.osc != null) {
                r.ak = r.osc.indexOf("BAGPRICE") > 0 ? r.osc.substring(10, r.osc.indexOf("CNY")) : "0";
            }
            return r;
        })
    }

    fetchPassengers(cmd) {
        cmd = cmd || this.state.cmd || '/NA';
        this.context.request('queryPassenger', cmd, (function (passengerData) {

            passengerData = Cki.formatData(passengerData);

            const queryList = [C.DEFAULT_INPUT]
            passengerData.map(ele => {
                queryList.push(C.PREFIX[C.BLOCK_LIST] + ele.id)
            })

            const activeEid = passengerData && passengerData.length > 0 ? C.PREFIX[C.BLOCK_LIST] + passengerData[0].id : C.DEFAULT_INPUT;
            this.updateData({
                queryList,
                passengerData,
                page: C.PAGE_QUERY,
                pageName: C.DEFAULT_PAGENAME,
                block: C.BLOCK_LIST,
                defaultBlock: C.BLOCK_LIST,
                activeEid,
                selectList: [],
                cmd: cmd
            })
            $('#' + activeEid).focus();
        }).bind(this), {
            cmdMsg: ''
        })
    }

    componentWillMount() {
        window.addEventListener('resize', F.resizeWin)
    }

    componentDidMount() {
        this.fetchPassengers()
        F.resizeWin()
        // document.getElementById(this.s.activeEid).focus()
        const fn = (()=> {
            this.refreshRequest = this.context.request('refresh', 'netLatency', function (data) {
                if (data) {
                    this.updateData({
                        refreshData: data
                    })

                    const fl = this.props.token.fl
                    const updateToken = this.props.updateToken

                    updateToken(data[fl.uui].token, data.net)
                }
            }.bind(this));
        }).bind(this)

        fn();

        window.setInterval(fn.bind(this), 20000)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', F.resizeWin)

        this.refreshRequest.abort();
    }

    doOnCmdChange(e) {
        this.updateData({
            cmd: $.trim(e.target.value || '').toLocaleUpperCase()
        })
    }

    render() {
        const p = {
            page: this.s.page,
            pageName: this.s.pageName,
            defaultBlock: this.s.defaultBlock,
            defaultActive: this.s.defaultActive,
            passengerData: this.s.passengerData,
            selectList: this.s.selectList,
            cmd: this.s.cmd
        }
        this.s.loginMode = this.props.loginMode
        return (
            <KeyNav immutableProps={Immutable.Map(this.s)}>
                <PassengerPage immutableProps={Immutable.Map(p)}
                               fetchPassengers={this.fetchPassengers.bind(this)}
                               onCmdChange={this.doOnCmdChange.bind(this)}/>
            </KeyNav>
        )
    }
}

Cki.childContextTypes = {
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
    getValidList: React.PropTypes.func,
    setActiveEid: React.PropTypes.func,
    setOperatorList: React.PropTypes.func,
    setFormList: React.PropTypes.func,
    setMainList: React.PropTypes.func,
}

Cki.contextTypes = {
    request: React.PropTypes.func
}

export default Cki





