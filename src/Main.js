import React from 'react'
import Cki from './Cki'
import Login from './components/Login'
import Immutable from 'immutable'
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

    getChildContext() {

        return {
            globalContext: Immutable.Map(this.state),
            updateGlobal: this.updateGlobal.bind(this),
            request: this.request.bind(this)
        }
    }

    request(api, cmd, callback, params, errorOp, timeout, sync) {

        return F.requestJson(this.state, api, cmd, callback, params, errorOp, timeout, sync)
    }

    updateGlobal(cfg) {

        this.setState(Object.assign({}, this.state, cfg))
    }

    doLogin(pm) {

        let me = this,
            fn = function (params) {
                me.request('queryUser', 'login', function (data) {
                    if (data) {
                        if (data.success === true && data.errCode == C.LOGIN_ON_OTHERSIDE) {
                            if (window.confirm('当前用户已登录，是否强制登录？')) {
                                params['force'] = 1;
                                fn(params);
                            }
                        } else {
                            me.setState(Object.assign({}, me.state, {
                                token: data
                            }))
                        }
                    }
                }, params, null, null, true);
            }

        fn(pm);
    }

    componentWillMount() {
        let me = this;
        this.request('queryUser', 'info', function (data) {
            if (data.user) {

                this.setState(Object.assign({}, this.state, {
                    token: data
                }))
            }
        }.bind(this), null, null, null, true);
    }

    updateToken(token, net) {

        this.setState(Object.assign({}, this.state, {
            net: net
        }))
    }

    render() {
        const login = this.state.token && this.state.token.user;
        if (login) {
            return <Cki loginMode={this.state.pattern} token={this.state.token}
                        updateToken={this.updateToken.bind(this)}/>
        } else {
            return <Login onSubmit={this.doLogin.bind(this)}/>
        }
    }

}

Main.childContextTypes = {
    globalContext: React.PropTypes.any,
    updateGlobal: React.PropTypes.func,
    request: React.PropTypes.func
}

export default Main