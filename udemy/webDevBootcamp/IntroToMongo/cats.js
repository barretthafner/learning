var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



// add a new cat to the database
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function (err, cat) {
//     if(err){
//         console.log("Something went wrong saving!");
//     } else {
//         console.log("We just saved a cat named: ");
//         console.log(cat);
//     }
// });

Cat.create({
        name: "Snowball",
        age: 15,
        temperament: "Nice"
    }, 
    function(err, cat){
        if(err){
            console.log(err);
        } else {
            console.log(cat);
        }
    }
);


// retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats) {
    if(err) {
        console.log("Oh No! An ERROR!");
        console.log(err);
    } else {
        console.log("All of the cats....");
        console.log(cats);
    }
});