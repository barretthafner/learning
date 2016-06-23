(async function() {
  console.log('foo');
}());

console.log('Console log before calling wait:', new Date());

function wait(seconds) { 
  return new Promise(function(resolve) {
    setTimeout(function(){
      resolve(new Date());
    }, seconds * 1000);
  });
}

(async function() {
  var foo = await wait(3);
  console.log('Console log after three seconds:', foo);
  var bar = await wait(1);
  console.log('Console log after one second:', bar);
  var baz = await wait(5);
  console.log('Console log after five seconds:', baz);
}());

console.log('Console log after calling wait:', new Date());