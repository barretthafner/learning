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
