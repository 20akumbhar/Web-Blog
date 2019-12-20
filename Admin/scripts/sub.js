document.addEventListener('DOMContentLoaded', function () {
    try {
        let app = firebase.app();
        let db = firebase.firestore();
        var Subscribers = "";
        db.collection("Subscribers")
            .onSnapshot(function (querySnapshot) {
                Subscribers = "";
                querySnapshot.forEach(function (doc) {
                    Subscribers += "<div class='card bg-dark' style='color: white; text-align: center; margin: 20px;'>";
                    Subscribers += "<div class='row'><div class='col-lg-7'><div style='text-align: left; margin-left: 20px;'>";
                    Subscribers += "<h4 class='align-middle' style='display: block;'>"+doc.data().name+"</h4>";
                    Subscribers += "(" + doc.data().mail + ")</div></div>";
                    Subscribers += "<div class='col-lg'><button class='btn btn-danger float-right' style='margin: 10px;' onclick=Unsubscribe('" + doc.data().mail + "')>Unsubscribe</button>";
                    Subscribers += "</div></div></div>";
                    //$(".sub-container").append(Subscribers);
                });
                document.getElementsByClassName("sub-container")[0].innerHTML = Subscribers;
                console.log("Data Loaded");
            });

    } catch (e) {
        console.error(e);
    }
});

function Unsubscribe(mail) {
    firebase.firestore().collection("Subscribers").doc(mail).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}