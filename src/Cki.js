import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable';
// import SelWrapper from "./components/SelWrapper"

const DEFAULT_INPUT = "mainInput"
const QUERY = 'pattern-query'
const SELECT = 'pattern-select'
const SELECT2 = 'pattern-select2'
const DEVICE = 'pattern-device'
const NET = 'pattern-net'
const OPERATOR = 'pattern-operator'
const BLANK = ''
const EDIT = 'pattern-edit'
const PREFIX = {
  [QUERY]: "qry_",
  [SELECT]: "sel_",
}
// const FIRST_QUERY_ITEM = {id: DEFAULT_INPUT, data: null}

// private methods
const showPassengers = Symbol('show-passengers')
const getDataByEid = Symbol('getDataById')
const getSelClass = Symbol('getSelClass')

function resizeWin() {
  var ch = document.documentElement.clientHeight;
  document.getElementById("mainContainer").style.height = (ch - 100) + "px"
}

function stop(e) {
  e.preventDefault()
  e.stopPropagation()
}

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

    this.d = {
      passengerData: [],
      pattern: QUERY,
      block: BLANK,
      queryList: [DEFAULT_INPUT],
      queryActive: DEFAULT_INPUT,
      selectList: [],
      selectActive: BLANK,
      operatorList: [],
      operatorActive: BLANK,
      editList: ['edt_in1', 'edt_in2', 'edt_chk1', 'edt_chk2',
                 'edt_chk3',
                 'edt_sel1',
                 'edt_in3', 'edt_btn1', DEFAULT_INPUT],
      editActive: BLANK,
    }
    this.state = {immutableData: Immutable.Map(this.d)}
  }

  /**
   * 触发状态变更
   * @param data
   */
  set data(data) {
    if (data == null) {
      return
    }
    const immutableData = this.state.immutableData.merge(data)
    this.d = immutableData.toJS()
    this.setState({immutableData})
  }

  fetchPassengers() {
    // console.log("call fetch pas")
    $.getJSON("passenger.json", (data => {
      // console.log(`fetch data ${data.length}`)
      this[showPassengers](data)
    }).bind(this))
  }

  addPassenger() {
    let passengerData = this.d.passengerData
    passengerData.push(
      {id: passengerData.reduce((maxId, ele) => Math.max(ele.id, maxId), -1) + 1, name: "abcd"})
    this[showPassengers](passengerData)
  }

  /**
   * 加载旅客列表
   * @param passengerData
   */
  [showPassengers](passengerData) {
    let queryList = [DEFAULT_INPUT]
    passengerData.map(ele => {
      queryList.push(PREFIX[QUERY] + ele.id)
    })
    this.data = {queryList, passengerData}
  }

  /**
   * 根据元素id获取对应数据
   *
   * todo 目前只用于选中区元素
   * @param eid
   * @returns {*}
   */
  [getDataByEid](eid) {
    let dataId = null
    if (eid == null) {
      return null
    }
    if (eid.startsWith(PREFIX[QUERY])) {
      dataId = eid.substring(PREFIX[QUERY].length, eid.length)
    }
    if (eid.startsWith(PREFIX[SELECT])) {
      dataId = eid.substring(PREFIX[SELECT].length, eid.length)
    }
    if (dataId == null) {
      return null
    }
    for (let [i, o] of this.d.passengerData.entries()) {
      if (o.id == dataId) {
        return [i, o]
      }
    }
    return null
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
    let b = null
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
    if (b != null) {
      this.data = b
    }
  }

  /**
   * 选择区1
   * @param e
   * @returns {*}
   */
  keyF1(e) {
    stop(e)
    if (this.d.block != BLANK || this.d.selectList.length < 1) {
      return null
    }
    document.getElementById(this.d.selectList[0]).focus()
    return {
      block: SELECT,
      selectActive: this.d.selectList[0],
    }
  }

  /**
   * 操作区
   * @param e
   * @returns {*}
   */
  keyF5(e) {
    stop(e)
    return {
      block: OPERATOR,
    }
  }

  /**
   * 取消
   * @param e
   * @returns {*}
   */
  keyEsc(e) {
    if (this.d.block != BLANK) {
      document.getElementById(DEFAULT_INPUT).focus()
      return {
        block: BLANK,
      }
    }
    if (this.d.pattern == EDIT) {
      document.getElementById(DEFAULT_INPUT).focus()
      return {
        pattern: QUERY,
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

    if (this.d.block == BLANK && this.d.pattern == QUERY) {
      stop(e)
      let selectList = this.d.selectList
      for (let [i, a] of selectList.entries()) {
        let dt = this[getDataByEid](a)
        if (dt != null && PREFIX[QUERY] + dt[1].id == this.d.queryActive) {
          // 取消选中
          selectList.splice(i, 1)
          return {selectList}
        }
      }
      for (let p of this.d.passengerData) {
        if (PREFIX[QUERY] + p.id == this.d.queryActive) {
          selectList.push(PREFIX[SELECT] + p.id)
          break
        }
      }
      return {selectList}
    }
    return null
  }

  handleClickSelect(e){
    stop(e)
    let selectList = this.d.selectList
    let selectActive = this.d.selectActive
    let activeIndex = [...selectList.entries()].find(ele => ele[1] == selectActive)[0]
    selectList.splice(activeIndex, 1)
    if (selectList.length < 1) {
      selectActive = null
    } else {
      activeIndex--
      if (activeIndex < 0) {
        activeIndex++
      }
      selectActive = selectList[activeIndex]
      document.getElementById(selectActive).focus()
    }
    this.data = {selectList, selectActive}
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
    if (this.d.block == BLANK && this.d.pattern == QUERY) {
      // 值机
      stop(e)
      return {
        pattern: EDIT,
        editActive: this.d.editList[0],
      }
    }
  }

  /**
   * 可选择的元素列表
   * @returns {Array}
   */
  get validList() {
    if (this.d.block == BLANK) {
      switch (this.d.pattern) {
        case QUERY:
          return this.d.queryList
        case EDIT:
          return this.d.editList
      }
    } else {
      switch (this.d.block) {
        case SELECT:
          return this.d.selectList
      }
    }
    return []
  }

  /**
   * 当前激活元素id
   * @returns {*}
   */
  get activeEid() {
    if (this.d.block == BLANK) {
      switch (this.d.pattern) {
        case QUERY:
          return this.d.queryActive
        case EDIT:
          return this.d.editActive
      }
    } else {
      switch (this.d.block) {
        case SELECT:
          return this.d.selectActive
      }
    }
    return null
  }

  set activeEid(active) {
    let tma = {}

    if (active.startsWith(PREFIX[SELECT])) {
      // 选择区
      tma.block = SELECT
      tma.selectActive = active
      tma.queryActive = BLANK
      tma.editActive = BLANK
    } else {
      tma.block = BLANK
      tma.selectActive = BLANK
      // 主页面
      switch (this.d.pattern) {
        case QUERY:
          tma.queryActive = active
          break
        case EDIT:
          tma.editActive = active
          break
      }
    }

    this.data = tma
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
    if (validList.length < 2) {
      return
    }
    stop(e)
    let activeEid = this.activeEid
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
    const a = OPERATOR == this.d.pattern ? ' f1-active' : ''
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-xs-1"><span className="glyphicon glyphicon-wrench">F5</span></div>
          <div className={"col-xs-11" + a}>
            <button className="btn btn-default btn-xs" onClick={ this.fetchPassengers.bind(this) }>
              <span className="glyphicon glyphicon-refresh">Alt-Q</span>
            </button>
            <b> </b>
            <button className="btn btn-default btn-xs" onClick={ this.addPassenger.bind(this) }>
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
    if (this.d.pattern != QUERY) {
      return null
    }

    const a = this.d.passengerData.map(
      it => {
        const b = PREFIX[QUERY] + it.id
        let c = "list-group-item dcs-list"
        if (this.d.queryActive == b) {
          c += " sel-active"
        }
        // 是否在选中区
        const isSelection = this.d.selectList.find(ele => ele == PREFIX[SELECT] + it.id) != null
        if (isSelection) {
          c += " active"
        }
        return (
          <li id={b} key={b} onFocus={this.handleFocus.bind(this)}
              tabIndex="-1"
              className={c}>id: {b},
            name: {it.name}</li>
        )
      }
    )
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-xs-12">
            <ul className="list-group">{a}</ul>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 选中区1
   * @returns {*}
   */
  renderSelect() {
    if (this.d.selectList.length < 1) {
      return null
    }
    const a = SELECT == this.d.pattern ? ' f1-active' : ''
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-xs-1"><span className="glyphicon glyphicon-user"></span>F1</div>
          <div className={"col-xs-11" + a}>
            {this.d.selectList.map(
              it => {
                const b = "btn btn-xs btn-" + (this.d.selectActive == it ? 'danger' : 'default')
                const dt = this[getDataByEid](it)
                return (
                  <span key={it}>
                    <button id={it} className={b} onFocus={this.handleFocus.bind(this)} onClick={this.handleClickSelect.bind(this)}>
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
   * 可选择元素的class
   * @param id
   * @param elType
   * @returns {string}
   */
  [getSelClass](id, elType) {
    let c = 'form-control'
    if ('checkbox' == elType) {
      c = 'checkbox-inline'
    }
    if ('button' == elType) {
      c = 'btn btn-default'
    }
    if (this.activeEid == id) {
      c += " sel-active"
    }
    return c
  }

  /**
   * 编辑界面
   * @returns {*}
   */
  renderEdit() {
    if (this.d.pattern != EDIT) {
      return null
    }
    return (
      <div>
        <br/>
        <div className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-offset-2">
              <p>
                值机
              </p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="edt_in1" className="col-xs-2 control-label">排</label>
            <div className="col-xs-4">
              <input id="edt_in1" className={this[getSelClass]('edt_in1')}
                     onFocus={this.handleFocus.bind(this)}/>
            </div>
            <label htmlFor="edt_in2" className="col-xs-2 control-label">列</label>
            <div className="col-xs-4">
              <input id="edt_in2" className={this[getSelClass]('edt_in2')}
                     onFocus={this.handleFocus.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="edt_chk1" className="col-xs-2 control-label">checkbox</label>
            <div className="col-xs-4">
              <label className={this[getSelClass]('edt_chk1', 'checkbox')}>
                <input type="checkbox" id="edt_chk1" value="option1"
                       onFocus={this.handleFocus.bind(this)}/> 1
              </label>
              <label className={this[getSelClass]('edt_chk2', 'checkbox')}>
                <input type="checkbox" id="edt_chk2" value="option2"
                       onFocus={this.handleFocus.bind(this)}/> 2
              </label>
              <label className={this[getSelClass]('edt_chk3', 'checkbox')}>
                <input type="checkbox" id="edt_chk3" value="option3"
                       onFocus={this.handleFocus.bind(this)}/> 3
              </label>
            </div>
            <label htmlFor="edt_sel1" className="col-xs-2 control-label">select</label>
            <div className="col-xs-4">
              <select id="edt_sel1" className={this[getSelClass]('edt_sel1')}
                      onFocus={this.handleFocus.bind(this)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="edt_in3" className="col-xs-2 control-label">座位</label>
            <div className="col-xs-10">
              <input id="edt_in3" className={this[getSelClass]('edt_in3')}
                     onFocus={this.handleFocus.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-offset-2">
              <button id="edt_btn1" className={this[getSelClass]('edt_btn1', 'button')}
                      onFocus={this.handleFocus.bind(this)}>确认
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * 触发焦点
   * @param e
   */
  handleFocus(e) {
    stop(e)
    let a = this.activeEid
    // console.log(`${a} ${e.target.id} ${e.target}`)
    let id = e.target.id
    // console.log(`trigger focus ${id}`)
    // avoid dead loop
    if (id == null || id == a) {
      return
    }
    this.activeEid = id
  }

  componentWillMount() {
    window.addEventListener('resize', resizeWin)
    window.addEventListener('keydown', this.handleWinKeydown.bind(this))
  }

  componentDidMount() {
    this.fetchPassengers()
    resizeWin()
    document.getElementById(this.activeEid).focus()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeWin)
    window.removeEventListener('keydown', this.handleWinKeydown)
  }

  render() {
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
                  <input id="mainInput" key="mainInput" className={this[getSelClass](DEFAULT_INPUT)}
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-10">
                <form className="navbar-form">
                  <span>设备状态 </span>
                  <span className="label label-success">登机牌打印机</span>
                  <b> </b>
                  <span className="label label-success">行李条打印机</span>
                  <b> </b>
                  <span className="label label-success">身份证阅读器</span>
                  <b> </b>
                  <span className="label label-success">登机牌扫描枪</span>
                </form>
              </div>
              <div className="col-xs-2 text-right">
                <form className="navbar-form">
                  <div className="btn-group">
                    <button className="btn btn-success">在线</button>
                    <button className="btn btn-default">离线</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Cki





