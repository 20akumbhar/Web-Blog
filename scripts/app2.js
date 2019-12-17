$("#toggle-icon").click(function(){
 $("#sidebar").toggleClass("side-bar");
 $(".close").toggleClass("button-show");
 $("#toggle-icon").toggleClass("button-show");
});

$(".close").click(function(){
    $("#sidebar").toggleClass("side-bar");
    $(".close").toggleClass("button-show");
    $("#toggle-icon").toggleClass("button-show");
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });



  function switchview(view){
      $.get({
          url:view,
          cache: false
      }).then(function(data){
          $("#post-area").html(data);
      });
  }

 
 