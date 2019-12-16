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

    } catch (e) {
        console.error(e);
    }
    var db = firebase.firestore();
    var docRef = db.collection("Posts").doc(doc_id);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            document.getElementById("title-id").innerHTML=doc.data().Title;
            document.getElementById("post-content").innerHTML=doc.data().delta;
            for(var i=0;i<5;i++){
                var text = doc.data().Tags[i];
               if(text!=""){
                   showtag(text);
               }
            }

         
            /*tags[chip_count]=text;
            chip_count++;
            var chip = "<div class='chip' id='chip-"+chip_count+"'>" + text + "<span class='closebtn'";
            chip = chip + "onclick=deletechip("+chip_count+"); >&times;</span></div>";
            $("#tag-area").append(chip);      
            if(chip_count>=5){
              $("#chip-text").prop( "disabled", true );
              $(this).prop("disabled", true);
            }
            else{
              $("#chip-text").prop( "disabled", false );
              $(this).prop("disabled", false);
            }
            $("#chip-text").val("");
*/



        } else {
            // doc.data() will be undefined in this case
            window.location.href="../404.html";
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
});


function showtag(text){
    var chip = "<div class='chip text-dark'>" + text ;
            chip = chip + "</div>";
            $("#chip-area").append(chip);      
           
           
}