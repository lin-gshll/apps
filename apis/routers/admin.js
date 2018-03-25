let express = require("express");
let router = express.Router();
router.get("/add", function(req, res, next) {
    console.log(123);
    res.end("1233");
})
module.exports = router;