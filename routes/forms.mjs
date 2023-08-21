import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

// Fetches the latest posts
router.get("/latestform", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let results = await collection.aggregate([
    {"$limit": 3}
  ]).toArray();
  res.send(results).status(200);
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

//insert document
router.post("/", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});



router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("FormResponseDB");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
