var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

exports.edit = function(id, name, callback, errback) {
    Item.findByIdAndUpdate(id, { name: name }, { new: true }, function(err, item) {
       if (err) {
           errback(err);
           return;
       }
       callback(item);
    });
};

exports.delete = function(id, callback, errback) {
    Item.findByIdAndRemove(id, function(err, item) {
       if (err) {
           errback(err);
           return;
       }
       callback(item);
    });
};