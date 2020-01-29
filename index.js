var express = require ('express');
var app = express();
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');







//app.use(BodyParser.urlencoded({extended: true}));
app.listen(3003);