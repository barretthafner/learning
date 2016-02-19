var express     = require("express"),
    router      = express.Router(),
    middleware  = require("../middleware");

// Root ("/") route
router.get("/", function(req, res){
    res.render("root");
});

module.exports = router;