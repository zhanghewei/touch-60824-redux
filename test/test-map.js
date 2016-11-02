"use strict"

const DEFAULT_INPUT = "mainInput"
const QUERY = 'pattern-query'
const DEFAULT_PATTERN = QUERY
const LIST = 'list'
const SELECT = 'pattern-select'
const SELECT2 = 'pattern-select2'
const DEVICE = 'pattern-device'
const NET = 'pattern-net'
const OPERATOR = 'pattern-operator'
const BLANK = ''
const EDIT = 'pattern-edit'
const PREFIX = {
  [QUERY]: "qry_",
  [SELECT]: "sel_",
}
const eid = 'sel_1231'
let dataId = null
// if (eid.startsWith(PREFIX[QUERY])) {
//   dataId = eid.substring(PREFIX[QUERY].length, eid.length)
// }
// if (eid.startsWith(PREFIX[SELECT])) {
//   dataId = eid.substring(PREFIX[SELECT].length, eid.length)
// }
// for (let v of PREFIX.values()){
//   if(eid.startsWith(v)){
//     dataId = eid.substring(v.length, eid.length)
//   }
// }
// console.log(dataId)

// PREFIX.forEach((v, k) => console.log(` ${k} : ${v}`))
// for(let k of Object.keys(PREFIX)){
//   console.log(`${k} : ${PREFIX[k]}`)
// }
for(let v of Object.values(PREFIX)){
  console.log(`${v}`)
}
