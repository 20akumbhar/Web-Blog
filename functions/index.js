const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const nodemailer = require('nodemailer');
const getmessage = require('./addMessage');

exports.addMessage=getmessage.addMessage();
//const cors=require('cors')({origin: true});

let transporter=nodemailer.createTransport({
  service: 'gmail',
  host:'smtp.gmail.com',
  secure:false,
  requireTLS: true,
  auth:{
    user : '20akumbhar@gmail.com',
    pass: 'waehoprhzjpjqpje'
  }
});

//------------------ publish Post-------------------------------------------------------------

//------------increment counter---------------------------------------------------------------
  exports.publish_post = functions.firestore
    .document('Posts/{userId}')
    .onCreate((snap, context) => {
      let rec="";
      let incr=admin.firestore().collection('total_posts').doc('total_posts')
      .update({
        count: admin.firestore.FieldValue.increment(1)
      });



//------------get mail recievers--------------------------------------------------------------


    var db=admin.firestore();
    db.collection('Subscribers').get().then(snapshot=>{
      snapshot.forEach(doc=>{
        rec=rec+doc.id+",";
        console.log(rec);
      });
      rec=rec+"20akumbhar@gmail.com";
      console.log("recievers : "+rec);
      const mailOptions={
        from:'Ajinkya Kumbhar<20akumbhar@gmail.com>',
        to: rec,
        subject:'subject will be here',
        html:'<h3>'+snap.data().Title+'</h3><br><img src="'+snap.data().Thumbnail+'"><br><button>View Post</button>'
      };
      transporter.sendMail(mailOptions,(erro,info)=>{
        if(erro){
          return "error";
        }
        return "sended";
      });
    
      return "";
    }).catch(reason => {
      console.log("error : no data");
      return "error";
  })


//-------------send mail------------------------------------------------------------------------



  //const dest=req.query.dest;
  

  



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

   
    exports.sendmail=functions.https.onRequest((req,res)=>{
      cors(req,res,()=>{
        const dest=req.query.dest;
        const mailOptions={
          from:'Ajinkya Kumbhar<20akumbhar@gmail.com>',
          to: dest,
          subject:'subject will be here',
          html:'<p>hiii hello</p>'
        };

        return transporter.sendMail(mailOptions,(erro,info)=>{
          if(erro){
            return res.send(erro.toString());
          }
          return res.send('sended');
        });


      });
    });