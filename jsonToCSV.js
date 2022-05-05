import {Parser} from 'json2csv'
import fs from 'fs-extra'

const shopsDir = 'D:/tinderApp_index_test/shopee'

const shops = fs.readdirSync(shopsDir)

const testshop = 'shop_2175202'

const items = fs.readdirSync(shopsDir+'/'+testshop+'/itemsInfo_tinder')

const jsonData = []

// 每一家店讀一次
const insertToJsonArr = (arr, itemPath) => {
  const itemJson = fs.readJSONSync(shopsDir+'/'+testshop+'/itemsInfo_tinder'+'/'+itemPath)
  let csvdata = {
    sp_shopid: itemJson.sp_shopid,
    name: itemJson.name,
    labels: itemJson.labels.map(e => e.display_name).join('@@'),
    feLabels: itemJson.feLabels.map(e => e.display_name).join('@@')
  }
  arr.push(csvdata)
}

insertToJsonArr(jsonData, items[3])
insertToJsonArr(jsonData, items[4])
insertToJsonArr(jsonData, items[5])
console.log(jsonData)

const json2csvParser = new Parser();
const csv = json2csvParser.parse(jsonData);
fs.appendFileSync('./test.csv',csv)


console.log(csv);