import React from 'react'
import pureRender from "pure-render-decorator"
import Immutable from 'immutable'
import * as C from '../Constants'
import * as F from '../Functions'

@pureRender
class PassengerEdit extends React.Component {
    render() {
        const c = this.context.immutableContext.toJS()
        const activeEid = c.activeEid
        const handleFocus = this.context.handleFocus
        return (
            <div>
                <br/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <div className="col-xs-offset-2">
                            <p>
                                值机
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edt_in1" className="col-xs-2 control-label">排</label>
                        <div className="col-xs-4">
                            <input id="edt_in1" className={F.getSelClass(activeEid == 'edt_in1')}
                                   onFocus={handleFocus}/>
                        </div>
                        <label htmlFor="edt_in2" className="col-xs-2 control-label">列</label>
                        <div className="col-xs-4">
                            <input id="edt_in2" className={F.getSelClass(activeEid == 'edt_in2')}
                                   onFocus={handleFocus}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edt_chk1" className="col-xs-2 control-label">checkbox</label>
                        <div className="col-xs-4">
                            <label className={F.getSelClass(activeEid == 'edt_chk1', 'checkbox')}>
                                <input id="edt_chk1" type="checkbox" value="option1"
                                       onFocus={handleFocus}/> 1
                            </label>
                            <label className={F.getSelClass(activeEid == 'edt_chk2', 'checkbox')}>
                                <input id="edt_chk2" type="checkbox" value="option2"
                                       onFocus={handleFocus}/> 2
                            </label>
                            <label className={F.getSelClass(activeEid == 'edt_chk3', 'checkbox')}>
                                <input id="edt_chk3" type="checkbox" value="option3"
                                       onFocus={handleFocus}/> 3
                            </label>
                        </div>
                        <label htmlFor="edt_sel1" className="col-xs-2 control-label">select</label>
                        <div className="col-xs-4">
                            <select id="edt_sel1" className={F.getSelClass(activeEid == 'edt_sel1')}
                                    onFocus={handleFocus}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edt_in3" className="col-xs-2 control-label">座位</label>
                        <div className="col-xs-10">
                            <input id="edt_in3" className={F.getSelClass(activeEid == 'edt_in3')}
                                   onFocus={handleFocus}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2">
                            <button id="edt_btn1" className={F.getSelClass(activeEid == 'edt_btn1', 'button')}
                                    onFocus={handleFocus}>确认
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
PassengerEdit.propTypes = {
    immutableProps: React.PropTypes.any.isRequired,
}
PassengerEdit.contextTypes = {
    immutableContext: React.PropTypes.any,
    handleFocus: React.PropTypes.func,
}
export default PassengerEdit