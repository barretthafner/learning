$(document).ready(function(){

  $('button').on('click', function(event) {
    event.preventDefault();
    $('li').remove();
    var n = $('input').val();
    var out = fizzBuzz(n);
    console.log(out);
    out.forEach(function(item){
      $('ul').append("<li><span>" + item + "</span></li>")
    });
  });

});

function fizzBuzz(n) {
  var out = [];
  for (var i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      out.push("Fizz\nBuzz");
    } else if ( i % 3 === 0 ) {
      out.push("Fizz");
    } else if ( i % 5 === 0) {
      out.push("Buzz");
    } else {
      out.push(i);
    }
  }
  return out;
}


