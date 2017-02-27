

var express = require("express");
var app = express();

// Visiting "/" should print "Hi there, welcome to my assignement!"

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignement!"); 
});


// Visiting "/speak/pig" should print "The pig says 'Oink'"
// Visiting "/speak/cow" should print "The pig says 'Moo'"
// Visiting "/speak/dog" should print "The pig says 'Woof Woof!'"
// All else - trying to use next()

app.get("/speak/:animal", function(req, res, next){
    
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Cheezberger?",
        goldfish: "...",
    };
     
    //get animal param and make sure it is lower case   
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    //check for sound, if it is there: print else: move on
    
    if (sound) {
        res.send("The " + animal + " says '" + sound + "'");
    } else {
        next();        
    }
});

// Visiting "/repeat/hello/3" should print "hello hello hello"
// Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
// Visiting "/repeat/blah/2" should print "blah blah"
app.get("/repeat/:text/:times", function(req, res, next){
      var text = req.params.text;
      //times should be a number, it is normally a string
      var times =  Number(req.params.times);
      var output = "";
      
      for (var i = 1; i <= times; i++) {
          output += text + " ";
      }
      res.send(output);

});

app.get("*", function(req, res) {
    res.send("You're a shinning star! But, unfortunately, your page cannot be found.");
});


// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});
