function subscribe(){
let name=$("#name").val();
let mail=$("#email").val();
if(name==""){
    document.getElementById("name-err").innerHTML="Required **";
    return;
}else{
    document.getElementById("name-err").innerHTML="";
    }
if(mail==""){
    document.getElementById("mail-err").innerHTML="Required **";
    return;   
}else{
    document.getElementById("mail-err").innerHTML="";
}
if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))){
    document.getElementById("mail-err").innerHTML="invalid mail id **";
    return;
}
//------------subscribe user------------------
let db=firebase.firestore();

var SubRef = db.collection('Subscribers').doc(mail);

var setWithMerge = SubRef.set({
    mail: mail,
    name: name
}).then(function() {
    $("#sub-modal").modal('hide');
    console.log("Subsccription successfully written!");
});



}


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });

  