//window.location="public/";
document.addEventListener('DOMContentLoaded', function () {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let db=firebase.firestore();
    let citiesRef = db.collection('light_post');
    var item="";
   let query = citiesRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          item="";
          console.log(doc.id, '=>', doc.data());
          item=item+"<div class='col-sm-3' style='padding-left: 20px; padding-top: 20px; text-align: center;'>";
          item=item+"<img src='"+doc.data().Thumbnail+"' width='150' height='150' alt='post img' class='border rounded-circle'>";
          item=item+"</div>";
          item=item+"<div class='col-sm-8 text-white' style='padding-top: 20px; padding-left: 20px;'>";
          item=item+"<h3 class='text-white'>"+doc.data().Title+"</h3>";
          item=item+"<i class='far fa-calendar-alt text-white'></i>"+doc.data().Date+"<span> </span>";
          item=item+"<i class='far fa-folder text-white' style='padding-left: 10px;'></i> Travel";
          item=item+"<i class='far fa-comment-dots text-white' style='padding-left: 10px;'></i> 13";
          item=item+"<a style='color: firebrick; cursor: pointer;' href='public/posts.html?id="+doc.data().post_id+"'>Read More ></a>";
          item=item+"</div>";
          $("#post-list").append(item);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });


      //---getting tags---
      
let tagRef = db.collection('tags');
var tags=[];
query = tagRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
            tags.push(doc.id);
        });
console.log("tags are"+tags);
autocomplete(document.getElementById("myInput"), tags);

    });
  } catch (e) {
    console.error(e);
  }


});