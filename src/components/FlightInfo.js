import React from 'react'

export default class FlightInfo extends React.Component {


    render() {

        const f = this.props.flight
        if (!f) return <div></div>

        return <div id="flightDetailInnerDiv" className="panel panel-default">
            <div className="panel-body text-left ">
                <div className="row">
                    <div className="col-md-3">
                        航班机型：{f.ta}
                    </div>
                    <div className="col-md-3">
                        座位排数：{f.rc}
                    </div>
                    <div className="col-md-4">
                        航班布局：{f.sc}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        闸口：{f.gat}
                    </div>
                    <div className="col-md-3">
                        闸口状态：{f.gs}
                    </div>
                    <div className="col-md-4">
                        航班状态：{f.fs}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        初始关闭：{f.cit}
                    </div>
                    <div className="col-md-3">
                        中间关闭：{f.clt}
                    </div>
                    <div className="col-md-4">
                        最后关闭：{f.cct}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 ">
                        {f.tos}
                    </div>
                    <div className="col-md-5 ">
                        {f.ars}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">登机</div>
                    <div className="col-md-4">起飞</div>
                    <div className="col-md-3">到达</div>
                </div>
                <div className="row">
                    <div className="col-md-3">{f.etb}</div>
                    <div className="col-md-4">{f.eto}</div>
                    <div className="col-md-3">{f.eta}</div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">销售合计：</div>
                    <div className="col-md-2">{f.m_sale + f.c_sale + f.i_sale}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_sale}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_sale}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_sale}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">候补合计：</div>
                    <div className="col-md-2">{f.m_gs + f.c_gs + f.i_gs}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_gs}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_gs}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_gs}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">网上合计：</div>
                    <div className="col-md-2">{f.m_web + f.c_web + f.i_web}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_web}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_web}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_web}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">电子客票：</div>
                    <div className="col-md-2">{f.m_et + f.c_et + f.i_et}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_et}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_et}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_et}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">登机合计：</div>
                    <div className="col-md-2">{f.total_bn}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_bn}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_bn}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_bn}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">值机合计：</div>
                    <div className="col-md-2">{f.total_cin}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_cin}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_cin}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_cin}</div>
                </div>
                <div className="row">
                    <div className="col-md-2">拉下合计：</div>
                    <div className="col-md-2">{f.total_leave}</div>
                    <div className="col-md-1">成人：</div>
                    <div className="col-md-1">{f.m_leave}</div>
                    <div className="col-md-1">儿童：</div>
                    <div className="col-md-1">{f.c_leave}</div>
                    <div className="col-md-1">婴儿：</div>
                    <div className="col-md-1">{f.i_leave}</div>
                </div>
                <div className="row">
                    <div className="col-md-3">商务行李：{f.busNum}/{f.busWeight}</div>
                    <div className="col-md-3">旅客行李：{f.passNum}/{f.passWeight}</div>
                    <div className="col-md-3">行李合计：{f.allBagNum}/{f.allBagWeight}</div>
                </div>
            </div>
        </div>
    }
}