import React from 'react'
import Cki from './Cki'
import Login from './components/Login'
import * as F from './Functions'
import * as C from './Constants'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            // login: true,
            counter: null,
            pattern: "cki",
            user: {
                id: null,
                name: null,
                level: null,
            },
            flight: {
                id: null,
                flightNo: null,
            },
        }
    }

    doLogin(pm) {

        let me = this,
            fn = function (params) {
                F.requestJson('queryUser', 'login', function (data) {
                    debugger
                    if (data) {
                        if (data.success === true && data.errCode == C.LOGIN_ON_OTHERSIDE) {
                            if (window.confirm('当前用户已登录，是否强制登录？')) {
                                params['force'] = 1;
                                fn(params);
                            }
                        } else {
                            console.log('data:::', data)
                            me.setState(Object.assign({}, me.state, {
                                user: data.user,
                                counter: data.counter,
                                flight: data.fl,
                                login: true
                            }));
                        }
                    }
                }, params);
            }

        fn(pm);
    }

    componentWillMount() {
        let me = this;
        F.requestJson('queryUser', 'info', function (data) {
            if(data.user){
                me.setState(Object.assign({},me.state,{
                    user: data.user,
                    flight: data.fl,
                    login: true
                }));
            }
        })
    }

    render() {
        return (() => {
            if (this.state.login) {
                return <Cki/>
            } else {
                return <Login onSubmit={this.doLogin.bind(this)}/>
            }
        })()
    }


}

export default Main