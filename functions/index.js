const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const getmessage = require('./addMessage');               //---Add Message function
const sendMail = require('./function/sendMail');          //---Send mail function
const publish = require('./function/publish');            //---On Publish function
const delete_post = require('./function/delete_post');    //---On Post delete function
const onsubscribe = require('./function/on_subscription');//---On subscribe function

exports.addMessage = getmessage.addMessage();
exports.sendMail = sendMail.sendmail();
exports.publish_post = publish.publish_post();
exports.delete_post = delete_post.delete_post();
exports.onsubscribe = onsubscribe.onSubcribe();