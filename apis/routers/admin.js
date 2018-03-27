let express = require("express");
let Admin = require("../models/admin.js");
let md5 = require("../util/md5");
let router = express.Router();
router.get("/add", function (req, res, next) {
    let username = "admin";
    let password = md5("123456");
    let item = new Admin({
        name: username,
        password: password,
        status: 1
    });
    item.save().then((r) => {
        if (r) {
            res.send({
                status: 1,
                message: "ok"
            })
        } else {
            res.send({
                status: -1,
                message: "error"
            })
        }
    });

})
//登录接口
router.post("/login", function (req, res, next) {
    Admin.findOne({
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