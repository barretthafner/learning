var unirest = require('unirest');
var express = require('express');
var events = require('events');


var app = express();
app.use(express.static('public'));


var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var artistReq = function(name, cb) {
    var apiReq = getFromApi('search', {
        q: name,
        limit: 1,
        type: 'artist'
    });
    
    apiReq.on("end", function(item){
        cb(null, item.artists.items[0]);
    });
    
    apiReq.on("error", function(code) {
       cb(code);
    });
};

var relatedReq = function(id, cb) {
  var apiReq = getFromApi('artists/' + id + "/related-artists");
  
    apiReq.on("end", function(item){
        cb(null, item.artists);
    });
    
    apiReq.on("error", function(code) {
       cb(code);
    });
};

var topTracksReq = function(id, cb) {
    var apiReq = getFromApi('artists/' + id + "/top-tracks", {
        country: "US"
    });
    apiReq.on("end", function(item){
        cb(null, item.tracks);
    });
    
    apiReq.on("error", function(code) {
       cb(code);
    });
};


app.get('/search/:name', function(req, res) {
    
    artistReq(req.params.name, function(err, artist) {
        if (err) {
            res.sendStatus(err);
        } else {
            var output = artist;
            relatedReq(artist.id, function(err, related) {
               if (err) {
                   res.sendStatus(err);
               } else {
                   
                   var completed = 0;
                   
                   var checkComplete = function() {
                       if (completed === related.length) {
                           output.related = related;
                           res.json(output);
                       }
                   };
                   
                   related.forEach(function(artist) {
                       topTracksReq(artist.id, function(err, tracks) {
                           if (err) {
                               res.sendStatus(err);
                           } else {
                               artist.tracks = tracks;
                               completed++;
                               checkComplete();
                           }
                       });
                   });
                }
            });
        }
    });
});

app.listen(8080);
