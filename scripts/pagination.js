let prev_index=1;
document.addEventListener('DOMContentLoaded', function () {
    
        //-----getting total posts---------
    try{
        let app=firebase.app();
        let db=firebase.firestore();
        let page_ref=db.collection('total_posts').doc('total_posts');
        page_ref.get().then(snap=>{
            
     let count=snap.data().count;
     
     let pages=Math.floor(count/5);
     if(count%5!=0){
         pages=pages+1;
     }
     console.log("count : "+count);
     console.log("pages : "+pages);


     //----change ui----
     let page_data="";
     page_data=page_data+"<li id='previous' class='page-item disabled'>";
     page_data=page_data+"<a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
    
     console.log("pn:"+page_no);
   for(var i=1;i<=pages;i++){
    page_data=page_data+"<li style='cursor: pointer;' id='page-"+i+"' class='page-item ";
    if(page_no==i){
        console.log("active :"+i);
        page_data=page_data+"active";
    }
    page_data=page_data+"'><a class='page-link' href='index.html?page="+i+"' onclick='getrange("+i+","+pages+")'>"+i+"</a></li>";

   }
   if(pages===1){
    page_data=page_data+"<li id='next' class='page-item disabled'><a class='page-link' href='index.html?page="+i+1+"' tabindex='-1'>Next</a></li>";
   }else{
   page_data=page_data+"<li  id='next' class='page-item'><a class='page-link' href='#'>Next</a></li>";
   }
   $(".pagination").append(page_data);
   //$("#page-1").addClass("active");

        });

    }catch(e){
        console.error(e);
    }
});



function getrange(index,page_cnt){
    $("#page-"+prev_index).removeClass("active");
    $("#page-"+index).addClass("active");
    prev_index=index;
    if(index==1){
        $("#previous").addClass('disabled');
    }else{
        $("#previous").removeClass('disabled');
    }
    if(index==page_cnt){
        $("#next").addClass('disabled');
    }else{
        $("#next").removeClass('disabled');
    }
var end=index*5;
var start=end-4;
console.log("range : "+start-1+"-"+end-1);
}