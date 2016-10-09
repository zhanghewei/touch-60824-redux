var Immutable = require('immutable');
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
console.log(map1.get('b'))
console.log(map2.get('b'))


const DEFAULT_INPUT = "mainInput"
const QUERY = 'pattern-query'
const SELECT = 'pattern-select'
const BLANK = ''
const EDIT = 'pattern-edit'
const PREFIX = {
  [QUERY]: "qry_",
  [SELECT]: "sel_",
}
const data = {
  a:{
    b:"b1",
  },
  passengerData: [],
  pagePattern: QUERY,
  selectPattern: BLANK,
  queryList: [DEFAULT_INPUT],
  queryActive: DEFAULT_INPUT,
  selectList: [],
  selectActive: BLANK,
  editList: ['edt_in1', 'edt_in2', 'edt_chk1', 'edt_chk2',
             'edt_chk3',
             'edt_sel1',
             'edt_in3', 'edt_btn1'],
  editActive: BLANK,
}

var $$ = Immutable.Map(data)

var d2 = $$.set('pagePattern', 'b2')
console.log($$.get('pagePattern'))
console.log(d2.get('pagePattern'))

var d3 = $$.merge({'pagePattern': 'b2', 'selectPattern': 'aa'})
console.log($$.get('pagePattern'))
console.log(d3.get('pagePattern'))