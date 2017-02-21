var events = require("events");

function ProgressBar() {
    this.count = 0;
};

ProgressBar.prototype = Object.create(events.EventEmitter.prototype);

ProgressBar.prototype.start = function() {
    this.emit('start');
    this.interval = setInterval(function() {
        ++this.count;
        if (this.count === 100) {
            this.emit('stop');
            clearInterval(this.interval);
            this.count = 0;
            return;
        }
        if (this.count % 10 === 0) {
            this.emit('progress', this.count)
        }
    }.bind(this), 50 );
}

var progressBar = new ProgressBar();

progressBar.on('start', function() {
   console.log("started"); 
});

progressBar.on('progress', function(count) {
   console.log('At: ' + count); 
});

progressBar.on('stop', function() {
   console.log("done");
});

progressBar.start();
