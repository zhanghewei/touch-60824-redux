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
  document.getElementById("mainContainer").style.height = (ch - 100) + "px";
}

/**
 * 操作模式
 *
 * - 查询模式
 * - 选择模式
 * - 表单模式
 */
@pureRender
class Cki extends React.Component {
  constructor() {
    super()

    this.d = {
      passengerData: [],
      pagePattern: QUERY,
      selectPattern: BLANK,
      queryList: [DEFAULT_INPUT],
      queryActive: DEFAULT_INPUT,
      selectList: [],
      selectActive: BLANK,
      editList: ['edt_in1', 'edt_in2', 'edt_chk1', 'edt_chk2',
                 'edt_chk3',
                 'edt_sel1',
                 'edt_in3', 'edt_btn1', DEFAULT_INPUT],
      editActive: BLANK,
    }
    this.state = {immutableData: Immutable.Map(this.d)}
  }

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

  [showPassengers](passengerData) {
    let queryList = [DEFAULT_INPUT]
    passengerData.map(ele => {
      queryList.push(PREFIX[QUERY] + ele.id)
    })
    this.data = {queryList, passengerData}
  }

  [getDataByEid](eid) {
    let rid = null
    if (eid == null) {
      return null
    }
    if (eid.startsWith(PREFIX[QUERY])) {
      rid = eid.substring(PREFIX[QUERY].length, eid.length)
    }
    if (eid.startsWith(PREFIX[SELECT])) {
      rid = eid.substring(PREFIX[SELECT].length, eid.length)
    }
    if (rid == null) {
      return null
    }
    for (let [i, o] of this.d.passengerData.entries()) {
      if (o.id == rid) {
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
    // console.log("tag " + e.target.tagName)
    const kc = e.keyCode
    const ckc = e.ctrlKey
    const akc = e.altKey
    const skc = e.shiftKey
    // console.log(`Win key code ${kc}, alt ${akc}, shift ${skc}, ctrl ${ckc}`)
    let b = null
    if (kc == 112) {
      // f1
      b = this.keyF1(e)
    } else if (kc == 27) {
      // esc
      b = this.keyEsc(e)
    } else if (kc == 32 && !skc && !akc && !ckc) {
      // space
      b = this.keySpace(e)
    } else if (kc == 13 && !skc && !akc && !ckc) {
      // enter
      b = this.keyEnter(e)
    } else if ((kc == 9 && skc && !akc && !ckc) || kc == 37 || kc == 38) {
      // tab arrow-left arrow-up
      b = this.keyMove(e, -1)
    } else if ((kc == 9 && !skc && !akc && !ckc) || kc == 39 || kc == 40) {
      // shift+tab arrow-right arrow-down
      b = this.keyMove(e, 1)
    }
    if (b != null) {
      this.data = b
    }
  }

  keyF1(e) {
    if (this.d.selectPattern != BLANK || this.d.selectList.length < 1) {
      return null
    }
    document.getElementById(this.d.selectList[0]).focus()
    return {
      selectPattern: SELECT,
      selectActive: this.d.selectList[0],
    }
  }

  keyEsc(e) {
    if (this.d.selectPattern != BLANK) {
      document.getElementById(DEFAULT_INPUT).focus()
      return {
        selectPattern: BLANK,
      }
    }
    if (this.d.pagePattern == EDIT) {
      document.getElementById(DEFAULT_INPUT).focus()
      return {
        pagePattern: QUERY,
      }
    }
  }

  keySpace(e) {
    if (this.d.selectPattern == BLANK && this.d.pagePattern == QUERY && e.target.tagName
                                                                        != "INPUT") {
      e.preventDefault()
      e.stopPropagation()
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

    if (this.d.selectPattern != BLANK) {
      e.preventDefault()
      e.stopPropagation()
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
      return {selectList, selectActive}
    }
    return null
  }

  keyEnter(e) {
    // todo mainInput查询
    // 值机
    if (this.d.selectPattern == BLANK && this.d.pagePattern == QUERY) {
      e.preventDefault()
      e.stopPropagation()
      return {
        pagePattern: EDIT,
        editActive: this.d.editList[0],
      }
    }
  }

  get activeList() {
    if (this.d.selectPattern == BLANK) {
      switch (this.d.pagePattern) {
        case QUERY:
          return this.d.queryList
        case EDIT:
          return this.d.editList
      }
    } else {
      switch (this.d.selectPattern) {
        case SELECT:
          return this.d.selectList
      }
    }
    return []
  }

  get activeEid() {
    if (this.d.selectPattern == BLANK) {
      switch (this.d.pagePattern) {
        case QUERY:
          return this.d.queryActive
        case EDIT:
          return this.d.editActive
      }
    } else {
      switch (this.d.selectPattern) {
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
      tma.selectPattern = SELECT
      tma.selectActive = active
      tma.queryActive = BLANK
      tma.editActive = BLANK
    } else {
      tma.selectPattern = BLANK
      tma.selectActive = BLANK
      // 主页面
      switch (this.d.pagePattern) {
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

  keyMove(e, step) {
    let selectList = this.activeList
    // console.log(selectList)
    if (selectList.length < 2) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    let activeEid = this.activeEid
    let activeIndex = [...selectList.entries()].find(ele => ele[1] == activeEid)[0]

    activeIndex += step
    if (activeIndex < 0) {
      activeIndex += selectList.length
    }
    if (activeIndex >= selectList.length) {
      activeIndex -= selectList.length
    }

    activeEid = selectList[activeIndex]
    // console.log(activeEid)
    this.activeEid = activeEid
    document.getElementById(activeEid).focus()
  }

  renderQuery() {
    if (this.d.pagePattern != QUERY) {
      return null
    }

    const a = this.d.passengerData.map(
      it => {
        const idTxt = PREFIX[QUERY] + it.id
        let itClass = "list-group-item dcs-list"
        if (this.d.queryActive == idTxt) {
          itClass += " sel-active"
        }
        let active = this.d.selectList.find(ele => ele == PREFIX[SELECT] + it.id) != null
        if (active) {
          itClass += " active"
        }
        return (
          <li id={idTxt} key={idTxt} onFocus={this.handleFocus.bind(this)}
              tabIndex="-1"
              className={itClass}>id: {idTxt},
            name: {it.name}</li>
        )
      }
    )
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-xs-12">
            <p>
              <button className="btn btn-default" onClick={ this.fetchPassengers.bind(this) }>
                refresh
              </button>
              <b> </b>
              <button className="btn btn-default" onClick={ this.addPassenger.bind(this) }>add
              </button>
            </p>
            <ul className="list-group">{a}</ul>
          </div>
        </div>
      </div>
    )
  }

  renderSelection() {
    if (this.d.selectList.length < 1) {
      return null
    }

    let f1BackCls = ""
    if (SELECT == this.d.pagePattern) {
      f1BackCls += " f1-active"
    }

    return (
      <div className="row">
        <div className="col-xs-1">选中区(F1)</div>
        <div className={"col-xs-11" + f1BackCls}>
          {this.d.selectList.map(
            it => {
              const idTxt = it
              let itClass = "label"
              if (this.d.selectActive == idTxt) {
                itClass += " label-danger"
              } else {
                itClass += " label-info"
              }
              const dt = this[getDataByEid](it)
              return (
                <span key={idTxt}>
                  <span id={idTxt} className={itClass} onFocus={this.handleFocus.bind(this)}
                        tabIndex="-1">{dt[1].name}</span>
                  <b> </b>
                </span>
              )
            }
          )}
        </div>
      </div>
    )
  }

  [getSelClass](id, tag) {
    let c = 'form-control'
    if ('checkbox' == tag) {
      c = 'checkbox-inline'
    }
    if ('button' == tag) {
      c = 'btn btn-default'
    }
    if (this.activeEid == id) {
      c += " sel-active"
    }
    return c
  }

  renderEdit() {
    if (this.d.pagePattern != EDIT) {
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
              <input id="edt_in1" className={this[getSelClass]('edt_in1')} onFocus={this.handleFocus.bind(this)} />
            </div>
            <label htmlFor="edt_in2" className="col-xs-2 control-label">列</label>
            <div className="col-xs-4">
              <input id="edt_in2" className={this[getSelClass]('edt_in2')} onFocus={this.handleFocus.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="edt_chk1" className="col-xs-2 control-label">checkbox</label>
            <div className="col-xs-4">
              <label className={this[getSelClass]('edt_chk1', 'checkbox')}>
                <input type="checkbox" id="edt_chk1" value="option1" onFocus={this.handleFocus.bind(this)} /> 1
              </label>
              <label className={this[getSelClass]('edt_chk2', 'checkbox')}>
                <input type="checkbox" id="edt_chk2" value="option2" onFocus={this.handleFocus.bind(this)} /> 2
              </label>
              <label className={this[getSelClass]('edt_chk3', 'checkbox')}>
                <input type="checkbox" id="edt_chk3" value="option3" onFocus={this.handleFocus.bind(this)} /> 3
              </label>
            </div>
            <label htmlFor="edt_sel1" className="col-xs-2 control-label">select</label>
            <div className="col-xs-4">
              <select id="edt_sel1" className={this[getSelClass]('edt_sel1')} onFocus={this.handleFocus.bind(this)} >
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
              <input id="edt_in3" className={this[getSelClass]('edt_in3')} onFocus={this.handleFocus.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-offset-2">
              <button id="edt_btn1" className={this[getSelClass]('edt_btn1', 'button')} onFocus={this.handleFocus.bind(this)} >确认</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleFocus(e) {
    e.preventDefault()
    e.stopPropagation()
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
    // let mainInputCls = "form-control"
    // if ("mainInput" == this.d.queryActive) {
    //   mainInputCls += " sel-active"
    // }
    return (
      <div>
        <nav className="navbar navbar-default" style={{marginBottom: 0}}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-1"></div>
              <div className="col-xs-10">
                <div className="input-group" style={{paddingTop: ".5em"}}>
                  <input id="mainInput" key="mainInput" className={this[getSelClass](DEFAULT_INPUT)}
                         onFocus={this.handleFocus.bind(this)} tabIndex="-1"/>
                  <span className="input-group-btn">
                  <button className="btn btn-default" tabIndex="-1">
                    <span className="glyphicon glyphicon-play">执行(Enter)</span>
                  </button>
                </span>
                </div>
              </div>
              <div className="col-xs-1"></div>
            </div>
          </div>
        </nav>
        <div id="mainContainer" className="container-fluid">
          {this.renderSelection()}
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





