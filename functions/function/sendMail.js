const functions = require('firebase-functions');
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

exports.sendmail = () => functions.https.onRequest((req, res) => {
    
        const dest = req.query.dest;
        const mailOptions = {
            from: 'Ajinkya Kumbhar<20akumbhar@gmail.com>',
            to: dest,
            subject: 'subject will be here',
            html: '<p>hiii hello</p>'
        };

        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('sended');
        });

});