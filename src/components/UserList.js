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

            if (list && list instanceof Array) {
                this.setState(Object.assign({}, this.state, {
                    list: list
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
            len = this.state.list.length
        for (let i = 0; i < len; i++) {
            l.push(C.PREFIX[C.BLOCK_LIST] + i)
        }

        this.context.setMainList(l)
    }

    render() {

        const c = this.context.immutableContext.toJS()
        this.updateMainList()

        return <div id="userInfoPanel" className="panel panel-default ">
            <div className="panel-body">
                <div id="userTableWrapperDiv" className="table-responsive form-inline"
                     style={{height: '100%', overflowY: 'auto',overflowX:'hidden'}}>
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
                            this.state.list.map((u, i)=> {

                                const id = C.PREFIX[C.BLOCK_LIST] + i
                                const cc = c.activeEid == id ? ' sel-active' : ''
                                return <tr className={cc}>
                                    <td className="dcs-td-checkbox">
                                        <div className="checkbox checkbox-success checkbox-circle">
                                            <input id={id} key={id + '-key'} type="checkbox"
                                                   className="styled"/><label></label>
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
    immutableContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
    request: React.PropTypes.func
}