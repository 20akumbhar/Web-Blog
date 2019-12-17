const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
        user: '20akumbhar@gmail.com',
        pass: 'waehoprhzjpjqpje'
    }
});

exports.publish_post = () => functions.firestore
    .document('Posts/{userId}')
    .onCreate((snap, context) => {
        let rec = "";
        let incr = admin.firestore().collection('total_posts').doc('total_posts')
            .update({
                count: admin.firestore.FieldValue.increment(1)
            });

        //------------get mail recievers--------------------------------------------------------------


        var db = admin.firestore();
        db.collection('Subscribers').get().then(snapshot => {
            snapshot.forEach(doc => {
                rec = rec + doc.id + ",";
                console.log(rec);
            });
            rec = rec + "20akumbhar@gmail.com";
            console.log("recievers : " + rec);
            const mailOptions = {
                from: 'Ajinkya Kumbhar<20akumbhar@gmail.com>',
                to: rec,
                subject: 'subject will be here',
                html: '<h3>' + snap.data().Title + '</h3><br><img src="' + snap.data().Thumbnail + '"><br><button>View Post</button>'
            };
            transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    return "error";
                }
                return "sended";
            });

            return "";
        }).catch(reason => {
            console.log("error : no data");
            return "error";
        })
        return incr;
    });

