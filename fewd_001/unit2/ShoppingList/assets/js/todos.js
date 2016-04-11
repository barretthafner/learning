// console.log("Connected!");


$(document).ready(function(){
  //toggle "done" class on click
  $('ul').on("click", "li", function(){
   $(this).toggleClass("done");
  });

  //delete item when trash is clicked on
  $('ul').on("click", "li span", function(event){
    $(this).parent().fadeOut(500, function() { //fadeout
      $(this).remove();                        //then remove
    });
    //jQuery method that stops event bubbling to other elements
    event.stopPropagation();
  });

  //add a new item if "Enter" key is pressed
  $('#todoInput').on("keypress", function(event){
    if (event.which === 13){
      //get input value
      var todoText = $(this).val();
      $(this).val("");
      //create new li and add to ul
      $('ul').prepend("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
  });

  //hide text input on plus button click
  $('.fa-plus').on("click", function() {
    $('#todoInput').fadeToggle();
  });
});
