import fs from "fs-extra";
import mongo from "mongodb";

let MongoClient = mongo.MongoClient;    
// Database Name
const dbName = 'tinderAppIndexTest'

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("connected")
    const database = client.db(dbName);
    const  pPost = database.collection('testItemIndex');
    
    // 主程式===================================================================
    const main_folder_path = "D:/tinderApp_index_test/shopee";
    const obj_folder = "itemsInfo_tinder"
    const all_folders_in_main = fs.readdirSync(main_folder_path)

    for(let i=0; i<all_folders_in_main.length; i++) {
      let itemsPath = main_folder_path+"/"+all_folders_in_main[i]+"/"+obj_folder
      const items = fs.readdirSync(itemsPath)
      for (const item of items) {
        await pPost.insertOne(fs.readJSONSync(itemsPath+"/"+item))
      }
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// 主程式
// run().catch(console.dir);