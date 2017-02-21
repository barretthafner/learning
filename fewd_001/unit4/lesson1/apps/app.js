
document.addEventListener('DOMContentLoaded', function(){

  document.querySelector('#search-term').addEventListener('submit', function(event){

    event.preventDefault();
    var searchTerm = document.querySelector('#query').value;
    getRequest(searchTerm, 'json');

  }, false);
}, false);


function showResults(result) {
  var content = '';

    result.forEach(function(item){
      content += '<p>' + item.Title + '</p>';
    });

  document.querySelector('#search-results').innerHTML = content;
}


function getRequest(searchTerm, responseType){

  var params = {
    s: searchTerm,
    r: responseType,
  };
  url = 'http://www.omdbapi.com';


  $.get(url, params, function(data){
    showResults(data.Search);
  }, params.r);
}
