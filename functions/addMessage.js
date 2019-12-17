// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
const functions=require('firebase-functions');

const admin = require("firebase-admin");
//import serviceAccount from('./AccountKey');
//var serviceAccount = require("./AccountKey");
//require('./AccountKey.json');
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blog-web-3a606.firebaseio.com"
});
*/
exports.addMessage =()=> functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });