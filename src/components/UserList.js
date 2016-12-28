import React from 'react'
import * as C from '../Constants'


export default class UserList extends React.Component {

    constructor() {
        super()

        this.state = {
            list: []
        }
    }

    componentWillMount() {

        this.request = this.context.request('queryUser', 'list', function (list) {

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

        return <div id="userInfoPanel" className="panel panel-default ">
            <div className="panel-body">
                <div id="userTableWrapperDiv" className="table-responsive form-inline"
                     style={{height: '100%', overflow: 'auto'}}>
                    <table id="userTable" className="table table-hover table-condensed dcs-table">
                        <thead>
                        <tr>
                            <th className="dcs-th-checkbox">
                                <div className="checkbox checkbox-success checkbox-circle">
                                </div>
                            </th>
                            <th>编号</th>
                            <th>工号</th>
                            <th>姓名</th>
                            <th>所属机场</th>
                            <th>权限级别</th>
                            <th>手机号</th>
                            <th>最后登录时间</th>
                            <th>最后登录IP</th>
                        </tr>
                        </thead>
                        <tbody id="listTbody">
                        {
                            this.state.list.map(u=> {

                                const id = C.PREFIX[C.BLOCK_LIST] + u.id
                                return <tr>
                                    <td className="dcs-td-checkbox">
                                        <div className="checkbox checkbox-success checkbox-circle">
                                            <input id={id} key={id + '-key'} type="checkbox"
                                                   className="styled dcs-selectable"/><label></label>
                                        </div>
                                    </td>
                                    <td>{u.id}</td>
                                    <td>{u.wid}</td>
                                    <td>{u.nm.toLocaleUpperCase()}</td>
                                    <td>{u.ap.toLocaleUpperCase()}</td>
                                    <td>{u.pms}</td>
                                    <td>{u.mb}</td>
                                    <td>{u.llt}</td>
                                    <td>{u.lli}</td>
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

UserList.contextTypes = {
    request: React.PropTypes.func
}