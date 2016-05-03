$(document).ready(function() {

  playSound('theme');

  $('.ryu')
    .mouseenter(function() {
      $('.ryu-still').hide();
      $('.ryu-ready').show();
    })
    .mouseleave(function() {
      $('.ryu-still').show();
      $('.ryu-ready').hide();
    })
    .mousedown(function() {
      playSound('hadouken');
      $('.ryu-throwing').show();
      $('.ryu-ready').hide();
      $('.ryu-still').hide();
      $('.hadouken').finish().show().animate(
        {'left': '1020px'},
        500,
        function() {
          $(this).hide();
          $(this).css({'left': '639px'});
        }
      );
    })
    .mouseup(function() {
      $('.ryu-throwing').hide();
      $('.ryu-ready').show();
    });

  $('html')
    .keydown(function(event) {
      if (event.which === 88) {
        $('.ryu-still').hide();
        $('.ryu-ready').hide();
        $('.ryu-cool').show();
      }
    })
    .keyup(function(event) {
      if (event.which === 88) {
        $('.ryu-still').show();
        $('.ryu-cool').hide();
      }
    });





});

var themeSound = document.getElementById("theme-sound");
var hadoSound = document.getElementById("hadouken-sound");
var coolSound = document.getElementById("cool-sound");

function playSound(soundName) {
  var sound;

  switch (soundName) {
    case 'theme':
      sound = themeSound;
      break;
    case 'hadouken':
      sound = hadoSound;
      break;
    case 'cool':
      sound = coolSound;
      break;
    default:
      sound = null;
  }

  if (sound) {
    sound.volume = 0.5;
    sound.load();
    sound.play();
  }
}
