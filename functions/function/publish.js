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
        let counter = 0;
        let rec = "";
        // update counter in total_posts..
        let incr = admin.firestore().collection('total_posts').doc('total_posts')
            .update({
                count: admin.firestore.FieldValue.increment(1)
            });

        //===========html document ==========================================
        let html_data = "";
        html_data += "<div style='border-style: solid; border-width: 2px; border-color: black;'>";
        html_data += "<p style='margin-left: 8px; color: black; width: 80%;'>New Post from Blog-Site</p>";
        html_data += "<div style='text-align: center;'><h4>" + snap.data().Title + "</h4>";
        html_data += "<img src='" + snap.data().Thumbnail + "' width='80%' alt='blog thumbnail' srcset=''>";
        html_data += "<button style='display: inline-block; font-weight: 400; text-align: center; vertical-align: middle; background-color: rgb(0, 247, 255); ";
        html_data += " margin-top: 10px; margin-bottom: 10px; border: 1px solid rgb(0, 179, 185); padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem;'><font style='color: white;'><a href='blog-web-3a606.web.app/public/posts.html?id=" + snap.id + "'>View Post</a></font></button>";
        html_data += "<p style='color: rgb(70, 70, 70);'> To unscubscribe click <a href='#'>here</a>.</p></div></div>";

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
                html: html_data
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
        });
        return incr;
    });

