import React from 'react'
import Cki from './Cki'
import Login from './components/Login'
import * as F from './Functions'
import * as C from './Constants'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pattern: "cki",
            token: null,
            net: null
        }
    }

    doLogin(pm) {

        let me = this,
            fn = function (params) {
                F.requestJson('queryUser', 'login', function (data) {
                    if (data) {
                        if (data.success === true && data.errCode == C.LOGIN_ON_OTHERSIDE) {
                            if (window.confirm('当前用户已登录，是否强制登录？')) {
                                params['force'] = 1;
                                fn(params);
                            }
                        } else {
                            // me.setState(Object.assign({}, me.state, {
                            //     user: data.user,
                            //     counter: data.counter,
                            //     flight: data.fl,
                            //     login: true
                            // }));

                            me.setState(Object.assign({}, me.state, {
                                token: data
                            }))
                            F.dcs().token = data;
                        }
                    }
                }, params, null, null, true);
            }

        fn(pm);
    }

    componentWillUnmount() {
        F.dcs().token = null;
    }


    componentWillMount() {
        let me = this;
        F.requestJson('queryUser', 'info', function (data) {
            if (data.user) {
                // me.setState(Object.assign({}, me.state, {
                //     user: data.user,
                //     flight: data.fl,
                //     login: true
                // }));

                this.setState(Object.assign({}, this.state, {
                    token: data
                }))
                F.dcs().token = data;
            }
        }.bind(this), null, null, null, true);
    }

    updateToken(token, net) {

        this.setState(Object.assign({}, this.state, {
            token: token,
            net: net
        }))
        F.dcs().token = token;
        F.dcs().net = net;
    }

    render() {
        const login = this.state.token && this.state.token.user;
        if (login) {
            return <Cki token={this.state.token} updateToken={this.updateToken.bind(this)}/>
        } else {
            return <Login onSubmit={this.doLogin.bind(this)}/>
        }
    }

}

export default Main