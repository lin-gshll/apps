let express = require("express");
let router = express.Router();
let Teacher = require("../models/teacher");
let md5 = require("../util/md5");
router.post("/login", function (req, res, next) {
   Teacher.findOne({
        name: req.body.username,
        password: md5(req.body.password)
    }).then((r) => {
        if (r) {
            res.send({
                status: 1,
                message: "ok",
                recodeset: {
                    username: r.name,
                    status: r.status
                }
            })
        } else {
            res.send({
                status: -1,
                message: "error"
            })
        }

    })
})
module.exports = router;