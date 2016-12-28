import React from 'react'

export default class SaleStatistics extends React.Component {

    render() {

        const m = this.props.modal

        return <div id="flightTransitPanel" className="panel panel-default">
            <div id="flightTransitDiv" className="panel-body panel_padding_s">
                <div id="flightTransit" className="table-responsive">
                    <table className="table table-hover table-striped table-condensed">
                        <thead>
                        <tr>
                            <th>分类</th>
                            <th>成人</th>
                            <th>儿童</th>
                            <th>婴儿</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>销售合计</td>
                            <td>{m.m_sale}</td>
                            <td>{m.c_sale}</td>
                            <td>{m.i_sale}</td>
                        </tr>
                        <tr>
                            <td>候补合计</td>
                            <td>{m.m_gs}</td>
                            <td>{m.c_gs}</td>
                            <td>{m.i_gs}</td>
                        </tr>
                        <tr>
                            <td>值机合计</td>
                            <td>{m.m_cin}</td>
                            <td>{m.c_cin}</td>
                            <td>{m.i_cin}</td>
                        </tr>
                        <tr>
                            <td>电子客票</td>
                            <td>{m.m_et}</td>
                            <td>{m.c_et}</td>
                            <td>{m.i_et}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}