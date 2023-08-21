import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
});



//insert document
router.post("/", async (req, res) => {
  let collection = await db.collection("FormResponseDB");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});



router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("FormResponseDB");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});



//VOLUNTEER STUFF

router.get("/volunteer", async (req, res) => {
  let collection = await db.collection("VolunteerDB");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
});


router.delete("/volunteer/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("VolunteerDB");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

//insert document
router.post("/volunteer", async (req, res) => {
  let collection = await db.collection("VolunteerDB");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});

export default router;
