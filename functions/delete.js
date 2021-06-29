// requests Rest API
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")
const app = express();

const admin = require("firebase-admin");
admin.initializeApp();
app.use(cors({origin: true}))
const collectionName = "requests";

// GET query without parameters
app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection(collectionName).get();

  const users = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    users.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(users));
});

// GET query with parameters

// app.get("/:id", async (req, res) => {
//   const collection = await admin.firestore().collection(collectionName);
//   const snapshot = await collection.doc(req.params.id).get();

//   const docId = snapshot.id;
//   const docData = snapshot.data();

//   res.status(200).send(JSON.stringify({id: docId, ...docData}));
// });

// POST query
app.post("/", async (req, res) => {
  const users = req.body;
  await admin.firestore().collection(collectionName).add(users);
  res.status(201).send();
});

// PUT query
app.put("/:id", async (req, res) => {
  const body = req.body;

  const collection = await admin.firestore().collection(collectionName);
  await collection.doc(req.params.id).update({...body});

  res.status(200).send();
});

// DELETE query
app.delete("/:id", async (req, res) => {
  const collection = await admin.firestore().collection(collectionName);
  await collection.doc(req.params.id).delete();

  res.status(200).send();
});

exports.requests = functions.https.onRequest(app);

// //users Rest API

// const appUsers = express();

// // GET query without parameters
// appUsers.get("/", async (req, res) => {
//     const snapshot = await admin.firestore().collection(collectionName).get();
  
//     const users = [];
//     snapshot.forEach((doc) => {
//       const id = doc.id;
//       const data = doc.data();
  
//       users.push({id, ...data});
//     });
  
//     res.status(200).send(JSON.stringify(users));
//   });
  
  // GET query with parameters

//   appUsers.get("/:id", async (req, res) => {
//     const collection = await admin.firestore().collection(collectionName);
//     const snapshot = await collection.doc(req.params.id).get();
  
//     const docId = snapshot.id;
//     const docData = snapshot.data();
  
//     res.status(200).send(JSON.stringify({id: docId, ...docData}));
//   });
  
  // POST query
//   appUsers.post("/", async (req, res) => {
//     const users = req.body;
//     await admin.firestore().collection(collectionName).add(users);
//     res.status(201).send();
//   });
  
//   // DELETE query
//   appUsers.delete("/:id", async (req, res) => {
//     const collection = await admin.firestore().collection(collectionName);
//     await collection.doc(req.params.id).delete();
  
//     res.status(200).send();
//   });
  
// exports.users = functions.https.onRequest(appUsers);
