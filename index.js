var express = require ('express');
var app = express();
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');
var uploadRouter=require('./Controllers/upload');

app.post('/signup',  UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Hashing,UserController.Login,AuthController.jwtTokenGen);
app.use('/upload', uploadRouter);
app.get('/profile/:email',UserController.GetAll);





//app.use(BodyParser.urlencoded({extended: true}));
app.listen(3003);