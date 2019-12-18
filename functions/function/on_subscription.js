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

exports.onSubcribe=()=>functions.firestore
.document('Subscribers/{mail}')
.onCreate((snap,context)=>{
    let incr = admin.firestore().collection('total_posts').doc('total_posts')
            .update({
                sub_count: admin.firestore.FieldValue.increment(1)
            });
//-------send subcription mail--------
console.log("mail : "+snap.data().mail);
console.log("name : "+snap.data().name);
let html="<div style='border-style: solid; border-width: 2px; border-color: black;'>";
html+="<div style='text-align: center;'>";
html+="<img src='blog-web-3a606.web.app/images/welcome2.png' alignment='center' height='60' alt='welcome'></div>";
html+="<div style='padding: 8px;'><p>Hello <strong> "+snap.data().name+" </strong>,</p><p>Thank you for subscribing us .</p>";
html+="<p style='text-align: justify;'>We will deliver best contents to you. You will get notified when new blog/post get uploaded.";
html+="You can unsubscribe any time whenever you want.</p><a href='blog-web-3a606.web.app/index.html'>Our Homepage</a>";
html+="<div style='text-align: right;'><h4>Thank you : <br> Ajinkya Kumbhar.</h4></div>";
html+="<p style='color: rgb(70, 70, 70);'> To unscubscribe click <a href='blog-web-3a606.web.app'>here</a>.</p></div></div>";
            const mailOptions = {
                from: 'Ajinkya Kumbhar<20akumbhar@gmail.com>',
                to: snap.data().mail,
                subject: 'subscription done..',
                html: html
            };
            transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    console.error("mail not send :"+erro.message);
                    return "error";
                }
                console.log("sended..");
                return "sended";
            });

return incr;
});