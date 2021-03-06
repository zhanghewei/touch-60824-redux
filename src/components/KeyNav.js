import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class KeyNav extends React.Component {
    constructor() {
        super()
        /**
         * {
         *  whenkey: func,
         *  dokey: func,
         * }
         * @type {Array}
         */
        this.handlers = []
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
        const h = this.handlers.find(ele => ele.whenkey(e))
        if (h != null) {
            console.log('trig event ${h.name}')
            return h.dokey(e)
        }

        let b
        if (kc == 112) {
            // b = this.keyF1(e)
        } else if (kc == 116 && !ckc) {
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
            this.context.updateData(b)
            F.stopEvent(e)
        }
    }

    loadHandler(name, whenkey, dokey) {
        this.handlers.push({name, whenkey, dokey})
    }

    unloadHandler(name) {
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
        const p = this.props.immutableProps.toJS()
        if (p.block == C.BLOCK_SELECT || p.selectList.length < 1) {
            return false
        }
        document.getElementById(p.selectList[0]).focus()
        return false
    }

    /**
     * 操作区
     * @param e
     * @returns {*}
     */
    keyF5(e) {
        F.stopEvent(e)
        const p = this.props.immutableProps.toJS()
        if (p.block == C.BLOCK_OPERATOR) {
            return false
        }
        // document.getElementById(p.operatorList[0]).focus()
        const ids = this.context.getValidList(C.BLOCK_OPERATOR);
        if (ids && ids.length > 0) {
            // $('#' + ids[0]).focus();
            document.getElementById(ids[0]).focus()
        }
        return false
    }

    /**
     * 取消
     * @param e
     * @returns {*}
     */
    keyEsc(e) {
        const p = this.props.immutableProps.toJS()
        if (p.block != p.defaultBlock) {
            document.getElementById(p.defaultActive).focus()
            return {
                block: p.defaultBlock,
            }
        }
        let id;
        if (p.page != C.PAGE_QUERY && p.selectList && p.selectList.length > 0) {
            id = p.selectList[0]
            const pl = F.getDataByEid(id, p.passengerData)
            id = C.PREFIX[C.BLOCK_LIST] + pl[1].id
        } else {
            id = C.DEFAULT_INPUT
        }
        // if (p.page != C.DEFAULT_PAGE) {
        // document.getElementById(id).focus()
        return {
            page: C.PAGE_QUERY,
            pageName: C.DEFAULT_PAGENAME,
            defaultBlock: C.BLOCK_LIST,
            defaultActive: C.DEFAULT_INPUT,
            activeEid: id,
        }
        // }
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
        const p = this.props.immutableProps.toJS()
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid

        F.stopEvent(e)
        if (p.pageName != C.DEFAULT_PAGENAME) return null
        if (p.block == C.BLOCK_LIST) {
            // 旅客列表
            F.stopEvent(e)
            const selectList = p.selectList
            for (const [i, a] of selectList.entries()) {
                let dt = F.getDataByEid(a, p.passengerData)
                if (dt != null && C.PREFIX[C.BLOCK_LIST] + dt[1].id == activeEid) {
                    // 取消选中
                    selectList.splice(i, 1)
                    return {selectList}
                }
            }
            for (const pa of p.passengerData) {
                if (C.PREFIX[C.BLOCK_LIST] + pa.id == activeEid) {
                    selectList.push(C.PREFIX[C.BLOCK_SELECT] + pa.id)
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
        etn = etn || e.target.tagName;
        if (etn == 'BUTTON') {
            return null;
        }
        if (etn == 'INPUT' || etn == 'SELECT') {

            let b = this.keyMove(1, e, etn, e.target.type, e.keyCode);
            if (!!b) {
                this.context.updateData(b);
            }
            return null
        }
        // const p = this.props.immutableProps.toJS()
        // if (p.block == C.BLOCK_LIST) {
        //     // 值机
        //     F.stopEvent(e)
        //     return {
        //         page: C.PAGE_EDIT,
        //         block: C.BLOCK_FORM,
        //         defaultBlock: C.BLOCK_FORM,
        //         defaultActive: p.editList[0],
        //         activeEid: p.editList[0],
        //     }
        // }
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
        F.stopEvent(e)
        if ((kc == 37 || kc == 39) && etn == 'INPUT' && ett == 'text') {
            return
        }
        const validList = this.context.getValidList()
        // console.log(validList)
        if (validList.length < 2) {
            return
        }

        const c = this.context.immutableContext.toJS()
        let activeEid = c.activeEid
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
        // todo
        this.context.setActiveEid(activeEid)
    }

    flightStatusManage() {

        const updateData = this.context.updateData

        updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_FLIGHT_STATUS_MANAGE,
            block: C.BLOCK_LIST
        })
    }

    openFlightSeat() {
        const updateData = this.context.updateData

        updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_OPEN_FLIGHT_SEAT,
            block: C.BLOCK_LIST
        })
    }

    setFlightSeat() {
        const updateData = this.context.updateData

        updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_SET_FLIGHT_SEAT,
            block: C.BLOCK_LIST
        })
    }

    showFlightSeat(e) {
        const updateData = this.context.updateData

        updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_SHOW_FLIGHT_SEAT,
            block: C.BLOCK_LIST,
            activeEid: C.DEFAULT_INPUT
        })

        F.stopEvent(e)
    }

    showUnCheckin() {
        this.props.fetchPassengers('/NA')
    }

    showCheckin() {
        this.props.fetchPassengers('/AC')
    }

    showAll() {
        this.props.fetchPassengers('/AL')
    }

    showPassengerLog() {

        this.context.updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_LOGLIST,
            cmd: ''
        })
    }

    showShortCutHelp(e) {
        this.context.updateData({
            page: C.PAGE_EDIT,
            pageName: C.PAGE_SHORTCUTHELP,
            cmd: ''
        })
        F.stopEvent(e)
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }

    componentWillMount() {

        const p = this.props.immutableProps.toJS();
        const isCki = F.isCKI(p.loginMode)

        this.loadHandler('keyF1', (e) => e.keyCode == 112, this.keyF1.bind(this))
        this.loadHandler('keyEnter', (e) => e.keyCode == 13, this.keyEnter.bind(this))
        this.loadHandler('keyAltM', (e) => e.keyCode == 77 && e.altKey && isCki, this.flightStatusManage.bind(this))
        this.loadHandler('keyAltI', (e) => e.keyCode == 73 && e.altKey && isCki, this.openFlightSeat.bind(this))
        this.loadHandler('keyAltL', (e) => e.keyCode == 76 && e.altKey && isCki, this.setFlightSeat.bind(this))
        this.loadHandler('keyAltD', (e) => e.keyCode == 68 && e.altKey && isCki, this.showFlightSeat.bind(this))
        this.loadHandler('keyAlt2Cki', (e) => e.keyCode == 50 && e.altKey && isCki, this.props.cancelCheckin)
        this.loadHandler('keyAltQ', (e) => e.keyCode == 81 && e.altKey, this.showUnCheckin.bind(this))
        this.loadHandler('keyAltW', (e) => e.keyCode == 87 && e.altKey, this.showCheckin.bind(this))
        this.loadHandler('keyAltS', (e) => e.keyCode == 83 && e.altKey, this.showAll.bind(this))
        this.loadHandler('keyAlt0', (e) => e.keyCode == 48 && e.altKey && isCki, this.showPassengerLog.bind(this))
        this.loadHandler('keyF12', (e) => e.keyCode == 123, this.showShortCutHelp.bind(this))


        window.addEventListener('keydown', this.handleWinKeydown.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleWinKeydown)
    }
}
KeyNav.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
KeyNav.contextTypes = {
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
    updateData: React.PropTypes.func,
    getValidList: React.PropTypes.func,
    setActiveEid: React.PropTypes.func,
}
export default KeyNav