const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')

const admin = require('firebase-admin')
admin.initializeApp()

const app = express()

app.get('/', (req, res) => {

})

app.poat('/', (req, res) => {
  const user = req.body

  await admin.firestore().collection('users').add(user)

  res.status(201).send()
})

exports.user = functions.https.onRequest(app)

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
