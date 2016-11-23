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
        }
        return {
            immutableContext: Immutable.Map(c),
            handleFocus: this.handleFocus.bind(this),
            updateData: this.updateData.bind(this),
            getValidList: this.getValidList.bind(this),
            setActiveEid: this.setActiveEid.bind(this),
        }
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
        this.setState({immutableState})
    }

    /**
     * 可选择的元素列表
     * @returns {Array}
     */
    getValidList() {
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

    setActiveEid(active) {
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
        this.updateData(tma)
    }

    /**
     * 触发焦点
     * @param e
     */
    handleFocus(e) {
        F.stopEvent(e)
        let a = this.s.activeEid
        // console.log(`${a} ${e.target.id} ${e.target}`)
        let id = e.target.id
        // console.log(`trigger focus ${id}`)
        // avoid dead loop
        if (id == null || id == a) {
            return
        }
        this.setActiveEid(id)
    }

    fetchPassengers() {
        // console.log("call fetch pas")
        $.getJSON("passenger.json", (passengerData => {
            // console.log(`fetch data ${data.length}`)
            const queryList = [C.DEFAULT_INPUT]
            passengerData.map(ele => {
                queryList.push(C.PREFIX[C.BLOCK_LIST] + ele.id)
            })
            this.updateData({
                queryList,
                passengerData,
                page: C.PAGE_QUERY,
                block: C.BLOCK_LIST,
                defaultBlock: C.BLOCK_LIST,
                activeEid: C.DEFAULT_INPUT,
            })
        }).bind(this))
    }

    componentWillMount() {
        window.addEventListener('resize', F.resizeWin)
    }

    componentDidMount() {
        this.fetchPassengers()
        F.resizeWin()
        document.getElementById(this.s.activeEid).focus()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', F.resizeWin)
    }

    render() {
        const p = {
            page: this.s.page,
            defaultBlock: this.s.defaultBlock,
            defaultActive: this.s.defaultActive,
            passengerData: this.s.passengerData,
            selectList: this.s.selectList,
        }
        return (
            <KeyNav immutableProps={Immutable.Map(this.s)}>
                <PassengerPage immutableProps={Immutable.Map(p)} fetchPassengers={this.fetchPassengers.bind(this)}/>
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
}

export default Cki





