/**
 * Created by 005689 on 2016/12/27.
 */
import React from 'react'

export default class PassengerSexStatistics extends React.Component {
    constructor() {
        super()
    }

    render() {

        const s = this.props.modal

        return <div id="passengerStatusChightDiv" className=" passenger-status-wrapper">
            <div id="passengerStatusPanel" className="panel panel-default">
                <div id="passengerStatusDiv" className="panel-body panel_padding_s">
                    <div id="passengerStatus" className="table-responsive">
                        <table className="table table-hover table-striped table-condensed">
                            <thead>
                            <tr>
                                <th>分类</th>
                                <th>值机</th>
                                <th>登机</th>
                                <th>拉下</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>成人</td>
                                <td>{s.m_cin}</td>
                                <td>{s.m_bn}</td>
                                <td>{s.m_leave}</td>
                            </tr>
                            <tr>
                                <td>儿童</td>
                                <td>{s.c_cin}</td>
                                <td>{s.c_bn}</td>
                                <td>{s.c_leave}</td>
                            </tr>
                            <tr>
                                <td>婴儿</td>
                                <td>{s.i_cin}</td>
                                <td>{s.i_bn}</td>
                                <td>{s.i_leave}</td>
                            </tr>
                            <tr>
                                <td>合计</td>
                                <td>{s.total_cin}</td>
                                <td>{s.total_bn}</td>
                                <td>{s.total_leave}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }
}