const express = require("express");
const app = express();
const bodyParse = require("body-parser");
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());