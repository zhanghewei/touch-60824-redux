import * as C from './Constants'

export function resizeWin() {
    var ch = document.documentElement.clientHeight;
    document.getElementById("mainContainer").style.height = (ch - 100) + "px"
}

export function stopEvent(e) {
    e.preventDefault()
    e.stopPropagation()
    e.returnValue = false;
}

/**
 * 可选择元素的class
 * @param id
 * @param elType
 * @returns {string}
 */
export function getSelClass(isActive, elType) {
    let c = 'form-control'
    if ('checkbox' == elType) {
        c = 'checkbox-inline'
    }
    if ('button' == elType) {
        c = 'btn btn-default'
    }
    if (isActive) {
        c += " sel-active"
    }
    return c
}

/**
 * 根据元素id获取对应数据
 *
 * todo 目前只用于选中区元素
 * @param eid
 * @returns {*}
 */
export function getDataByEid(eid, dataList) {
    if (eid == null) {
        return false
    }
    let dataId = C.BLANK
    for (const k of Object.keys(C.PREFIX)) {
        const v = C.PREFIX[k]
        if (eid.startsWith(v)) {
            dataId = eid.substring(v.length, eid.length)
        }
    }
    if (dataId == C.BLANK) {
        return false
    }
    for (const [i, o] of dataList.entries()) {
        if (o.id == dataId) {
            return [i, o]
        }
    }
    return false
}

/**
 * 请求后台服务数据
 * @param api   API
 * @param cmd   CMD
 * @param callback  成功的回调
 * @param params    参数
 * @param errorOp   失败的回调
 * @param timeout   超时时间
 * @param sync      是否同步
 */
export function requestJson(api, cmd, callback, params, errorOp, timeout, sync) {

    params = params || {};
    Object.assign(params, {
        version: '9.0.2',
        isWorking: dcs().net && dcs().net.working ? true : false
    })
    timeout = timeout || C.REQUEST_TIMEOUT;
    errorOp = errorOp || function (errMsg) {
            console.error('request json occurred!', arguments);
            alert('错误：' + errMsg);
        };
    const processFn = function (data) {

        if (!data) {
            errorOp.call(null, data);
            return;
        }
        if (data.success === false) {
            errorOp.call(null, data.msg);
        } else {
            // console.log(api, cmd, callback, data);
            callback.call(null, data);
        }
    };
    const token = dcs().token;
    if (token) {
        params = Object.assign(params, {
            flu: token.fl.uui,
            counter: token.counter,
            stc: token.stc,
            bcf: token.bcf,
            fu: token.fl.fu,
            dap: token.dap
        })
    }
    return $.ajax({
        url: C.SERVER_URL + '/cki?api=' + api + '&cmd=' + cmd + "&_t=" + new Date().getTime(),
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        timeout: timeout,
        type: 'post',
        data: params,
        async: !sync,
        byRequestJsonMethod: true,
        success: processFn,
        error: function (a) {
            // console.error(arguments);
            errorOp.call(null, a.statusText);
        }
    });
}

export function dcs() {

    if (!window.dcs) {
        window.dcs = {};
    }
    return window.dcs;
}

// export function initKeyboardEvent() {
//
//     let upFn = function () {
//
//     }
//
//     let downFn = function () {
//
//     }
//
//     $(document).delegate('body', 'keydown', function (e) {
//
//         let which = e.which;
//
//         console.log(e, which)
//
//         if (which == 37 || which == 38 || (which == 9 && e.shiftKey)) {//Up Left Shift+Tab
//
//         } else if (which == 39 || which == 40 || (which == 9 && !e.shiftKey)) {//Down Right Tab
//
//         }
//     })
// }