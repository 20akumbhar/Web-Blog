
    var chip_count=0;
    var tags=["","","","",""];
    var quill = new Quill('#editor-container', {
      modules: {
        formula: true,
        syntax: true,
        toolbar: '#toolbar-container'
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    });




    //----------------------- Publish Button Click ----------------------------------------------


    function isvalid() {
    
      //---------title validation---------------------
      var title = $("#title").val();
      if(title===""){
        $("#title-err").removeClass("invisible");
        $("#title").addClass("border-danger");
        window.location.href="#title";
        return false;
      }else{
        $("#title-err").addClass("invisible");
        $("#title").removeClass("border-danger");
      }

      //------------thumbnail validation---------------
      var thumbnaildata = $("#thumb").prop("files")[0];
      if(thumbnaildata==null){
        $("#thumb-err").show();
            $("#thumbnail").fadeOut();
            $("#thumb-div").addClass("border-danger");
            window.location.href="#thumb-div";
            return false;
      }else if($.inArray(thumbnaildata["type"], validImageTypes) < 0){     
        $("#thumb-err").show();
        $("#thumbnail").fadeOut();
            $("#thumb-div").addClass("border-danger");
            window.location.href="#thumb-div";
            return false;
      }else {
        $("#thumb-err").hide();
            $("#thumbnail").fadeIn();
            $("#thumb-div").removeClass("border-danger");
      }

      //-----------post validation---------------------
      var html = quill.root.innerHTML;
      if(html==="<p><br></p>"){
        $("#post-err").removeClass("invisible");
        $("#editor-container").addClass("border-danger");
        return false;
      }else{
        $("#post-err").addClass("invisible");
        $("#editor-container").removeClass("border-danger");
      }
//------------correct data--------------

//addData();
console.log("title :"+title);
      console.log("delta : " + html);
      console.log("tags :"+tags);
return true;
    }
    
    
    //-------------------------------------------------------------------------------------------





//-----------------------------------------------------------------------------------------------





    var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    $("#thumbnail").hide();
    $("#thumb-err").hide();

    $("#thumb").change(function () {
      
      var thumbnaildata = $("#thumb").prop("files")[0];

      if ($.inArray(thumbnaildata["type"], validImageTypes) < 0) {
            $("#thumb-err").show();
            $("#thumbnail").fadeOut();
            $("#thumb-div").addClass("border-danger");

            return;
          } else {
            $("#thumb-err").hide();
            $("#thumbnail").fadeIn();
            $("#thumb-div").removeClass("border-danger");

          }

      previewThumbnail(this);
      // var thumbnail = $("#thumb").prop("files")[0];

    });

    function previewThumbnail(thumbnail) {
      if (thumbnail.files && thumbnail.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#thumbnail").attr('src', e.target.result);
        }
        reader.readAsDataURL(thumbnail.files[0]);
      }
    }

    $("#add-tag").click(function () {
      
      var text = $("#chip-text").val();
      tags[chip_count]=text;
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
    });

    function deletechip(count){
      $("#chip-"+count).hide();
      chip_count--;
      $("#chip-text").prop( "disabled", false );
      $("#add-tag").prop("disabled", false);

    }
//-------------model on success
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})