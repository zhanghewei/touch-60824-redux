import React from 'react'
import * as C from '../Constants'
import * as F from '../Functions'

export default class FlightList extends React.Component {
    constructor() {

        super()

        this.state = {
            list: []
        }
    }

    componentWillMount() {

        this.request = this.context.request('queryFlight', 'list', function (list) {

            this.setState(Object.assign({}, this.state, {
                list: list
            }))
        }.bind(this))
    }

    componentWillUnmount() {

        if (this.request) {
            this.request.abort()
        }
    }

    render() {

        this.context.setMainList([])

        const list = F.upperCase(this.state.list)

        return <div id="flightListPanel" className="panel panel-default ">
            <div className="panel-body">
                <div id="flightTableWrapperDiv" style={{overflow: 'auto'}} className="table-responsive form-inline">
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
                            this.state.list.map(f=> {
                                const id = C.PREFIX[C.BLOCK_LIST] + f.id

                                return <tr id={id}>
                                    <td className="dcs-td-checkbox">
                                        <div className="checkbox checkbox-success checkbox-circle">
                                            <input type="checkbox" className="styled dcs-selectable _cb"
                                                   value="CE9EA40A26894CC18A87680AE8265AEC"/><label></label></div>
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
    }
}

FlightList.contextTypes = {
    setMainList: React.PropTypes.func,
    request: React.PropTypes.func
}