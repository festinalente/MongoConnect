/**
 * @module MongoDB connection pool.
 * @description fetch a connection as follows: 
 *  const db = () => {
 *   const mongoConnect = customModules('mongoConnect');
 *   return mongoConnect.getDb();
 * };
 */

const mongopass = process.env.mongopass;
const dbname = process.env.dbname;
const dbusername = process.env.dbusername;
const urlSt = process.env.mongoDBUrl;
let url;

/**
 * @function IIF that composes a URL for .env variables.
 * @description
 * Place your variables in .env
 * urlSt looks as follows:
 * mongoDBUrl=mongodb+srv://${dbusername}:${mongopass}@cluster0.***.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority
 */
(() => {
  url = urlSt;
  url = url.replaceAll('${mongopass}', mongopass);
  url = url.replaceAll('${dbusername}', dbusername);
  url = url.replaceAll('${dbname}', dbname);
})();

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let _db;

module.exports = {
  getDb,
  initDb
};

async function initDb() {
  _db = await client.connect();
  console.log(`Connected to ${dbname} database`);
}

function getDb() {
  assert.ok(_db, `Db has not been initialized. Please call init first.`);
  return _db;
}
