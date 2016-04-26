// Load documnet, doesn't work in all browsers
document.addEventListener('DOMContentLoaded', function(){

  var params = {
    responseType: 'json',
    part: 'snippet',
//    key: '',
    maxResults: 6,
  };

  // add submit listener to search form
  document.querySelector('#search-form').addEventListener('submit', function(event){

    event.preventDefault();

    params.q = document.querySelector('#query').value;

    getRequest(params);

  }, false);

  document.querySelector('.pagination').addEventListener('click', function(event) {
    console.log('bammmmm!');
    var token = event.target.getAttribute('data-token');
//    debugger;
    if (token) {
      params.pageToken = token;
      getRequest(params);
    }
  });

}, false);


// -------------------------------------------------------------------

function getRequest(params){


  url = 'https://www.googleapis.com/youtube/v3/search';

  $.get(url, params, function(result){
    showResults(result, params);
  }, params.responseType);
}

function showResults(result, params) {
  var content = '';
  var nextButton = document.querySelector('#next-button');
  var prevButton = document.querySelector('#prev-button');


  result.items.forEach(function(item){
    content +=
      '<div class="col-md-4"><div class="thumbnail"><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" data-lity><img src="' + item.snippet.thumbnails.medium.url + '" alt="..."/></a><div class="caption"><h3><a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">More from this channel</h3></div></div></div>';
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


