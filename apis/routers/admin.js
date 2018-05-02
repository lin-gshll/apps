let express = require("express");
let Admin = require("../models/admin.js");
let Teacher = require("../models/teacher");
let Student = require("../models/student");
let Score = require("../models/score");
let Info = require("../models/info");
var multer = require('multer')
var upload = multer({
    dest: 'upload_tmp/'
});
const fs = require("fs");
const path = require("path");
let Exp = require("../models/exp");
let md5 = require("../util/md5");
let router = express.Router();
router.get("/add", function (req, res, next) {
    // let username = "admin";
    // let password = md5("123456");
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
//添加教师
router.post("/addteacher", function (req, res, next) {
    var _id = req.body._id || "";
    if (_id) { //修改
        delete req.body._id;
        delete req.body._v;
        let temp = req.body;
        temp.password = md5(temp.password);
        Teacher.findByIdAndUpdate(_id,
            temp,
            function (err, r) {
                if (err) {
                    res.send({
                        status: -1,
                        message: "error"
                    })
                } else {
                    res.send({
                        status: 1,
                        message: "ok"
                    })
                }
            })
    } else { //添加
        Teacher.find({
            name: req.body.name
        }, function (err, r) {
            if (r.length > 0) {
                res.send({
                    status: -1,
                    message: "教师已存在"
                })
            } else {
                req.body.password = md5(req.body.password);
                let item = new Teacher(req.body);
                item.save().then((r) => {
                    if (r._id) {
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
                })
            }
        })


    }
})
//教师列表
router.get("/teacherlist", function (req, res, next) {
    Teacher.find().sort({
        _id: -1
    }).then((r) => {
        res.send(r);
    })
})
//删除教师
router.post("/delteacher", function (req, res, next) {
    let id = req.body._id || "";
    Teacher.findOne({
        _id: id
    }, function (err, r) {
        if (err) {
            res.send({
                status: 504,
                message: "error"
            })
        }
        if (r) {
            Teacher.remove({
                _id: id
            }, function (err, r) {
                if (err) {
                    res.send({
                        status: 0,
                        message: "删除失败"
                    })
                } else {
                    res.send({
                        status: 1,
                        message: "删除成功"
                    })
                }
            })
        } else {
            res.send({
                status: -1,
                message: "用户不存在"
            })
        }

    })
})


/** 
 * 学生
 */
//添加学生
router.post("/addstudent", function (req, res, next) {
    var _id = req.body._id || "";
    if (_id) { //修改
        delete req.body._id;
        delete req.body._v;
        req.body.password = md5(req.body.password);
        let temp = req.body;
        Student.findByIdAndUpdate(_id,
            temp,
            function (err, r) {
                if (err) {
                    res.send({
                        status: -1,
                        message: "error"
                    })
                } else {
                    res.send({
                        status: 1,
                        message: "ok"
                    })
                }
            })
    } else { //添加
        Student.find({
            no: req.body.no
        }, function (err, r) {
            if (r.length > 0) {
                res.send({
                    status: -1,
                    message: "学生已存在"
                })
            } else {
                req.body.password = md5(req.body.password);
                let item = new Student(req.body);
                item.save().then((r) => {
                    if (r._id) {
                        res.send({
                            status: 1,
                            message: "ok"
                        })
                    } else {
                        res.send({
                            status: -1,
                            message: "服务器错误"
                        })
                    }
                })
            }
        })

    }
})
//学生列表
router.get("/studentlist", function (req, res, next) {
    Student.find().sort({
        _id: -1
    }).then((r) => {
        res.send(r);
    })
})
//删除学生
router.post("/delstudent", function (req, res, next) {
    let id = req.body._id || "";
    Student.findOne({
        _id: id
    }, function (err, r) {

        if (err) {
            res.send({
                status: 504,
                message: "error"
            })
        }
        if (r) {
            Student.remove({
                _id: id
            }, function (err, r) {
                if (err) {
                    res.send({
                        status: 0,
                        message: "删除失败"
                    })
                } else {
                    res.send({
                        status: 1,
                        message: "删除成功"
                    })
                }
            })
        } else {
            res.send({
                status: -1,
                message: "用户不存在"
            })
        }
    })
})

/**
 * 实验
 */

//添加
router.post("/addexp", function (req, res, next) {
    var _id = req.body._id || "";
    if (_id) { //修改
        delete req.body._id;
        delete req.body._v;
        let temp = req.body;
        Exp.findByIdAndUpdate(_id,
            temp,
            function (err, r) {
                if (err) {
                    res.send({
                        status: -1,
                        message: "服务器错误"
                    })
                } else {
                    res.send({
                        status: 1,
                        message: "ok"
                    })
                }
            })
    } else { //添加
        Exp.find({
            $or: [{
                no: req.body.no
            }, {
                title: req.body.title
            }]
        }, function (err, r) {
            if (r.length > 0) {
                res.send({
                    status: -1,
                    message: "实验已存在"
                })
            } else {
                let item = new Exp(req.body);
                item.save().then((r) => {
                    if (r._id) {
                        res.send({
                            status: 1,
                            message: "ok"
                        })
                    } else {
                        res.send({
                            status: -1,
                            message: "服务器错误"
                        })
                    }
                })


            }
        })

    }
})
//学生列表
router.get("/explist", function (req, res, next) {
    if (req.query.teacher_name) {
        Exp.find({
            teaID: req.query.teacher_name
        }).sort({
            _id: -1
        }).then((r) => {
            res.send(r)
        })
    } else if (req.query.keys) {
        var reg = new RegExp(req.query.keys, 'ig');
        Exp.find({
            $or: [{
                    "title": {
                        $regex: reg
                    }
                },
                {
                    "teaID": {
                        $regex: reg
                    }
                }, {
                    "college": {
                        $regex: reg
                    }
                }, {
                    "instru": {
                        $regex: reg
                    }
                }, {
                    "no": {
                        $regex: reg
                    }
                }

            ]
        }).sort({
            _id: -1
        }).then(function (r) {
            res.send(r);
        })
    } else {
        Exp.find().sort({
            _id: -1
        }).then((r) => {
            res.send(r);
        })
    }

})

router.post("/delexp", function (req, res, next) {
    let id = req.body._id || "";
    Exp.findOne({
        _id: id
    }, function (err, r) {
        if (err) {
            res.send({
                status: 504,
                message: "error"
            })
        }
        if (r) {
            Score.remove({
                expID: id
            }).then(function () {
                Exp.remove({
                    _id: id
                }, function (err, r) {
                    if (err) {
                        res.send({
                            status: 0,
                            message: "删除失败"
                        })
                    } else {
                        res.send({
                            status: 1,
                            message: "删除成功"
                        })
                    }
                })
            });

        } else {
            res.send({
                status: -1,
                message: "用户不存在"
            })
        }
    })
})
router.post("/file", upload.single('file'), function (req, res, next) {
    if (req.file) {
        // 重命名文件
        let oldPath = path.join(__dirname, "../" + req.file.path);
        let newPath = path.join(__dirname, '../upload/' + req.file.filename + req.file.originalname.slice(req.file.originalname.lastIndexOf(".")));
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
                        "path": '/upload/' + req.file.filename + req.file.originalname.slice(req.file.originalname.lastIndexOf(".")),
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
//添加公告
router.post("/addinfo", function (req, res, next) {
    if (req.body.top) {
        Info.findOneAndUpdate({
            _id: req.body._id
        }, {
            created: Date.now()
        }).then((r) => {
            if (r) {
                res.send({
                    status:1,
                    message:"置顶成功"
                });
            } else {
                 res.send({
                    status:-1,
                    message:"置顶失败"
                });
            }
        })
    } else if (req.body._id) {
        Info.findOneAndUpdate({
            _id: req.body._id
        }, {
            admin: req.body.admin,
            title:req.body.title,
            desc:req.body.desc,
            created:Date.now()
        }).then((r) => {
            if (r) {
                res.send({
                    status: 1,
                    message: "修改成功"
                });
            } else {
                res.send({
                    status: -1,
                    message: "修改失败"
                });
            }
        })
    } {
        let item = new Info(req.body);
        item.save().then((r) => {
            if (r._id) {
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
        })
    }

})

//添加公告
router.post("/infolist", function (req, res, next) {
    Info.find().sort({
        created: -1
    }).then((r) => {
        res.send(r);
    })

})
//添加公告
router.post("/delinfo", function (req, res, next) {
    Info.remove({
        _id: req.body._id
    }).then((r) => {
        if (r.n > 0) {
            res.send({
                status: 1,
                message: "删除成功"
            })
        } else {
            res.send({
                status: 1,
                message: "删除失败"
            })
        }
    })
})


module.exports = router;