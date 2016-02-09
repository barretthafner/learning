var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var faker = require("faker");

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

// var Post = mongoose.model("Post", postSchema);


//User - email, name, EMBEDDED POSTS ARRAY - association by emdedding
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: faker.internet.email(),
//     name: faker.name.firstName() + " " + faker.name.lastName()
// });

// newUser.posts.push({
//     title: faker.hacker.abbreviation(),
//     content: faker.hacker.phrase()
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: faker.hacker.abbreviation(),
//     content: faker.hacker.phrase()
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


User.findOne({name: "Antonette Williamson"}, function(err, user){
    if (err){
        console.log(err);
    } else {
        console.log(user);
        user.posts.push({
            title: faker.hacker.abbreviation(),
            content: faker.hacker.phrase()
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });        
    }
});