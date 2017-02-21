function ProgressBar(onStart, onProgress, onEnd) {
    this.count = 0;
    this.start(onStart, onProgress, onEnd);
};

ProgressBar.prototype.start = function(onStart, onProgress, onEnd) {
    if (typeof onStart === "function"){
        onStart();
    }
    this.interval = setInterval(function() {
        ++this.count;
        if (this.count === 100) {
            if (typeof onEnd === "function"){
                onEnd();
            }
            clearInterval(this.interval);
            this.count = 0;
            return;
        }
        if (this.count % 10 === 0) {
            if (typeof onProgress === "function") {
                onProgress(this.count);
            }
        }
    }.bind(this), 50 );
}

var start = function() {
    console.log("started")
};

var next = function(count) {
    console.log("At: " +  count);
};

var end = function() {
    console.log("done");
};

var progress = new ProgressBar(start, next, end);
