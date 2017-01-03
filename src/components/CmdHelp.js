import React from 'react'
import * as C from '../Constants'

export default class CmdHelp extends React.Component {

    componentDidMount() {


    }

    render() {
        const c = this.context.immutableContext.toJS()
        let i = 1;
        c.activeEid

        const o = <div id="helpInfoPanel" className="panel panel-default">
            <div className="modal-body" style={{padding: '0 auto 0 15px'}}>
                <div className="panel-body text-left">
                    <div className="hk">
                        <div className="row">
                            <div className="col-md-2"><span className="seat-start">*</span><span>未被占用</span></div>
                            <div className="col-md-2"><span className="seat-o">O</span><span>已被占用</span></div>
                            <div className="col-md-2"><span className="seat-r">R</span><span>被预定</span></div>
                            <div className="col-md-2"><span className="seat-k">K</span><span>中转</span></div>
                            <div className="col-md-2"><span>X</span><span>被锁定</span></div>
                        </div>

                        <div className="row">
                            <div className="col-md-2"><span className="seat-ce">C</span><span>手工指定座位</span></div>
                            <div className="col-md-2"><span className="seat-ce">E</span><span>额外占用</span></div>
                            <div className="col-md-2"><span className="seat-szl">#</span><span>安全员</span></div>
                            <div className="col-md-2"><span className="seat-szl">S</span><span>商务经济座</span></div>
                            <div className="col-md-2"><span className="seat-g">G</span><span>团队旅客</span></div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"><span>i</span><span>婴儿</span></div>
                            <div className="col-md-2"><span>c</span><span>儿童</span></div>
                            <div className="col-md-2"><span>d</span><span>预付费</span></div>
                            <div className="col-md-2"><span>v</span><span>直通车</span></div>
                            <div className="col-md-2"><span>a</span><span>快登机</span></div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <hr className="hr1"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"><span
                                className="label labelColor labelFamily">NA</span><span>未值机</span></div>
                            <div className="col-md-2"><span
                                className="label labelColor labelFamily">AC</span><span>已值机</span></div>
                            <div className="col-md-2"><span
                                className="glyphicon glyphicon-asterisk"></span><span>取消值机</span></div>
                            <div className="col-md-2"><span
                                className="glyphicon glyphicon-warning-sign"></span><span>闸口截留</span></div>
                            <div className="col-md-2"><span className="label labelColor">中转</span><span>中转旅客</span>
                            </div>
                            <div className="col-md-2"><span className="label redColor">退</span><span>退票旅客</span></div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <hr className="hr2"/>
                            </div>
                        </div>
                        <div id="helpInfoPanelMainDiv">
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>; 座位号,座位号</span></div>
                                    <div className="col-md-4"><span>按座位号提取多旅客</span></div>
                                    <div className="col-md-2"><span>* 订单号,订单号</span></div>
                                    <div className="col-md-4"><span>按订单号提取多旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>. 值机号,值机号</span></div>
                                    <div className="col-md-4"><span>按值机号提取多旅客</span></div>
                                    <div className="col-md-2"><span>/AC</span></div>
                                    <div className="col-md-4"><span>查询已值机旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/NA</span></div>
                                    <div className="col-md-4"><span>查询未值机旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/AL</span></div>
                                    <div className="col-md-4"><span>查询所有旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/ADULT</span></div>
                                    <div className="col-md-4"><span>查询成人旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/CHD</span></div>
                                    <div className="col-md-4"><span>查询儿童旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/INF</span></div>
                                    <div className="col-md-4"><span>查询婴儿旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/GS</span></div>
                                    <div className="col-md-4"><span>查询候补旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/ET</span></div>
                                    <div className="col-md-4"><span>查询ET票旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/GSNA</span></div>
                                    <div className="col-md-4"><span>查询候补未值机旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/GSAC</span></div>
                                    <div className="col-md-4"><span>查询候补已值机旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/ROSE</span></div>
                                    <div className="col-md-4"><span>查询ROSE旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/R</span></div>
                                    <div className="col-md-4"><span>查询有预留座位的旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/R/座位号</span></div>
                                    <div className="col-md-4"><span>查询预定某个座位的旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/V</span></div>
                                    <div className="col-md-4"><span>查询直通车旅客</span></div>
                                    <div className="col-md-2"><span>/A</span></div>
                                    <div className="col-md-4"><span>查询快登机旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/PSAF</span></div>
                                    <div className="col-md-4"><span>查询安全座位旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/WBAC</span></div>
                                    <div className="col-md-4"><span>查询已登机、网上值机的旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/WBNA</span></div>
                                    <div className="col-md-4"><span>查询未登机、网上值机的旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/DEL</span></div>
                                    <div className="col-md-4"><span>查询已经办理退票手续的旅客名单</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>

                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/BAC</span></div>
                                    <div className="col-md-4"><span>查询已登机的旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/BNA</span></div>
                                    <div className="col-md-4"><span>查询未登机的旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/CT</span></div>
                                    <div className="col-md-4"><span>查询座位冲突的旅客</span></div>
                                    <div className="col-md-2"><span>/OA</span></div>
                                    <div className="col-md-4"><span>查询坐在OA舱位的旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/OB</span></div>
                                    <div className="col-md-4"><span>查询坐在OB舱位的旅客</span></div>
                                    <div className="col-md-2"><span>/OC</span></div>
                                    <div className="col-md-4"><span>查询坐在OC舱位的旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/BAG</span></div>
                                    <div className="col-md-4"><span>查询有行李的旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/BAGN 行李号</span></div>
                                    <div className="col-md-4"><span>查询具体行李所有人</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/DBN</span></div>
                                    <div className="col-md-4"><span>查询所有删除行李旅客</span></div>

                                    <div className="col-md-2"><span>/DBN/行李号</span></div>
                                    <div className="col-md-4"><span>查询删除行李旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/BAGLS</span></div>
                                    <div className="col-md-4"><span>查询所有行李信息</span></div>
                                    <div className="col-md-2"><span>/BAGLSB</span></div>
                                    <div className="col-md-4"><span>查询所有商务行李信息</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/BAGLSP</span></div>
                                    <div className="col-md-4"><span>查询所有旅客行李信息</span></div>
                                    <div className="col-md-2"><span>/LS</span></div>
                                    <div className="col-md-4"><span>查询此工号办理旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/LSET</span></div>
                                    <div className="col-md-4"><span>查询此工号办理电子客票旅客,可接三字码</span></div>
                                    <div className="col-md-2"><span>/LSNET</span></div>
                                    <div className="col-md-4"><span>查询此工号办理非电子客票旅客,可接三字码</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/SPL/A</span></div>
                                    <div className="col-md-4"><span>提取订票旅客,订票时间升序排序</span></div>
                                    <div className="col-md-2"><span>/SPL/D</span></div>
                                    <div className="col-md-4"><span>提取订票旅客,订票时间降序排序</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>

                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/CPL/A</span></div>
                                    <div className="col-md-4"><span>提取值机旅客,值机时间升序排序</span></div>
                                    <div className="col-md-2"><span>/CPL/D</span></div>
                                    <div className="col-md-4"><span>提取值机旅客,值机时间降序排序</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/BPL/A</span></div>
                                    <div className="col-md-4"><span>提取登机旅客,登机时间升序排序</span></div>
                                    <div className="col-md-2"><span>/BPL/D</span></div>
                                    <div className="col-md-4"><span>提取登机旅客,登机时间降序排序</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/CMX</span></div>
                                    <div className="col-md-4"><span>舱单统计</span></div>
                                    <div className="col-md-2"><span>/SY</span></div>
                                    <div className="col-md-4"><span>查询航班信息</span></div>

                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/FM</span></div>
                                    <div className="col-md-4"><span>查询所有航班</span></div>
                                    <div className="col-md-2"><span>/MCF</span></div>
                                    <div className="col-md-4"><span>自建航班</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/SFL</span></div>
                                    <div className="col-md-4"><span>切换航班</span></div>
                                    <div className="col-md-2"><span>/FIC</span></div>
                                    <div className="col-md-4"><span>修改航班信息</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/FCM</span></div>
                                    <div className="col-md-4"><span>航班状态修改</span></div>
                                    <div className="col-md-2"><span>/FNC</span></div>
                                    <div className="col-md-4"><span>航班班次变更</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/FL</span></div>
                                    <div className="col-md-4"><span>航班日志</span></div>
                                    <div className="col-md-2"><span>/USER</span></div>
                                    <div className="col-md-4"><span>查询用户列表</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>

                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/LOG ZHANGSAN</span></div>
                                    <div className="col-md-4"><span>查询ZHANGSAN的日志</span></div>
                                    <div className="col-md-2"><span>/SYSLOG</span></div>
                                    <div className="col-md-4"><span>查询系统日志</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/LOG</span></div>
                                    <div className="col-md-4"><span>查询最近二十条日志</span></div>
                                    <div className="col-md-2"><span>/BUS</span></div>
                                    <div className="col-md-4"><span>商务行李操作日志</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                            <a id={C.PREFIX[C.BLOCK_LIST] + i}
                               className={c.activeEid == (C.PREFIX[C.BLOCK_LIST] + i++) ? 'sel-active' : ''}
                               href="javascript:void(0)">
                                <div className="row">
                                    <div className="col-md-2"><span>/OPR U0001</span></div>
                                    <div className="col-md-4"><span>查询工号为U0001的操作日志</span></div>
                                    <div className="col-md-2"><span>/U</span></div>
                                    <div className="col-md-4"><span>查询逾重行李旅客</span></div>
                                </div>
                            </a>
                            <div className="row">
                                <div className="col-md-12">
                                    <hr className="hr2"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        const ids = [];
        for (let j = 1; j < i; j++) {
            ids.push(C.PREFIX[C.BLOCK_LIST] + j)
        }

        this.context.setMainList(ids)
        return o;
    }
}

CmdHelp.contextTypes = {
    immutableContext: React.PropTypes.any,
    setMainList: React.PropTypes.func,
}