import React from 'react'

export default class ShortCutHelp extends React.Component {

    render() {

        this.context.setMainList([])

        return <div id="confirmModalBody" className="modal-body">
            <div id="commandHelpPanel" className="text-left">
                <div className="row">
                    <div className="col-xs-3">
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder">航班相关</div>
                            <div className="margin10">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+A</span>
                                <span className="fontSize12 paddingLeft">切换航班</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+H</span>
                                <span className="fontSize12 paddingLeft">修改航班信息</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F9</span>
                                <span className="fontSize12 paddingLeft">航班班次变更</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+4</span>
                                <span className="fontSize12 paddingLeft">手工自建航班</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+M</span>
                                <span className="fontSize12 paddingLeft">航班关闭管理</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+H</span>
                                <span className="fontSize12 paddingLeft">修改航班登机口</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+J</span>
                                <span className="fontSize12 paddingLeft">修改航班登机时间</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+K</span>
                                <span className="fontSize12 paddingLeft">修改航班起飞时间</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+L</span>
                                <span className="fontSize12 paddingLeft">修改航班到达时间</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+;</span>
                                <span className="fontSize12 paddingLeft">修改航班行李闸口</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+'</span>
                                <span className="fontSize12 paddingLeft">航班机型变更</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+E</span>
                                <span className="fontSize12 paddingLeft">航班信息</span>
                            </div>
                        </div>
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder">统计相关</div>
                            <div className="margin10">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+G</span>
                                <span className="fontSize12 paddingLeft">舱单统计</span>
                            </div>
                            <div className="margin10">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+V</span>
                                <span className="fontSize12 paddingLeft">舱单输出</span>
                            </div>
                            <div className="margin10">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F</span>
                                <span className="fontSize12 paddingLeft">工号值机统计</span>
                            </div>
                            <div className="margin10">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F12</span>
                                <span className="fontSize12 paddingLeft">收费统计</span>
                            </div>
                        </div>

                    </div>
                    <div className="col-xs-3 ">
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder"><span>行李、收费</span></div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+1</span>
                                <span className="fontSize12 paddingLeft">增加旅客行李</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+C</span>
                                <span className="fontSize12 paddingLeft">增加商务行李</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+3</span>
                                <span className="fontSize12 paddingLeft">删除旅客行李</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+6</span>
                                <span className="fontSize12 paddingLeft">删除商务行李</span>
                            </div>

                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+U</span>
                                <span className="fontSize12 paddingLeft">逾重行李收费</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+X</span>
                                <span className="fontSize12 paddingLeft">直通车收费</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+N</span>
                                <span className="fontSize12 paddingLeft">快登机收费</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F2</span>
                                <span className="fontSize12 paddingLeft">座位收费编辑</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F8</span>
                                <span className="fontSize12 paddingLeft">重打商务行李牌</span>
                            </div>
                        </div>
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder">座位相关</div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+I</span>
                                <span className="fontSize12 paddingLeft">座位开放</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+J</span>
                                <span className="fontSize12 paddingLeft">座位锁定</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+L</span>
                                <span className="fontSize12 paddingLeft">座位设置</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+D</span>
                                <span className="fontSize12 paddingLeft">查看座位</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+5</span>
                                <span className="fontSize12 paddingLeft">变更旅客座位</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+K</span>
                                <span className="fontSize12 paddingLeft">预留旅客座位</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+T</span>
                                <span className="fontSize12 paddingLeft">额外占用座位</span>
                            </div>
                        </div>

                    </div>
                    <div className="col-xs-3 ">
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder">旅客相关</div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+B</span>
                                <span className="fontSize12 paddingLeft">候补国内旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+O</span>
                                <span className="fontSize12 paddingLeft">设置电子客票</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+,</span>
                                <span className="fontSize12 paddingLeft">旅客电话编辑</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+Z</span>
                                <span className="fontSize12 paddingLeft">修改旅客服务</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+P</span>
                                <span className="fontSize12 paddingLeft">旅客截留</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+2</span>
                                <span className="fontSize12 paddingLeft">取消旅客值机</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+4</span>
                                <span className="fontSize12 paddingLeft">设置旅客成人</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+7</span>
                                <span className="fontSize12 paddingLeft">旅客绑定婴儿</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+8</span>
                                <span className="fontSize12 paddingLeft">重打登机牌</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+9</span>
                                <span className="fontSize12 paddingLeft">重打行李牌</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+S</span>
                                <span className="fontSize12 paddingLeft">查询旅客列表</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+Q</span>
                                <span className="fontSize12 paddingLeft">未值机旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+W</span>
                                <span className="fontSize12 paddingLeft">已值机旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+0</span>
                                <span className="fontSize12 paddingLeft">查询旅客日志</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+5</span>
                                <span className="fontSize12 paddingLeft">手工保护旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft">Alt</span>
                                <span className="fontBolder paddingLeft">+F3</span>
                                <span className="fontSize12 paddingLeft">旅客API信息编辑</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft"></span>
                                <span className="fontBolder paddingLeft">E</span>
                                <span className="fontSize12 paddingLeft">查询同行旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge alt paddingLeft"></span>
                                <span className="fontBolder paddingLeft">R</span>
                                <span className="fontSize12 paddingLeft">查询同订单旅客</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-3 ">
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 fontBolder">全局操作</div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+0</span>
                                <span className="fontSize12 paddingLeft">退出</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+2</span>
                                <span className="fontSize12 paddingLeft">修改密码</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+3</span>
                                <span className="fontSize12 paddingLeft">重新登录</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+F</span>
                                <span className="fontSize12 paddingLeft">切换网络</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+O</span>
                                <span className="fontSize12 paddingLeft">离线数据推送</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+P</span>
                                <span className="fontSize12 paddingLeft">数据下载</span>
                            </div>
                            <div className="margin10 ">
                                <span className="fontBolder paddingLeft">F12</span>
                                <span className="fontSize12 paddingLeft">快捷键显示</span>
                            </div>
                        </div>
                        <div className="panel panel-default dcs-selectable-container">
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+Enter</span>
                                <span className="fontSize12 paddingLeft">全选值机</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge shift paddingLeft">Shift</span>
                                <span className="fontBolder paddingLeft">+2</span>
                                <span className="fontSize12 paddingLeft">批量取消值机</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+F5</span>
                                <span className="fontSize12 paddingLeft">页面刷新</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+B</span>
                                <span className="fontSize12 paddingLeft">设置</span>
                            </div>
                            <div className="margin10 ">
                                <span className="label label-as-badge ctrl paddingLeft">Ctrl</span>
                                <span className="fontBolder paddingLeft">+A</span>
                                <span className="fontSize12 paddingLeft">旅客全选</span>
                            </div>
                            <div className="margin10 ">
                                <span className="fontBolder paddingLeft">F1</span>
                                <span className="fontSize12 paddingLeft">快速提取旅客</span>
                            </div>
                            <div className="margin10 ">
                                <span className="fontBolder paddingLeft">F4</span>
                                <span className="fontSize12 paddingLeft">菜单切换</span>
                            </div>
                            <div className="margin10 ">
                                <span className="fontBolder paddingLeft">F2</span>
                                <span className="fontSize12 paddingLeft">扫描身份证提取旅客</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

ShortCutHelp.contextTypes = {

    setMainList: React.PropTypes.func,
}