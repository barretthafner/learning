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
  this.id += 1;
  return item;
};

Storage.prototype.delete = function(id){
  var foundItem = false;
  this.items.forEach(function(item, index, items){
    if (item.id === id) {
      foundItem = item;
      items.splice(index, 1);
    }
  });
  if (foundItem) {
    this.id--;
  }
  return foundItem;
};

Storage.prototype.edit = function(name, id){
  var foundItem = false;
  this.items.forEach(function(item){
    if (item.id === id) {
      item.name = name;
      foundItem = item;
    }
  });
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
    res.status(410).json(item);
  } else {
    res.status(404).send("Unable to find item")
  }
});

app.put('/items/:id',jsonParser, function(req, res) {
  var item = storage.edit(req.params.id, req.body.name);
  res.status(201).json(item);
});


app.listen(process.env.PORT || 8080);