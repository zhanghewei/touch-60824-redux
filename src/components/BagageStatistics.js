import React from 'react'

export default class BagageStatistics extends React.Component {

    render() {

        const m = this.props.modal

        return <div id="baggageStatusPanel" className="panel panel-default">
            <div id="baggageDiv" className="panel-body panel_padding_s">
                <div id="baggage" data-table="table-responsive">
                    <table className="table table-hover table-striped table-condensed">
                        <thead>
                        <tr>
                            <th>分类</th>
                            <th>件数</th>
                            <th>重量</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>普通行李</td>
                            <td>{m.passNum}</td>
                            <td>{m.passWeight}</td>
                        </tr>
                        <tr>
                            <td>商务行李</td>
                            <td>{m.busNum}</td>
                            <td>{m.busWeight}</td>
                        </tr>
                        <tr>
                            <td>合计</td>
                            <td>{m.allBagNum}</td>
                            <td>{m.allBagWeight}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}