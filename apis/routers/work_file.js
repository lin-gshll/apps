let express = require("express");
let router = express.Router();
let fs = require("fs");
let path = require("path");
router.get("*", function (req, res, next) {
    console.log(req.url);

    let pa = path.join(__dirname, "../work_file" + req.url);
    //设置请求的返回头type,content的type类型列表见上面
    //格式必须为 binary 否则会出错
    // var content = fs.readFileSync(pa,{encoding:"utf-8"});
    res.set("Content-Type", {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    });
    var stream = fs.createReadStream(pa);
    var resData = []; //存储文件流
    if (stream) { //判断状态
        stream.on('data', function (chunk) {
            resData.push(chunk);
        });
        stream.on('end', function () {
            var finalData = Buffer.concat(resData);
            res.write(finalData);
            res.end();
        });
    }
})
module.exports = router;