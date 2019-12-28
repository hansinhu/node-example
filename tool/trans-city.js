const fs = require('fs')

const stateList = require('./state')
const stateMap = require('./state-city')
const stateMapObj = stateMap.body.stateCityDTOMap

// console.log(stateList.length, Object.keys(stateMapObj).length, stateMapObj.Rajasthan)

const transCityMap = {}

const transStateList = Object.keys(stateMapObj).map((item, i) => {
  transCityMap[186 + i] = Object.keys(stateMapObj[item])
  return {
    value: 186 + i,
    label: item,
  }
})

console.log(transStateList, transCityMap)
fs.writeFileSync('./trans-end/city-map.js', `const cistyMapJsonStr = '${JSON.stringify(transCityMap)}'`)
