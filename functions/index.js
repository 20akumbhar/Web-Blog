const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
  exports.publish_post = functions.firestore
    .document('Posts/{userId}')
    .onCreate((snap, context) => {
      let incr=admin.firestore().collection('total_posts').doc('total_posts')
      .update({
        count: admin.firestore.FieldValue.increment(1)
      });
      return incr;
    });

    exports.delete_post = functions.firestore
    .document('Posts/{userId}')
    .onDelete((snap, context) => {
      let decr=admin.firestore().collection('total_posts').doc('total_posts')
      .update({
        count: admin.firestore.FieldValue.increment(-1)
      });
      return decr;
    });