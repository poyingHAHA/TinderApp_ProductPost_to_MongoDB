const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const connectionURL = 'mongodb://127.0.0.1:27017/'+dbName
const client = new MongoClient(url);

// Database Name
const dbName = 'tinderAppIndexTest'

await client.connect();
console.log('Connected successfully to server');

const db = client.db(dbName);
