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

export default db;