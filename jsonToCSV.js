import {Parser} from 'json2csv'
import fs from 'fs-extra'

const shopsDir = 'D:/shopee'

const shops = fs.readdirSync(shopsDir)
const json2csvParser = new Parser();

const insertToJsonArr = (arr, itemShop, itemPath) => {
  const itemJson = fs.readJSONSync(shopsDir+'/'+itemShop+'/itemsInfo_tinder'+'/'+itemPath)
  let csvdata = {
    sp_shopid: itemJson.sp_shopid,
    name: itemJson.name,
    labels: itemJson.labels.map(e => e.display_name).join('@@'),
    feLabels: itemJson.feLabels.map(e => e.display_name).join('@@')
  }
  arr.push(csvdata)
}

shops.forEach((shop) => {
  const items = fs.readdirSync(shopsDir+'/'+shop+'/itemsInfo_tinder')
  const jsonData = []

  items.forEach((item) => {
    insertToJsonArr(jsonData, shop, item)
  })
  
  const csv = json2csvParser.parse(jsonData);
  fs.appendFileSync('./test.csv',csv)
})