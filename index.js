var express = require ('express');
var app = express();
var fs=require('fs');
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');
var HospitalController=require('./Controllers/HospitalController');
require('./Models/SymptomsModel');
var uploadRouter=require('./Controllers/Upload');

app.use(BodyParser.urlencoded({extended: true}));

app.post('/signup',  UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Hashing,UserController.Login);
app.use('/upload', uploadRouter);
app.get('/profile/:email',UserController.GetAll);
app.get('/image/:image', (req, res) => {
    pic=req.params.image
    res.sendFile('./public/uploads/'+pic, { root: __dirname });
});
app.get('/hospitals',HospitalController.GetAll);





//app.use(BodyParser.urlencoded({extended: true}));
app.listen(3003);