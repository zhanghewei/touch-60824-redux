import React from 'react'
import * as C from '../Constants'
import * as F from '../Functions'

export default class LogList extends React.Component {

    constructor() {
        super()

        this.state = {
            list: []
        }
    }

    componentWillMount() {

        this.fetchData(this.props.cmd)
    }

    componentWillUnmount() {

        if (this.request) {
            this.request.abort()
        }
    }

    fetchData(cmd) {
        const c = this.context.immutableContext.toJS();

        const uuids = c.selectList.map(eid=> {
            const o = F.getDataByEid(eid, c.passengerData);
            return o[1].uui
        }).join(',')
        this.request = this.context.request('logInfo', 'queryLog', function (list) {

            if (list && list instanceof Array) {
                this.setState(Object.assign({}, this.state, {
                    list: list
                }))
            }
        }.bind(this), {data: cmd || '', pru: uuids})
    }

    componentWillReceiveProps(nextProps) {

        this.fetchData(nextProps.cmd)
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

        return <div id="logInfoDiv" style={{overflowX: 'hidden', overflowY: 'auto', height: '80%'}}>

            {
                this.state.list.map((o, i)=> {

                    const id = C.PREFIX[C.BLOCK_LIST] + i
                    const cc = c.activeEid == id ? 'sel-active' : ''

                    return <div key={id + '-key'} className="list-group-item prelog" data-index="0"
                                style={{padding: '0px'}}>
                        <a id={id} className={cc} href="javascript:void(0)"
                           style={{display: 'block'}}>

                            <div className="row margin0">
                                <p>

                                </p>
                                <div className="row margin0">
                                    <div className="col-xs-2">
                                        <span className="label labelColor" style={{fontSize: 'inherit'}}>{o.acg}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <span className="label labelColor" style={{fontSize: 'inherit'}}>{o.cn}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <span style={{color: '#000a11', fontSize: 'inherit'}}>{o.sex}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <span className="label "
                                              style={{color: '#000a11', fontSize: 'inherit'}}>{o.lmb}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <span className="label "
                                              style={{color: '#000a11', fontSize: 'inherit'}}>{o.ctn}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <span style={{color: '#000a11', fontSize: 'inherit'}}>{o.ct}</span>
                                    </div>
                                </div>
                                <p></p>
                                <p>

                                </p>
                                <div className="row margin0">
                                    <div className="col-xs-12">
                                        <span className="label labelColor" style={{fontSize: 'inherit'}}>详细信息</span>
                                        <span
                                            style={{
                                                color: '#000a11',
                                                fontSize: 'inherit',
                                                wordBreak: 'break-all'
                                            }}>{o.ins}</span>
                                    </div>
                                </div>
                                <p></p>
                            </div>
                        </a>
                    </div>
                })
            }

        </div>
    }
}

LogList.contextTypes = {
    immutableContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
    request: React.PropTypes.func
}