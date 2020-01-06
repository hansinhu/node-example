const fs = require('fs')

const stateList = require('./state')
const stateMap = require('./state-city')
const stateMapObj = stateMap.body.stateCityDTOMap

// console.log(stateList.length, Object.keys(stateMapObj).length, stateMapObj.Rajasthan)

const transCityMap = {}

const transStateList = Object.keys(stateMapObj).map((item, i) => {
  const citys = Object.keys(stateMapObj[item])
  const widthIdItem = stateList.filter(state => state.label === item)
  if (item === 'Orissa') {
    console.log(widthIdItem)
  }
  const id = widthIdItem && widthIdItem[0] ? widthIdItem[0].value : 0
  transCityMap[id] = citys
  
  return {
    value: id,
    label: item,
    city: citys,
  }
}).sort((a, b) => a.value - b.value)

console.log(transCityMap[1868])

fs.writeFileSync('./trans-end/city-map.js', `const cistyMapJsonStr = '${JSON.stringify(transCityMap)}'`)
fs.writeFileSync('./trans-end/in.js', `${JSON.stringify(transStateList)}`)
