/*  RESTfulBlogApp 
    Description: A Blog app that uses RESTful conventions and Semantic UI
    Includes: express, ejs, body-parser, and mongoose
*/

// Initialize -----------------------------------------

var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    mongoose            = require("mongoose"),
    faker               = require("faker");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Configure Database ---------------------------------
// Uncomment below to create new database

mongoose.connect("mongodb://localhost/restful_blog_app");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//test blog create
// Blog.create(
//     {
//         title: faker.company.bs(),
//         image: "https://images.unsplash.com/1/macbook-air-iphone-moleskin.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1c5452ddcce72bc6525838ab1b5596d5",
//         body: faker.lorem.paragraphs(),
//     }, function(err, blog) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("You created a blog: ");
//             console.log(blog);
//         }
//     }
// );

// Blog.create(
//     {
//         title: faker.company.bs(),
//         image: "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=a70c43ac171a47312d3714b3e59aaaee",
//         body: faker.lorem.paragraphs(),
//     }, function(err, blog) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("You created a blog: ");
//             console.log(blog);
//         }
//     }
// );

// Routes ---------------------------------------------

// Root ("/") route
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// Index ("/blogs") route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// New ("/blogs/new") route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// Create ("/blogs") route
app.post("/blogs", function(req, res) {
    //create blog
    //sanitize blog.body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err){
            console.log(err);
            res.render("new");
        } else {
            res.redirect("/blogs")
        }
    });
    //redirect
});

// Show ("/blogs/:id") route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// Edit ("blogs/:id/edit") route
app.get("/blogs/:id/edit", function(req, res) {
    //find the form
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// Update ("blogs/:id") route
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// Delete ("blogs/:id") route
app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});


// 404 route
app.get("*", function(req, res) {
    res.send("You're a shinning star! But, unfortunately, your page cannot be found.");
});

// Listen ---------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running! Better go catch it!");
});