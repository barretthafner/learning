// thinkful-tube
// a YouTube searching app
// requires lity (http://sorgalla.com/lity/) which requires jQuery
// requires bootstrap

//  -------------------------------------------------------------------

// Load document, doesn't work in all browsers
document.addEventListener('DOMContentLoaded', function(){

  // set youtube API parameters
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    responseType: 'json',
    part: 'snippet',
    key: APIkey,
    maxResults: 6,
  };

  // add submit listener to search form
  document.querySelector('#search-form').addEventListener('submit', function(event){
    event.preventDefault();

    // set q parameter and call getRequest
    params.q = document.querySelector('#query').value;
    getRequest(url, params);
  }, false);

  // add click listener to "prev" and "next" buttons
  document.querySelector('.pagination').addEventListener('click', function(event) {
    var token = event.target.getAttribute('data-token');

    // if there is a token on the button pass it in the params to getRequest
    if (token) {
      params.pageToken = token;
      getRequest(url, params);
    }
  });
}, false);

//  -------------------------------------------------------------------

// get api request from server
function getRequest(url, params){

  // build query string
  var queryString = "?";
  for (var prop in params) {
    queryString += prop + "=" + params[prop] + "&";
  }
  queryString = queryString.slice(0, -1);

  // start XHR request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url + queryString);
  xhr.send(null);

  // runs asycronously, waits for state change then runs function
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {

        // if there is a valid response parse the string and send it to showResults
        var result = JSON.parse(xhr.responseText); // 'This is the returned text.'
        showResults(result, params);
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };
}

//  -------------------------------------------------------------------

function showResults(result, params) {
  var content = '';
  var nextButton = document.querySelector('#next-button');
  var prevButton = document.querySelector('#prev-button');


  result.items.forEach(function(item){
    content +=
      '<div class="col-md-4"><div class="thumbnail"><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" data-youtube-id="' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '" alt="..."/></a><div class="caption"><h3><a class="video" href="https://www.youtube.com/channel/' + item.snippet.channelId + '">More from this channel</h3></div></div></div>';
  });

  document.querySelector('#search-results').innerHTML = content;


  if (result.nextPageToken) {
    nextButton.setAttribute('data-token', result.nextPageToken);
    nextButton.setAttribute('data-show', true);
  } else {
    nextButton.setAttribute('data-show', false);
  }

  if (result.prevPageToken) {
    prevButton.setAttribute('data-token', result.prevPageToken);
    prevButton.setAttribute('data-show', true);
  } else {
    prevButton.setAttribute('data-show', false);
  }
}


