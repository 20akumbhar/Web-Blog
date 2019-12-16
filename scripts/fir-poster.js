
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
    var isfirsttimesaving = true;
    var savingid = "null";
    var db = firebase.firestore();
    var storage = firebase.storage();

    //----------------------Publishing ----------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------    
    $("#publish").click(function () {
        if (isvalid()) {
            $('.modal-body').show();
            document.getElementById("modal2-title").innerHTML = "Publishing..";
            $("#modal2-title").removeClass("text-white");

            $(".modal-c-3").removeClass("bg-success");
            $('.modal3').modal({
                show: true
            })
            var title = $("#title").val();
            var thumbnaildata = $("#thumb").prop("files")[0];
            var html = quill.root.innerHTML;
            console.log("From firebase :");
            console.log("title :" + title);
            console.log("delta : " + html);
            console.log("tags :" + tags);
            //-----------------Firebase Storage Uploaading thumbnail--------------
            var storageRef = storage.ref();
            var thumbname = new Date().getTime();
            var imagesRef = storageRef.child("images/" + thumbname + ".jpg");

            var uploadTask = imagesRef.put(thumbnaildata);


            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) { }, function (error) { }, function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        var today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        db.collection("Posts").add({
                            Title: title,
                            Thumbnail: downloadURL,
                            delta: html,
                            Tags: tags,
                            Date: date,
                            Time: time,
                            Status: "Published"
                        })
                            .then(function (docRef) {
                                console.log("Document written with ID: ", docRef.id);

                                $('.modal-body').hide();
                                document.getElementById("modal2-title").innerHTML = "Published Successfully";
                                $("#modal2-title").addClass("text-white");
                                $(".modal-c-3").addClass("bg-success");
                                window.location.href = "public/posts.html?id=" + docRef.id;
                            })

                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                            });
                    });
                });

        }

    });

    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------



    //--------------------------- Save Button Click     ---------------------------------------------



    $("#save").click(function () {

        $('.modal-body').show();
        document.getElementById("modal2-title").innerHTML = "Saving...";
        $("#modal2-title").removeClass("text-white");

        $(".modal-c-3").removeClass("bg-success");
        $('.modal3').modal({
            show: true
        });

        var title = $("#title").val();
        var html = quill.root.innerHTML;
        var thumbnaildata = $("#thumb").prop("files")[0];
        if (isfirsttimesaving) {}
        

            var storageRef = storage.ref();
            var thumbname = new Date().getTime();
            var imagesRef = storageRef.child("images/" + thumbname + ".jpg");
            if (thumbnaildata != null) {
                var uploadTask = imagesRef.put(thumbnaildata);


                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) { }, function (error) { }, function () {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('File available at', downloadURL);
                            var today = new Date();
                            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
if(isfirsttimesaving){

                            db.collection("Saved").add({
                                Title: title,
                                Thumbnail: downloadURL,
                                delta: html,
                                Tags: tags,
                                Date: date,
                                Time: time,
                                Status: "Saved"
                            })
                                .then(function (docRef) {
                                    console.log("Document written with ID: ", docRef.id);
                                    savingid=docRef.id;
                                    isfirsttimesaving=false;
                                    $('.modal-body').hide();
                                    document.getElementById("modal2-title").innerHTML = "Saved Successfully";
                                    $("#modal2-title").addClass("text-white");
                                    $(".modal-c-3").addClass("bg-success");
                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });

                            }else{
                                db.collection("Saved").doc(savingid).set({
                                    Title: title,
                                    Thumbnail: downloadURL,
                                    delta: html,
                                    Tags: tags,
                                    Date: date,
                                    Time: time,
                                    Status: "Saved"
                                })
                                .then(function() {
                                    console.log("Document successfully written!");
                                    $('.modal-body').hide();
                                    document.getElementById("modal2-title").innerHTML = "Saved Successfully";
                                    $("#modal2-title").addClass("text-white");
                                    $(".modal-c-3").addClass("bg-success");
                                });
                            }
                        });
                    
                    });
            } else {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if(isfirsttimesaving){
                db.collection("Saved").add({
                    Title: title,
                    Thumbnail: "Null",
                    delta: html,
                    Tags: tags,
                    Date: date,
                    Time: time,
                    Status: "Saved"
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        savingid=docRef.id;
                                    isfirsttimesaving=false;
                        $('.modal-body').hide();
                        document.getElementById("modal2-title").innerHTML = "Saved Successfully";
                        $("#modal2-title").addClass("text-white");
                        $(".modal-c-3").addClass("bg-success");
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                }else{
                    db.collection("Saved").doc(savingid).set({
                        Title: title,
                        Thumbnail: "Null",
                        delta: html,
                        Tags: tags,
                        Date: date,
                        Time: time,
                        Status: "Saved"
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                        $('.modal-body').hide();
                                    document.getElementById("modal2-title").innerHTML = "Saved Successfully";
                                    $("#modal2-title").addClass("text-white");
                                    $(".modal-c-3").addClass("bg-success");
                    });
                }
            }
        

    });







});

