import React from 'react'

export default class FlightStatusPanel extends React.Component {


    render() {

        return <div id="statusPanel" className="navbar-form navbar-right">
            <div id="flightStatusPanel" className="form-inline text-left">
                <div className="form-group">
                    <label className="form-control form-control-static">

                        <span className="green fontBolder">9C8896</span>

                    </label>
                    <label className="form-control form-control-static">
                        <span className="enter fontBolder">ZHA</span>

                        <span className="seat-ce fontBolder"> &gt;&gt; PVG</span>
                    </label>
                    <label className="form-control form-control-static">07NOV</label>

                    <label className="form-control form-control-static">
                        <span className="glyphicon glyphicon-plane"></span><span
                        className="label dcs-seat-success label-as-badge">OP</span>
                        <span className="glyphicon glyphicon-road"></span><span
                        className="label dcs-seat-success label-as-badge">OP</span>
                        <span className="glyphicon glyphicon-sound-dolby"></span>

                        <span className="fontBolder">A7</span>


                    </label>

                    <label className="form-control form-control-static">
                        <span className="fontBolder">15:00</span>
                        <span className="fontBolder">~</span>
                        <span className="fontBolder">15:30</span>
                        <span className="fontBolder">~</span>
                        <span className="fontBolder">18:05</span>
                    </label>
                    <label className="form-control form-control-static">CKI
                        <span className="label dcs-seat-success label-as-badge">3</span>
                        <span className="label label-danger label-as-badge">107</span>
                    </label>
                    <label className="form-control form-control-static">BCS
                        <span className="label dcs-seat-success label-as-badge">0</span>
                        <span className="label label-danger label-as-badge">3</span>
                    </label>
                </div>
            </div>
        </div>
    }
}

FlightStatusPanel.contextTypes = {

}