import * as C from './Constants'

export function resizeWin() {
    var ch = document.documentElement.clientHeight;
    document.getElementById("mainContainer").style.height = (ch - 100) + "px"
}

export function stopEvent(e) {
    e.preventDefault()
    e.stopPropagation()
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
        c = 'btn btn-xs btn-default'
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