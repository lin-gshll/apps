let express = require("express");
let router = express.Router();
let Teacher = require("../models/teacher");
let Score = require("../models/score");
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

router.post("/work", function (req, res, next) {
    if (req.body.expID) {
        Score.find(req.body, function (err, r) {
            if (err) {
                res.send([]);
            } else {
                res.send(r);
            }
        })
    } else if (req.body.title) {
        Score.find(req.body, function (err, r) {
            if (err) {
                res.send([]);
            } else {
                res.send(r);
            }
        })
    } else if (req.body.keys) {
        var reg = new RegExp(req.body.keys, 'ig'); //模糊查询参数  
        Score.find({
                teaID: req.body.teaID,
                $or: [{
                        "title": {
                            $regex: reg
                        }
                    },
                    {
                        "no": {
                            $regex: reg
                        }
                    },
                    {
                        "stuName": {
                            $regex: reg
                        }
                    },
                    {
                        "stuNo": {
                            $regex: reg
                        }
                    },
                    {
                        "college": {
                            $regex: reg
                        }
                    }
                ]
            },
            function (err, r) {
                res.send(r);
            })
    } else {
        Score.find({
            teaID: req.body.teaID
        }, function (err, r) {
            if (err) {
                res.send([]);
            } else {
                res.send(r);
            }
        })
    }
})
router.post("/correct", function (req, res, next) {
    let _id = req.body._id || "";
    Score.findByIdAndUpdate(_id, {
        score: req.body.score
    }, function (err, r) {
        if (err) {
            res.send({
                status: -1,
                message: "服务器错误"
            })
        }
        if (r) {
            res.send({
                status: 1,
                message: "批改成功！"
            })
        }
    })
})

router.post("/score", function (req, res, next) {
    Score.aggregate().match({
        score: {
            $gt: 0,
            $lte: 100
        }
    }).group({
        _id: '$title',
        sum: {
            $sum: "$score"
        },
        count: {
            $sum: 1
        },
        avg: {
            $avg: "$score"
        },
        max: {
            $max: "$score"
        }
    }).exec(function (err, r) {
        Score.aggregate().group({
            _id: '$title',
            count: {
                $sum: 1
            }
        }).exec(function (err1, r1) {
            for (let i = 0; i < r.length; i++) {
                for (let j = 0; j < r1.length; j++) {
                    if (r[i]._id == r1[j]._id) {
                        r[i].notCommit = r1[j].count - r[i].count;
                    }
                }
            }

            res.send(r);
        })


    })

})
module.exports = router;