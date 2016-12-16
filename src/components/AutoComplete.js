import React from 'react';
import * as F from '../Functions'

export default class AutoComplete extends React.Component {
    constructor() {
        super()

        this.state = {
            list: [],
            hidden: true,
            liIndex: -1
        }
    }

    doOnBlur() {

        // this.hideList.call(this)
    }

    selectValue(value, e) {

        if (typeof this.props.onItemClick === 'function') {
            this.props.onItemClick(value);
        }

        $(e.target).parents('ul').prev().focus();
        this.hideList.call(this);
    }

    // showList() {
    //     if (this.state.list.length > 0) {
    //         this.setState(Object.assign({}, this.state, {
    //             hidden: false
    //         }))
    //     }
    // }

    hideList() {
        this.setState(Object.assign({}, this.state, {
            hidden: true
        }))
    }

    reloadList(value) {
        let dataOptions = this.props['data-options'];
        if (dataOptions) {
            let list = [], s = new Set();
            for (let o of dataOptions.split(',')) {
                if (!value || o.indexOf(value.toLocaleUpperCase()) == 0) {
                    // list.push(o)
                    s.add(o);
                }
            }
            s.forEach(k=>list.push(k));
            this.setState(Object.assign({}, this.state, {
                list: list,
                hidden: list.length == 0
            }))
        }
    }

    doOnKeyDown(e) {

        if ((e.which == 40 || e.which == 38) && this.state.list.length > 0 && !this.state.hidden) {
            F.stopEvent(e);
        }
    }

    doOnKeyUp(e) {

        console.log(e.which, e.target)

        let $target = $(e.target);

        if ($target.is('input')) {
            // if (e.which == 13 || e.which == 32) {//Enter 空格
            if (e.which == 32) {// 空格
                this.reloadList.call(this, e.target.value);
            } else {
                let c = String.fromCharCode(e.which);
                if (/[0-9a-z]/gi.test(c) || e.which == 8) {//backspace
                    this.reloadList.call(this, e.target.value);
                }
            }
        } else if ($target.is('a')) {

        }

        if (e.which == 27) {//esc
            this.hideList.call(this);
            $target.parents('div').first().find('input').focus();
        } else if ((e.which == 40 || e.which == 38) && this.state.list.length > 0 && !this.state.hidden) {//上下选择

            let maxLen = this.state.list.length,
                currIndex = this.state.liIndex;
            currIndex = e.which == 40 ? currIndex + 1 : currIndex - 1;
            if (currIndex >= maxLen) {
                currIndex = 0
            } else if (currIndex < 0) {
                currIndex = maxLen;
            }
            this.setState(Object.assign({}, this.state, {
                liIndex: currIndex
            }))

            $target.parents('div').find('ul li a[data-index=item-' + currIndex + ']').focus();
            F.stopEvent(e);
        }
    }

    render() {

        let _me = this

        return (
            <div onKeyDown={this.doOnKeyDown.bind(this)} onKeyUp={this.doOnKeyUp.bind(this)}
                 onBlur={this.doOnBlur.bind(this)}>
                <input {...this.props} />
                <ul className="dropdown-menu dcs-selectable-container autocompletediv"
                    style={{display: _me.state.hidden ? 'none' : ''}} role="menu">

                    {
                        _me.state.list.map(function (o, i) {
                            return <li key={o}><a data-index={'item-' + i} key={o} href="#" data-toggle="tab"
                                                  className="autocompleteli dcs-selectable"
                                                  onClick={_me.selectValue.bind(_me, o)}>{o}</a>
                            </li>
                        })
                    }

                </ul>
            </div>
        )
    }
}