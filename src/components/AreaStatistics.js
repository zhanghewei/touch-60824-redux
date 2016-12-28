import React from 'react'

export default class AreaStatistics extends React.Component {

    render() {

        const m = this.props.modal

        return <div id="manifestStatusPanel" className="panel panel-default">
            <div id="manifestDiv" className="panel-body panel_padding_s">
                <div id="manifest" className="table-responsive">
                    <table className="table table-hover table-striped table-condensed">
                        <thead>
                        <tr>
                            <th>分类</th>
                            <th>成人</th>
                            <th>儿童</th>
                            <th>婴儿</th>
                            <th>机组</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>OA区</td>
                            <td>{m.oa_m}</td>
                            <td>{m.oa_c}</td>
                            <td>{m.oa_i}</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>OB区</td>
                            <td>{m.ob_m}</td>
                            <td>{m.ob_c}</td>
                            <td>{m.ob_i}</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>OC区</td>
                            <td>{m.oc_m}</td>
                            <td>{m.oc_c}</td>
                            <td>{m.oc_i}</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>合计</td>
                            <td>{m.total_m}</td>
                            <td>{m.total_c}</td>
                            <td>{m.total_i}</td>
                            <td>0</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}