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
            const mailOptions = {
                from: 'Ajinkya Kumbhar<20akumbhar@gmail.com>',
                to: snap.data().mail,
                subject: 'subscription done..',
                html: '<h3>Subscription Successfull <br> By:'+snap.data().name+'</h3>'
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