import React from 'react'
import AutoComplete from './AutoComplete'
import * as F from '../Functions'

export  default class Login extends React.Component {
    constructor() {

        super();

        this.state = {
            title: '欢迎使用春秋航空离岗系统',
            wid: '000005',
            pwd: '000000',
            tos: 'SHA',
            fn: '',
            fd: '',
            flights: []
        }
    }

    txtOnChange(inputName, e) {

        let l = {};
        l[inputName] = $.trim(e.target.value);
        this.setState(Object.assign({}, this.state, l));
    }

    fetchFlightLists(e) {
        console.log('Login state::', this.state);

        let _me = this;
        if (this.state.wid && this.state.pwd && this.state.tos && this.state.flights.length == 0) {

            F.requestJson('queryUser', 'selectFns', function (data) {

                _me.setState(Object.assign({}, _me.state, {
                    flights: data
                }));
            }, this.state);
        }
    }

    doOnItemClick(field, value) {

        let l = {};
        l[field] = value;
        this.setState(Object.assign({}, this.state, l));
    }

    onFdeFocus(fds) {

        if (fds.length == 1) {
            this.setState(Object.assign({}, this.state, {
                fd: fds[0]['FDE'].toUpperCase()
            }));
        }
    }

    doOnSubmit(e) {

        let onSubmitFn = this.props.onSubmit;
        if (typeof onSubmitFn === 'function') {
            onSubmitFn({
                wid: this.state.wid,
                pwd: this.state.pwd,
                tos: this.state.tos,
                fn: this.state.fn,
                fde: this.state.fd
            });
        }

        return false;
    }

    render() {

        let fds = [];
        if (this.state.flights.length > 0 && this.state.fn) {
            for (let o of this.state.flights) {
                if (o['FN'].toLocaleUpperCase() == this.state.fn) {
                    fds.push(o);
                }
            }
        }

        return (
            <div className="container">

                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3 text-center">
                        <h3 >{this.state.title}</h3>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <form id="loginForm" className="form-horizontal dcs-selectable-container"
                              noValidate="noValidate" >
                            <div id="userLogin">
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">机场三字码</label>

                                    <div className="col-xs-6 dcs-valid-msg">
                                        <input className="form-control dcs-selectable" name="tos"
                                               placeholder="输入机场三字码,如 pvg"
                                               value={this.state.tos} required="true" maxLength="10"
                                               onChange={this.txtOnChange.bind(this, 'tos')}
                                        />

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">工号</label>

                                    <div className="col-xs-6 dcs-valid-msg">
                                        <input id="input4" name="wid"
                                               className="form-control dcs-selectable"
                                               placeholder="输入工号,如 000001"
                                               value={this.state.wid}
                                               required="true" maxLength="20"
                                               onChange={this.txtOnChange.bind(this, 'wid')}
                                               onBlur={this.fetchFlightLists.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">密码</label>

                                    <div className="col-xs-6 dcs-valid-msg">
                                        <input id="input5" type="password" name="pwd"
                                               className="form-control dcs-selectable"
                                               value={this.state.pwd}
                                               placeholder="用户密码" required="true" maxLength="20"
                                               onChange={this.txtOnChange.bind(this, 'pwd')}
                                               onBlur={this.fetchFlightLists.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">航班号</label>

                                    <div className="col-xs-6 dcs-valid-msg">
                                        <AutoComplete className="form-control dcs-selectable autocomplete" name="fn"
                                                      data-options={this.state.flights.map(function (o) {
                                                          return o['FN'];
                                                      }).join(',').toLocaleUpperCase()}
                                                      placeholder="输入航班号,如 9C8507"
                                                      value={this.state.fn}
                                                      onChange={this.txtOnChange.bind(this, 'fn')}
                                                      onItemClick={this.doOnItemClick.bind(this, 'fn')}
                                                      data-parsley-fn
                                                      data-parsley-fn-message="航班号格式错误！" required="true"
                                                      maxLength="10"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">航班日期</label>

                                    <div className="col-xs-6 dcs-valid-msg">
                                        <AutoComplete className="form-control dcs-selectable autocomplete"
                                                      data-options={fds.map(function (o) {
                                                          return o['FDE'];
                                                      }).join(',').toLocaleUpperCase()}
                                                      value={this.state.fd}
                                                      onChange={this.txtOnChange.bind(this, 'fd')}
                                                      onItemClick={this.doOnItemClick.bind(this, 'fd')}
                                                      onFocus={this.onFdeFocus.bind(this, fds)}
                                                      name="fde"
                                                      placeholder="选择航班日期,如 03Apr"
                                                      required="true" maxLength="10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <div className="form-group">
                                <div className="col-xs-offset-6 col-xs-6 btn-group text-center">
                                    <input id="loginBtn" className="btn btn-success btn-lg dcs-selectable"
                                           type="button" value="登录" onClick={this.doOnSubmit.bind(this)}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}