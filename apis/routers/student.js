let express = require("express");
let router = express.Router();
let Student = require("../models/student");
let md5 = require("../util/md5");
let Score = require("../models/score");
let path = require("path");
let fs = require("fs");
var multer = require('multer')
var upload = multer({
    dest: 'work_tmp/'
});
let Work = require("../models/work");
router.post("/login", function (req, res, next) {
    console.log(req.body);
    Student.findOne({
        name: req.body.username,
        password: md5(req.body.password)
    }).then((r) => {
        console.log(r);
        if (r) {
            res.send({
                status: 1,
                message: "ok",
                recodeset: {
                    username: r.name,
                    status: r.status,
                    _id: r._id,
                    stuNo: r.no,
                    class:r.class,
                    college:r.college,
                    email:r.email
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
    if (s.keys) {
        var reg = new RegExp(req.body.keys, 'ig'); //模糊查询参数  
        Score.find({
                stuID: req.body.stuID,
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
                        "teaID": {
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
            stuID: s.stuID
        }).then((r) => {
            res.send(r);
        })
    }


})

router.post("/delexp", function (req, res, next) {
    let id = req.body._id || "";
    Score.remove(req.body, function (err, r) {
        if (err) {
            res.send({
                status: "504",
                message: "服务器错误!"
            });
        } else if (r.n == 1) {
            res.send({
                status: "1",
                message: "取消预约成功！"
            });
        } else {
            res.send({
                status: "-1",
                message: "暂无实验数据！"
            });
        }
    })
})
router.post("/file", upload.single('file'), function (req, res, next) {
    if (req.file) {
        // 重命名文件
        let oldPath = path.join(__dirname, "../" + req.file.path);
        let newPath = path.join(__dirname, '../work_file/' + req.file.filename + req.file.originalname.slice(req.file.originalname.lastIndexOf(".")));
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send({
                    status: -1,
                    message: "error"
                })
            } else {
                res.send({
                    status: 1,
                    message: {
                        "path": '/work_file/' + req.file.filename + req.file.originalname.slice(req.file.originalname.lastIndexOf(".")),
                        "originalname": req.file.originalname,
                        "filename": req.file.filename
                    }
                })
            }
        });
    } else {
        res.send({
            status: -1,
            message: "404.png"
        })
    }
})
router.post("/addworkfile", function (req, res, next) {
    let param = req.body;
    Score.findOneAndUpdate({
        _id: param._id
    }, param, function (err, r) {

        if (err) {
            res.send({
                status: "-1",
                message: "上传失败"
            })
        }
        if (r) {
            res.send({
                status: "1",
                message: "上传成功！"
            })
        }
    })

})


module.exports = router;