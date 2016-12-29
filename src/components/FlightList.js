import React from 'react'
import * as C from '../Constants'
import * as F from '../Functions'
import FlightInfo from './FlightInfo'

export default class FlightList extends React.Component {
    constructor() {

        super()

        this.state = {
            keys: [],
            map: new Map(),
            currentFlight: null
        }
    }

    componentWillMount() {

        this.request = this.context.request('queryFlight', 'list', function (list) {

            if (list && list instanceof Array) {

                list = F.upperCase(list);
                const m = new Map()

                for (let k of list) {
                    m.set(k.uui, null)
                }
                this.setState(Object.assign({}, this.state, {
                    keys: list,
                    map: m
                }))
            }
        }.bind(this))
    }

    componentWillUnmount() {

        if (this.request) {
            this.request.abort()
        }
    }

    updateMainList() {
        const l = [],
            len = this.state.keys.length
        for (let i = 0; i < len; i++) {
            l.push(C.PREFIX[C.BLOCK_LIST] + i)
        }

        this.context.setMainList(l)
    }

    setFlight(f) {

        this.setState(Object.assign({}, this.state, {
            currentFlight: f
        }))
    }

    selectOrNot(key, e) {


        const checked = e.target.checked,
            cb = $(e.target)

        if (checked) {
            const info = this.state.map.get(key)
            cb.parents('tr').siblings().find(':checkbox').prop('checked', false)

            if (info) {
                this.setFlight(info)
            } else {
                this.context.request('queryFlight', 'detail', function (data) {

                    if (data) {
                        data = F.upperCase(data)

                        this.state.map.set(key, data)
                        this.setFlight(data)
                    }
                }.bind(this), {uui: key})
            }
        } else {
            this.setFlight(null)
        }
    }

    render() {

        const c = this.context.immutableContext.toJS()
        const keys = this.state.map.keys()
        this.updateMainList()

        return <div>
            <div className="row">
                <div className="col-xs-12">
                    <div id="flightListPanel" className="panel panel-default ">
                        <div className="panel-body">
                            <div id="flightTableWrapperDiv" style={{overflowY: 'auto', overflowX: 'hidden'}}
                                 className="table-responsive form-inline">
                                <table id="flightsTable" className="table table-hover table-condensed dcs-table">
                                    <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>航班号</th>
                                        <th>航班日期</th>
                                        <th>起点站</th>
                                        <th>终点站</th>
                                        <th>起飞站</th>
                                        <th>到达站</th>
                                        <th>预计起飞</th>
                                        <th>预计到达</th>
                                        <th>登机口</th>
                                        <th>机型</th>
                                        <th>航班状态</th>
                                    </tr>
                                    </thead>
                                    <tbody id="flightListTbody">
                                    {
                                        this.state.keys.map((f, i)=> {

                                            const id = C.PREFIX[C.BLOCK_LIST] + i
                                            return <tr key={id + '-key-tr'}
                                                       className={c.activeEid == id ? 'sel-active' : ''}>
                                                <td className="dcs-td-checkbox">
                                                    <div className="checkbox checkbox-success checkbox-circle">
                                                        <input id={id} key={id + '-key'} type="checkbox"
                                                               className="styled _cb"
                                                               value=""
                                                               onChange={this.selectOrNot.bind(this, f.uui)}/><label></label>
                                                    </div>
                                                </td>
                                                <td>{f.fn}</td>
                                                <td>{f.fd}</td>
                                                <td>{f.ss}</td>
                                                <td>{f.ds}</td>
                                                <td>{f.tos}</td>
                                                <td>{f.ars}</td>
                                                <td>{f.eto}</td>
                                                <td>{f.eta}</td>
                                                <td>{f.gat}</td>
                                                <td>{f.ta}</td>
                                                <td>{f.fs}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    {this.state.currentFlight ? <FlightInfo flight={this.state.currentFlight}/> : ''}
                </div>
            </div>
        </div>
    }
}

FlightList.contextTypes = {
    immutableContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
    request: React.PropTypes.func
}