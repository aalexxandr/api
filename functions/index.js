const domains = [
  "http://localhost:3000",
  "http://srv85564.ht-test.ru"
];

const corsParams = {
  origin: domains
}
// creating the RestApi functions for - "requests" 

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")

const appRequests = express();
appRequests.use(cors(corsParams))

const admin = require("firebase-admin");
admin.initializeApp();

const requestsCollectionName = "requests";
const usersCollectionName = "users";

// GET query without parameters
appRequests.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection(requestsCollectionName).get();

  const users = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    users.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(users));
});

// GET query with parameters
// appRequests.get("/:id", async (req, res) => {
//   const collection = await admin.firestore().collection(requestsCollectionName);
//   const snapshot = await collection.doc(req.params.id).get();

//   const docId = snapshot.id;
//   const docData = snapshot.data();

//   res.status(200).send(JSON.stringify({id: docId, ...docData}));
// });

// POST query
appRequests.post("/", async (req, res) => {
  const users = req.body;

  await admin.firestore().collection(requestsCollectionName).add(users);
  res.status(201).send();
});

// PUT query
appRequests.put("/:id", async (req, res) => {
  const body = req.body;

  const collection = await admin.firestore().collection(requestsCollectionName);
  await collection.doc(req.params.id).update({...body});

  res.status(200).send();
});

// DELETE query
appRequests.delete("/:id", async (req, res) => {
  const collection = await admin.firestore().collection(requestsCollectionName);
  await collection.doc(req.params.id).delete();

  res.status(200).send();
});


// creating the RestApi functions for - "users"

const appUsers = express();
appUsers.use(cors(corsParams))

// GET query without parameters
appUsers.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection(usersCollectionName).get();

  const users = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    users.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(users));
});

// POST query
appUsers.post("/", async (req, res) => {
  const users = req.body;

  await admin.firestore().collection(usersCollectionName).add(users);
  res.status(201).send();
});

// PUT query
appUsers.put("/:id", async (req, res) => {
  const body = req.body;

  const collection = await admin.firestore().collection(usersCollectionName);
  await collection.doc(req.params.id).update({...body});

  res.status(200).send();
});

// DELETE query
appUsers.delete("/:id", async (req, res) => {
  const collection = await admin.firestore().collection(usersCollectionName);
  await collection.doc(req.params.id).delete();

  res.status(200).send();
});

exports.requests = functions.https.onRequest(appRequests);
exports.users = functions.https.onRequest(appUsers);
