import React from 'react'

export default class FlightStatusPanel extends React.Component {


    render() {

        const c = this.context.immutableContext.toJS()
        const g = this.context.globalContext.toJS()
        const flight = g.token.fl

        if (!c.refreshData) return <div></div>
        const fl = c.refreshData[flight.uui].flightStatus

        return <div id="statusPanel" className="navbar-form navbar-right">
            <div id="flightStatusPanel" className="form-inline text-left">
                <div className="form-group">
                    <label className="form-control form-control-static">

                        {fl.fn1 ? <span class="gray fontBolder">{fl.fn1}-</span> : ''}
                        <span className="green fontBolder">{fl.fn.toLocaleUpperCase()}</span>
                        {fl.fn2 ? <span class="gray fontBolder">-{fl.fn2}</span> : ''}

                    </label>
                    <label className="form-control form-control-static"
                           dangerouslySetInnerHTML={{__html: fl.ss + fl.mid + fl.ds}}>

                    </label>
                    <label className="form-control form-control-static">{fl.fde.toLocaleUpperCase()}</label>

                    <label className="form-control form-control-static">
                        <span className="glyphicon glyphicon-plane"></span>
                        <span dangerouslySetInnerHTML={{__html: fl.fs}}></span>
                        <span className="glyphicon glyphicon-road"></span>
                        <span dangerouslySetInnerHTML={{__html: fl.gs}}></span>
                        <span className="glyphicon glyphicon-sound-dolby"></span>

                        <span className="fontBolder">{$.trim(fl.gat) ? fl.gat.toLocaleUpperCase() : '--'}</span>

                    </label>

                    <label className="form-control form-control-static">
                        <span className="fontBolder">{fl.etb}</span>
                        <span className="fontBolder">~</span>
                        <span className="fontBolder">{fl.eto}</span>
                        <span className="fontBolder">~</span>
                        <span className="fontBolder">{fl.eta}</span>
                    </label>
                    <label className="form-control form-control-static">CKI
                        <span className="label dcs-seat-success label-as-badge">{fl.cn}</span>
                        <span className="label label-danger label-as-badge">{fl.nocn}</span>
                    </label>
                    <label className="form-control form-control-static">BCS
                        <span className="label dcs-seat-success label-as-badge">{fl.bn}</span>
                        <span className="label label-danger label-as-badge">{fl.nobn}</span>
                    </label>
                </div>
            </div>
        </div>
    }
}

FlightStatusPanel.contextTypes = {

    immutableContext: React.PropTypes.any,
    globalContext: React.PropTypes.any,
}