console.log("Connected!");

// .fadeOut()
// .fadeIn()

$("#fade1").on("click", function() {
  $("div").fadeOut(2000, function() {

    $(this).fadeIn(2000);
  });
});

// .fadeToggle()
$("#fade2").on("click", function() {
    $('div').fadeToggle(500);
});

// .slideUp()
// .slideDown()
$('#slide1').on("click", function(){
  $('div').slideUp(1000, function(){
    $('div').slideDown(1000);
  });
})

// .slideToggle
$("#slide2").on("click", function() {
    $('div').slideToggle(500);
});


// .remove()
$('#remove').on("click", function(){
  $('div').remove();
});
