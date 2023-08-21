import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://programmaticteams:hUChMBEcDJkfLeld@formresponse.mmvv36b.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("FormResponses");
// async function listCollections(databaseName) {
//   const database = client.db(databaseName);
//   const collections = await database.listCollections().toArray();
//   console.log(`Collections in ${database.databaseName}:`);
//   collections.forEach(collection => console.log(` - ${collection.name}`));
// }

// await listCollections("FormResponses")
export default db;