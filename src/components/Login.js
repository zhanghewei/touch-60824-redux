import React from 'react'

const defaults = {
    title: '欢迎使用春秋航空离岗系统',
    wid: '000004',
    pwd: '000000',
    tos: 'PVG',
    fn: '9C8891',
    fd: '22JUN'
}

export  default class Login extends React.Component {

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3 text-center">
                        <h3 >{defaults.title}</h3>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <form id="loginForm" className="form-horizontal dcs-selectable-container"
                              noValidate="noValidate">
                            <div id="userLogin">
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">工号</label>
                                    <div className="col-xs-6 dcs-valid-msg">
                                        <input id="" name="wid"
                                               className="form-control dcs-selectable dcs-selectable-default dcs-active"
                                               placeholder={'输入工号，如' + defaults.wid} defaultValue={defaults.wid}
                                               required="true"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">密码</label>
                                    <div className="col-xs-6 dcs-valid-msg">
                                        <input id="" name="pwd" type="password"
                                               className="form-control dcs-selectable dcs-selectable-default dcs-active"
                                               placeholder="用户密码" defaultValue={defaults.pwd} required="true"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div id="flightInfoDiv">
                                <div>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">机场三字码</label>
                                        <div className="col-xs-6 dcs-valid-msg">
                                            <input id="" name="tos"
                                                   className="form-control dcs-selectable dcs-selectable-default dcs-active"
                                                   placeholder={'输入机场三字码，如' + defaults.tos} defaultValue={defaults.tos}
                                                   required="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">航班号</label>
                                        <div className="col-xs-6 dcs-valid-msg">
                                            <input id="" name="fn"
                                                   className="form-control dcs-selectable dcs-selectable-default dcs-active"
                                                   placeholder={'输入航班号，如' + defaults.fn} defaultValue={defaults.fn}
                                                   required="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-4 control-label">航班日期</label>
                                        <div className="col-xs-6 dcs-valid-msg">
                                            <input id="" name="fd"
                                                   className="form-control dcs-selectable dcs-selectable-default dcs-active"
                                                   placeholder={'输入航班日期，如' + defaults.fd} defaultValue={defaults.fd}
                                                   required="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <div className="form-group">
                                <div className="col-xs-offset-6 col-xs-6 btn-group text-center">
                                    <input id="loginBtn" className="btn btn-success btn-lg dcs-selectable"
                                           type="button" value="登录" onClick={this.props.fn}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}