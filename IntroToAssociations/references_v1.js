var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var faker = require("faker");

//POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model("Post", postSchema);


//User - email, name, posts ID - ASSOCIATION BY OBJECT REFERENCE!!!
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);



// User.create({
//     email: faker.internet.email(),
//     name: faker.name.firstName() + " " + faker.name.lastName()
// });







// Post.create({
//     title: faker.company.bsBuzz(),
//     content: faker.hacker.phrase()
// }, function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         User.findOne({email: "Nestor_Eichmann9@gmail.com"}, function(err, user){
//             if(err){
//                 console.log(err);
//             } else {
//                 user.posts.push(post);
//                 user.save(function(err, data){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });


User.findOne({email: "Nestor_Eichmann9@gmail.com"}).populate("posts").exec(function(err, user){
    if (err){
        console.log(err);
    } else {
        console.log(user);
    }
});