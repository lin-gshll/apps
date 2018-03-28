let express = require("express");
let router = express.Router();
router.post("/add", function (req, res, next) {
    console.log(req.body);
})
module.exports = router;