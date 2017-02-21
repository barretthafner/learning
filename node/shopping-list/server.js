var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
  this.items = [];
  this.id = 0;
};


Storage.prototype.add = function(name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id++;
  return item;
};

Storage.prototype.delete = function(id){
  var foundItem = false;
  this.items.forEach(function(item, index, items){
    if (item.id === Number(id)) {
      foundItem = item;
      items.splice(index, 1);
    }
  });
  return foundItem;
};

Storage.prototype.edit = function(name, id){
  var foundItem = false;
  var items = this.items;
  for(var i = 0; i < items.length; i++) {
    if (items[i].id === Number(id)) {
      items[i].name = name;
      foundItem = items[i];
      break;
    }
  }
  if (!foundItem) {
    foundItem = this.add(name);
  }
  return foundItem;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
  res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  var item = storage.add(req.body.name);
  res.status(201).json(item);
});


app.delete('/items/:id', function(req, res) {
  var item = storage.delete(req.params.id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send("Unable to find item")
  }
});

app.put('/items/:id', jsonParser, function(req, res) {
  var item = storage.edit(req.body.name, req.params.id);
  res.status(200).json(item);
});


app.listen(process.env.PORT || 8080);

exports.app = app;
exports.storage = storage;