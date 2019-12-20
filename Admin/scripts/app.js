document.addEventListener('DOMContentLoaded', function () {
    try{
        let App=firebase.app();
        let db=firebase.firestore();
        db.collection('total_posts').doc('total_posts')
        .onSnapshot(function(doc) {
            document.getElementById("sub_count").innerHTML=doc.data().sub_count;
            document.getElementById("count").innerHTML=doc.data().count;
            console.log("Current data: ", doc.data());
        });
    }catch(E){
        console.log(E);
    }
});