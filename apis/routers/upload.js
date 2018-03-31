let express = require("express");
let router = express.Router();
let fs = require("fs");
let path  = require("path");
router.get("*", function (req, res, next) {
    let pa = path.join(__dirname,"../upload"+req.url);
    res.download(pa);
})
module.exports = router;