let express = require("express");
let router = express.Router();
router.get("/add", function(req, res, next) {
    res.end("1233");
})
module.exports = router;