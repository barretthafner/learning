require('isomorphic-fetch');


var ADD_REPOSITORY = 'ADD_REPOSITORY';
var addRepository = function(repository) {
  return {
    type: ADD_REPOSITORY,
    repository: repository
  }
};

var RATE_REPOSITORY = 'RATE_REPOSITORY';
var rateRepository = function(repository, rating) {
  return {
    type: RATE_REPOSITORY,
    repository: repository,
    rating: rating
  };
};

exports.ADD_REPOSITORY = ADD_REPOSITORY;
exports.addRepository = addRepository;
exports.RATE_REPOSITORY = RATE_REPOSITORY;
exports.rateRepository = rateRepository;

var FETCH_DESCRIPTION_SUCCESS = 'FETCH_DESCRIPTION_SUCCESS';
var fetchDescriptionSuccess = function(repository, description) {
    return {
        type: FETCH_DESCRIPTION_SUCCESS,
        repository: repository,
        description: description
    };
};

var FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
var fetchDescriptionError = function(repository, error) {
    return {
        type: FETCH_DESCRIPTION_ERROR,
        repository: repository,
        error: error
    };
};

var fetchDescription = function(repository) {
    return function(dispatch) {
        var url = 'https://api.github.com/repos/' + repository;
        return fetch(url).then(function(response) {
            if (response.state < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var description = data.description;
            return dispatch(
                fetchDescriptionSuccess(repository, description)
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchDescriptionError(repository, error)
            );
        });
    }
};

exports.fetchDescription = fetchDescription;
exports.FETCH_DESCRIPTION_SUCCESS = FETCH_DESCRIPTION_SUCCESS;
exports.fetchDescriptionSuccess = fetchDescriptionSuccess;
exports.FETCH_DESCRIPTION_ERROR = FETCH_DESCRIPTION_ERROR;
exports.fetchDescriptionError = fetchDescriptionError;
