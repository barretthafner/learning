var unirest = require('unirest');

unirest.get('http://www.thinkful.com/').end(function(response) {
  console.log('Status:', response.statusCode);
  console.log('Headers: ', response.headers);
  console.log('Body:', response.body);
});