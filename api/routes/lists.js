var express = require("express");
var router = express.Router();

const { connectToDatabase } = require("../db/conn");

// import { ObjectId } from "mongodb";
var ObjectId = require('mongodb').ObjectId;

//READ ALL
router.get("/", async function(req, res, next) {
    const db = await connectToDatabase();
    console.log("READ ALL");
    let collection = await db.collection("lists");
    let results = await collection.find({})
        .limit(5)
        .toArray();
    
    res.send(results).status(200);
});

//READ SPECIFIC
router.get("/:idSteam", async function(req, res, next) {
    const db = await connectToDatabase();
    console.log("ID STEAM:", req.params);
    console.log("READ ONE");
    let collection = await db.collection("lists");
    let query = { idSteam: req.params.idSteam };
    let result = await collection.findOne(query);

    if (!result) res.send("Não Achei").status(404);
    else res.send(result).status(200);
});

//ADD NEW
router.post("/", async function(req, res, next) {
    const db = await connectToDatabase();

    let collection = await db.collection("lists");
    let result = await collection.insertOne(req.body);
    res.send(result).status(204);
});

//UPDATE
router.patch("/addgame/:id", async function(req, res, next) {
    const db = await connectToDatabase();

    const query = { _id: ObjectId(req.params.id) };
    const updates = {
        $push: { toPlay: req.body }
    };

    let collection = await db.collection("lists");
    let result = await collection.update(query, updates);

    res.send(result).status(200);
});

//DELETE
router.delete("/:id", async function(req, res, next) {
    const db = await connectToDatabase();

    const query = { _id: ObjectId(req.params.id) };
    const collection = db.collection("lists");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

module.exports = router;