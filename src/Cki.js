import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
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
        /**
         * {
         *  whenkey: func,
         *  dokey: func,
         * }
         * @type {Array}
         */
        this.handlers = []
        this.loadHandler('keyF1', (e) => e.keyCode == 112, this.keyF1.bind(this))
    }

    /**
     * context for child items
     * @returns {{activeEid: *, handleFocus: (function(this:Cki))}}
     */
    getChildContext(){
        return {
            activeEid: this.s.activeEid,
            handleFocus: this.handleFocus.bind(this),
            updateData: this.updateData.bind(this),
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
        this.updateData(tma)
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
        const h = this.handlers.find( ele => ele.whenkey(e))
        if(h != null){
            console.log('trig event ${h.name}')
            return h.dokey(e)
        }

        let b
        if (kc == 112) {
            // b = this.keyF1(e)
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
            this.updateData(b)
        }
    }

    loadHandler(name, whenkey, dokey) {
        this.handlers.push({name, whenkey, dokey})
    }

    unloadHandler(name){
        const hn = this.handlers.entries().find(ele => ele[1].name == name)
        this.handlers = this.handlers.splice(hn[0], 1)
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
                let dt = F.getDataByEid(a, this.s.passengerData)
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

    componentWillMount() {
        window.addEventListener('resize', F.resizeWin)
        window.addEventListener('keydown', this.handleWinKeydown.bind(this))
        // this.loadHandler('keyF1', (e) => e.keyCode == 112, this.keyF1)
    }

    componentDidMount() {
        this.fetchPassengers()
        F.resizeWin()
        document.getElementById(this.s.activeEid).focus()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', F.resizeWin)
        window.removeEventListener('keydown', this.handleWinKeydown)
        // this.unloadHandler('keyF1')
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
            <PassengerPage immutableProps={Immutable.Map(p)} fetchPassengers={this.fetchPassengers.bind(this)}/>
        )
    }
}

Cki.childContextTypes = {
    activeEid: React.PropTypes.string,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
}

export default Cki





