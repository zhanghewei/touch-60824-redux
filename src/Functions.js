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