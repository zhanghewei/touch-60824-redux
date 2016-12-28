import React from 'react'
import PassengerSexStatistics from './PassengerSexStatistics'
import SeatMap from './SeatMap'
import BagageStatistics from './BagageStatistics'
import SaleStatistics from './SaleStatistics'
import AreaStatistics from './AreaStatistics'

export default class ShowSeat extends React.Component {

    render() {
        const c = this.context.immutableContext.toJS();
        const g = this.context.globalContext.toJS();

        const fl = g.token.fl
        const seatModal = c.refreshData[fl.uui].seat

        const bagModal = c.refreshData[fl.uui].bag
        const saleModal = c.refreshData[fl.uui].flightTransit
        const areaModal = c.refreshData[fl.uui].manifest
        const sexModal = c.refreshData[fl.uui].passengerStatus

        this.context.setMainList([])

        return <div>
            <div className="row">
                <div id="baggageDiv" className="col-xs-3 panel_padding_right_0">
                    <BagageStatistics modal={bagModal}/>
                </div>
                <div id="flightsTransitDiv" className="col-xs-3 panel_padding_right_0">
                    <SaleStatistics modal={saleModal}/>
                </div>
                <div id="manifestStatusDiv" className="col-xs-3 panel_padding_right_0">
                    <AreaStatistics modal={areaModal}/>
                </div>
                <div id="passengerStatusDiv" className="col-xs-3 panel_padding_right_0">
                    <PassengerSexStatistics modal={sexModal}/>
                </div>
            </div>
            <ul className="nav nav-tabs" role="tabList">
                <li id="localSeat" className="active ">
                    <a href="#localSeatStatusDiv" className="dcs-selectable localSeatLi" data-toggle="tab">
                        <span className="fontBolder">{fl.tos.toLocaleUpperCase()}-{fl.ars.toLocaleUpperCase()}</span>座位图
                    </a>
                </li>

            </ul>
            <div className="tab-content panel-body panel_padding_s seat-tab-content">

                <SeatMap modal={seatModal}/>
            </div>
        </div>
    }
}

ShowSeat.contextTypes = {
    immutableContext: React.PropTypes.any,
    globalContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
}