"use strict"
let a = [1, 2]
let b = [3, 4, 5]
let c = a.concat(b)
console.log(c)

c.forEach((ele, i) => {
  console.log(ele)
  if(ele == 3){
    // console.log(ele)
    return false
}
})

for(let index of c.keys()){
  console.log(`ele is ${c[index]}, index is ${index}`)
  if(index == 3){
    break
  }

}