let express = require("express");
let router = express.Router();
let Student = require("../models/student");
let md5 = require("../util/md5");
let Score = require("../models/score")
router.post("/login", function (req, res, next) {
    Student.findOne({
        name: req.body.username,
        password: md5(req.body.password)
    }).then((r) => {
        if (r) {
            res.send({
                status: 1,
                message: "ok",
                recodeset: {
                    username: r.name,
                    status: r.status,
                    _id: r._id
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


router.post("/appexp", function (req, res, next) {
    let item = new Score(req.body);
    Score.find({
        expID: req.body.expID,
        stuID: req.body.stuID
    }).then((r) => {
        if (r.length != 0) {
            res.send({
                status: "-1",
                message: "你已经预约过了,请查看《我的预约》！"
            })
        } else {
            item.save().then((d) => {
                if (d) {
                    res.send({
                        status: "1",
                        message: "预约成功，请查看《我的实验》并准时上课！"
                    });
                }
            })
        }
    })
})

router.post("/myexp", function (req, res, next) {
    let s = req.body;
    Score.find({
        stuID:s.stuID
    }).then((r) => {
        res.send(r);
    })

})

router.post("/delexp", function (req, res, next) {
    let id = req.body._id || "";
    Score.remove(req.body,function(err,r){
        if(err){
            res.send({status:"504",message:"服务器错误!"});
        }else if(r.n==1){
            res.send({ status:"1", message:"取消预约成功！"});
        }else{
              res.send({ status:"-1", message:"暂无实验数据！"});
        }
    })
})
module.exports = router;