import React from 'react'
// import SelWrapper from "./components/SelWrapper"

const DEFAULT_INPUT = "mainInput"
const QUERY = 'pattern-query'
const SELECT = 'pattern-select'
// const EDIT = 'pattern-edit'
// const PATTERNS = {
//   [QUERY]: "query",
//   [SELECT]: "select",
//   [EDIT]: "edit",
// }
const FIRST_QUERY_ITEM = {id: DEFAULT_INPUT, data: null}

// private methods
const showPassengers = Symbol('show-passengers')

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
class Cki extends React.Component {
  constructor() {
    super()

    this.state = {
      passengerData: [],
      pagePattern: QUERY,
      queryList: [FIRST_QUERY_ITEM],
      queryActive: DEFAULT_INPUT,
      selectList: [],
      selectActive: null,
    }

  }

  fetchPassengers() {
    $.getJSON("passenger.json", (data => {
      this[showPassengers](data)
    }).bind(this))
  }

  addPassenger() {
    let passengerData = this.state.passengerData
    passengerData.push(
      {id: passengerData.reduce((maxId, ele) => Math.max(ele.id, maxId), -1) + 1, name: "abcd"})
    this[showPassengers](passengerData)
  }

  [showPassengers](passengerData) {
    let queryList = [FIRST_QUERY_ITEM]
    passengerData.map(ele => {
      queryList.push({id: "pas_" + ele.id, data: ele})
    })
    const a = {
      ...this.state,
      queryList,
      passengerData,
    }
    this.setState(a)
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
    e.preventDefault()
    e.stopPropagation()
    // console.log("tag " + e.target.tagName)
    const kc = e.keyCode
    // const ckc = e.ctrlKey
    // const akc = e.altKey
    const skc = e.shiftKey
    // console.log(`Win key code ${kc}, alt ${akc}, shift ${skc}, ctrl ${ckc}`)
    let b = null
    if (kc == 112) {
      // f1
      b = this.keyF1()
    } else if (kc == 27) {
      // esc
      b = this.keyEsc()
    } else if (kc == 32) {
      // space
      b = this.keySpace(e)
    } else if (kc == 13) {
      // enter
      b = this.keyEnter()
    } else if ((kc == 9 && skc) || kc == 37 || kc == 38) {
      // tab arrow-left arrow-up
      b = this.keyMove(-1)
    } else if ((kc == 9 && !skc) || kc == 39 || kc == 40) {
      // shift+tab arrow-right arrow-down
      b = this.keyMove(1)
    }
    if (b != null) {
      // console.log(b)
      const a = {
        ...this.state,
        ...b,
      }
      this.setState(a)
    }
  }

  keyF1() {
    if (this.state.pagePattern == SELECT || this.state.selectList.length < 1) {
      return null
    }
    document.getElementById(this.state.selectList[0].id).focus()
    return {
      pagePattern: SELECT,
      selectActive: this.state.selectList[0].id,
    }
  }

  keyEsc() {
    if (this.state.pagePattern == QUERY) {
      return null
    }
    document.getElementById(DEFAULT_INPUT).focus()
    return {
      pagePattern: QUERY,
    }
  }

  keySpace(e) {
    if (this.state.pagePattern == QUERY && e.target.tagName != "INPUT") {
      let selectList = this.state.selectList
      for(let [i, a] of selectList.entries()){
        if("pas_" + a.data.id == this.state.queryActive){
          // 取消选中
          selectList.splice(i, 1)
          return {selectList}
        }
      }
      for (let p of this.state.passengerData) {
        if ("pas_" + p.id == this.state.queryActive) {
          selectList.push({id: "f1_" + p.id, data: p})
          break
        }
      }
      return {selectList}
    }

    if (this.state.pagePattern == SELECT) {
      let selectList = this.state.selectList
      let selectActive = this.state.selectActive
      let activeIndex = [...selectList.entries()].find(ele => ele[1].id == selectActive)[0]
      selectList.splice(activeIndex, 1)
      if (selectList.length < 1) {
        selectActive = null
      } else {
        activeIndex--
        if (activeIndex < 0) {
          activeIndex++
        }
        selectActive = selectList[activeIndex].id
        document.getElementById(selectActive).focus()
      }
      return {selectList, selectActive}
    }
    return null
  }

  keyEnter() {
    return null
  }

  get selectList() {
    switch (this.state.pagePattern) {
      case QUERY:
        return this.state.queryList
      case SELECT:
        return this.state.selectList
    }
    return []
  }

  get activeEid() {
    switch (this.state.pagePattern) {
      case QUERY:
        return this.state.queryActive
      case SELECT:
        return this.state.selectActive
    }
    return null
  }

  set activeEid(active) {
    let tma = {}
    // todo
    tma.pagePattern = active.startsWith("f1_") ? SELECT : QUERY

    switch (tma.pagePattern) {
      case QUERY:
        tma.queryActive = active
        break
      case SELECT:
        tma.selectActive = active
        break
    }
    const tmb = {
      ...this.state,
      ...tma,
    }
    this.setState(tmb)
  }

  keyMove(step) {
    let selectList = this.selectList
    // console.log(selectList)
    if (selectList.length < 2) {
      return
    }
    let activeEid = this.activeEid
    let activeIndex = [...selectList.entries()].find(ele => ele[1].id == activeEid)[0]

    activeIndex += step
    if (activeIndex < 0) {
      activeIndex += selectList.length
    }
    if (activeIndex >= selectList.length) {
      activeIndex -= selectList.length
    }

    activeEid = selectList[activeIndex].id
    document.getElementById(activeEid).focus()
    this.activeEid = activeEid
  }

  renderPassengers() {
    return this.state.passengerData.map(
      it => {
        const idTxt = 'pas_' + it.id
        let itClass = "list-group-item dcs-list"
        if (this.state.queryActive == idTxt) {
          itClass += " sel-active"
        }
        let active = this.state.selectList.find(ele => ele.data.id == it.id) != null
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
  }

  renderPassengerSelection() {
    if (this.state.selectList.length < 1) {
      return null
    }

    let f1BackCls = ""
    if (SELECT == this.state.pagePattern) {
      f1BackCls += " f1-active"
    }

    return (
      <div className="row">
        <div className="col-xs-1">选中区(F1)</div>
        <div className={"col-xs-11" + f1BackCls}>
          {this.state.selectList.map(
            it => {
              const idTxt = it.id
              let itClass = "label"
              if (this.state.selectActive == idTxt) {
                itClass += " label-danger"
              } else {
                itClass += " label-info"
              }
              return (
                <span key={idTxt}>
                  <span id={idTxt} className={itClass} onFocus={this.handleFocus.bind(this)}
                        tabIndex="-1">{it.data.name}</span>
                  <b> </b>
                </span>
              )
            }
          )}
        </div>
      </div>
    )
  }

  handleFocus(e) {
    e.preventDefault()
    e.stopPropagation()
    let id = e.target.id
    console.log(`trigger focus ${id}`)
    // avoid dead loop
    if (id == null || id == this.activeEid) {
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
    let mainInputCls = "form-control"
    if ("mainInput" == this.state.queryActive) {
      mainInputCls += " sel-active"
    }
    return (
      <div>
        <nav className="navbar navbar-default" style={{marginBottom: 0}}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-1"></div>
              <div className="col-xs-10">
                <div className="input-group" style={{paddingTop: ".5em"}}>
                  <input id="mainInput" key="mainInput" className={mainInputCls}
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
          {this.renderPassengerSelection()}
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
              <ul className="list-group">
                {this.renderPassengers()}
              </ul>
            </div>
          </div>
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





