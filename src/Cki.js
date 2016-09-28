import React, {Component, PropTypes} from 'react'
import SelWrapper from "./components/SelWrapper"

// function focusSel(el) {
//   let id = el.id
//   if (id == this.props.activeSel) {
//     return
//   } else if (id != null) {
//
//   }
//
// }

function resizeWin() {
  var ch = document.documentElement.clientHeight;
  document.getElementById("mainContainer").style.height = (ch - 100) + "px";
}

class Cki extends Component {
  constructor() {
    super()
    this.state = {
      ids: [{id: "mainInput", data: null}],
      activePage: "main",
      activeSel: "mainInput",
      activeF1: "",
      passengers: [],
      f1s: [],
      // activeIndex: 0,
    }

  }

  fetchPassengers() {
    // console.log(11)
    $.getJSON("passenger.json", (data => {
      let passengers = data
      let ids = [this.state.ids[0]]
      passengers.forEach((ele) => {
        ids.push({id: "pas_" + ele.id, data: ele})
      })
      const a = {
        ...this.state,
        ids,
        passengers,
        // activeIndex,
      }
      this.setState(a)
      // console.log(`ids length is ${ids}`)
      // console.log(`passengers length is ${passengers.length}`)

    }).bind(this))
  }

  addPassenger() {
    let passengers = this.state.passengers
    passengers.push(
      {id: passengers.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1, name: "abcd"})
    let ids = [this.state.ids[0]]
    passengers.forEach((ele) => {
      ids.push({id: "pas_" + ele.id, data: ele})
    })
    const a = {
      ...this.state,
      ids,
      passengers,
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
  handleWinKeydown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("tag " + e.target.tagName)
    const kc = e.keyCode
    const ckc = e.ctrlKey
    const akc = e.altKey
    const skc = e.shiftKey
    console.log(`Win key code ${kc}, alt ${akc}, shift ${skc}, ctrl ${ckc}`)
    if (kc == 112) {
      // f1
      const a = {
        ...this.state,
        activePage: "f1",
      }
      this.setState(a)
      return
    }

    if (kc == 27) {
      // esc
      const a = {
        ...this.state,
        activePage: "main",
      }
      this.setState(a)
      return
    }

    if (kc == 13) {
      // enter
      if (this.state.activePage == "main" && e.target.tagName != "INPUT") {
        let f1s = this.state.f1s
        for (let p of this.state.passengers.values()) {
          if ("pas_" + p.id == this.state.activeSel) {
            f1s.push({id: "f1_" + p.id, data: p})
            break
          }
        }
        const a = {
          ...this.state,
          f1s,
        }
        this.setState(a)
      }
      return
    }

    let ids = this.state.activePage == "main" ? this.state.ids : this.state.f1s
    let active = this.state.activePage == "main" ? this.state.activeSel : this.state.activeF1
    let activeIndex = 0
    for (let idx of ids.keys()) {
      if (ids[idx].id == active) {
        activeIndex = idx
        break
      }
    }
    // console.log(`active sel is ${this.props.activeSel}`)
    // console.log(`active index is ${activeIndex}`)
    if ((kc == 9 && skc) || kc == 37 || kc == 38) {
      // 上一个元素
      activeIndex--
    } else if ((kc == 9 && !skc) || kc == 39 || kc == 40) {
      // 下一个元素
      activeIndex++
    } else {
      return
    }
    if (activeIndex >= ids.length) {
      activeIndex -= ids.length
    }
    if (activeIndex < 0) {
      activeIndex += ids.length
    }
    const a = this.state.activePage == "main" ? {
      ...this.state,
      activeSel: ids[activeIndex].id,
    } : {
      ...this.state,
      activeF1: ids[activeIndex].id,
    }
    this.setState(a)

    document.getElementById(this.state.activeSel).focus()
    // console.log(`focus ${this.state.activeSel}`)
    // console.log(`active index is ${activeIndex}`)
    // this.props.doSel(this.ids[activeIndex])
  }

  handleFocus(e) {
    // console.log(`trigger focus ${this.state.activeSel}`)
    e.preventDefault()
    e.stopPropagation()
    let id = e.target.id
    // avoid dead loop
    if (id == null || id == this.state.activeSel) {
      return
    }
    const a = {
      ...this.state,
      activeSel: id,
    }
    this.setState(a)
  }

  componentWillMount() {
    window.addEventListener('resize', resizeWin)
    window.addEventListener('keydown', this.handleWinKeydown.bind(this))
  }

  componentDidMount() {
    this.fetchPassengers()
    resizeWin()
    document.getElementById(this.state.activeSel).focus()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeWin)
    window.removeEventListener('keydown', this.handleWinKeydown)
  }

  render() {
    let mainInputCls = "form-control"
    if ("mainInput" == this.state.activeSel) {
      mainInputCls += " sel-active"
    }

    let f1BackCls = "row"
    if ("f1" == this.state.activePage) {
      f1BackCls += " f1-active"
    }

    const r =
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
          <div className={f1BackCls}>
            <div className="col-xs-1">选中区(F1)</div>
            <div className="col-xs-11">
                {this.state.f1s.map(
                  it => {
                    const idTxt = it.id
                    let itClass = "label"
                    if (this.state.activeF1 == idTxt) {
                      itClass += " label-success"
                    } else {
                      itClass += " label-default"
                    }
                    const r =
                      <span key={idTxt}>
                        <span id={idTxt} className={itClass}>{it.data.name}</span>
                        <b> </b>
                      </span>
                    return r
                  }
                )}
            </div>
          </div>
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
                {this.state.passengers.map(
                  it => {
                    const idTxt = "pas_" + it.id
                    let itClass = "list-group-item"
                    let sta = this.state.activeSel == idTxt
                    if (sta) {
                      itClass += " active"
                    }
                    const r =
                      <SelWrapper sta={sta} key={idTxt + "Wr"}>
                        <li id={idTxt} key={idTxt} onFocus={this.handleFocus.bind(this)}
                            tabIndex="-1"
                            className={itClass}>id: {idTxt},
                          name: {it.name}</li>
                      </SelWrapper>
                    return r
                  }
                )}
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
    return r
  }
}

export default Cki





