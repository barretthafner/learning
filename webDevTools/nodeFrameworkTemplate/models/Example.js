var mongoose = require("mongoose");

var exampleSchema = new mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model("Example", exampleSchema);