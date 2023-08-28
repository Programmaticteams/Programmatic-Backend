import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

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
  const existingDocument = await collection.findOne({ email: newDocument.email });

  if (existingDocument) {
    res.status(400).send("Document with the same unique identifier already exists.");
  } else {
    const result = await collection.insertOne(newDocument);
    res.status(204).send(result);
  }
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
  const existingDocument = await collection.findOne({ email: newDocument.email });

  if (existingDocument) {
    res.status(400).send("Document with the same unique identifier already exists.");
  } else {
    const result = await collection.insertOne(newDocument);
    res.status(204).send(result);
  }
});





//PASSWORD

router.post('/login', async (req, res) => {
  try {

    const username = req.body.user;
    const enteredPassword = req.body.pwd;
    let logincollect = db.collection("AdminLogin")

    const userDoc = await logincollect.findOne({ user: username });

    if (userDoc) {
      const hashedPassword = userDoc.pwd;

      const passwordMatch = await bcrypt.compare(enteredPassword, hashedPassword);

      if (passwordMatch) {
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error.message);
  }
});
export default router;
