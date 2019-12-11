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
  })