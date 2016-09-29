/**
 * Created by mac on 16/9/29.
 */
const QUERY = 'pattern-query'
const CHOOSE = 'pattern-choose'
const EDIT = 'pattern-edit'
const PATTERNS = {
  [QUERY]: "query",
  [CHOOSE]: "choose",
  [EDIT]: "edit",
}
export default CHOOSE
console.log(PATTERNS[QUERY])
PATTERNS[CHOOSE]