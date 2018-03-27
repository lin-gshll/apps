const express = require("express");
const app = express();
const bodyParse = require("body-parser");
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.all('*', function(req, res, next) { //跨域请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
const mongoose = require("mongoose");
let config = require("./config.js");
app.use("/api/student", require('./routers/student'));
app.use("/api/teacher", require('./routers/teacher'));
app.use("/api/score", require('./routers/score'));
app.use("/api/exp", require('./routers/exp'));
app.use("/api/admin", require('./routers/admin'));
app.use("/api/class", require('./routers/class'));
mongoose.connect(config.mongodb.db, function(err) {
    if (err) {
        console.log("数据库连接失败", err);
    } else {
        app.listen(config.port, function(err) {
            console.log("listen:" + config.port);
        })
    }

})