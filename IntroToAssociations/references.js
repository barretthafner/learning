var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");
var faker = require("faker");

var Post = require("./models/post");
var User = require("./models/user");


// User.create({
//     email: faker.internet.email(),
//     name: faker.name.firstName() + " " + faker.name.lastName()
// });







Post.create({
    title: faker.company.bsBuzz(),
    content: faker.hacker.phrase()
}, function(err, post){
    if(err){
        console.log(err);
    } else {
        User.findOne({email: "Nestor_Eichmann9@gmail.com"}, function(err, user){
            if(err){
                console.log(err);
            } else {
                user.posts.push(post);
                user.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});


// User.findOne({email: "Nestor_Eichmann9@gmail.com"}).populate("posts").exec(function(err, user){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });