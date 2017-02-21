var promise = new Promise(function(resolve) {
  // some async operation here
  resolve("Success!");
});

promise.then(function(result) {
  console.log(result);
  return result;
}).then(function(result) {
  console.log(result);
  return result;
}).then(function(result) {
  console.log(result);
});