let express = require("express");
let Admin = require("../models/admin.js");
let Teacher = require("../models/teacher");
let Student = require("../models/student");
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
//教师列表
router.get("/teacherlist", function (req, res, next) {
    Teacher.find().then((r) => {
        res.send(r);
    })
})
//删除教师
router.post("/delteacher", function (req, res, next) {
    console.log(req.body);
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
        req.body.password = md5(req.body.password);
        console.log(req.body);
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
                    message: "error"
                })
            }
        })

    }
})
//学生列表
router.get("/studentlist", function (req, res, next) {
    Student.find().then((r) => {
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
                    message: "error"
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
        }).then((r) => {
                res.send(r)
        })
    } else {
        Exp.find().then((r) => {
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


module.exports = router;