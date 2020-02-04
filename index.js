var express = require ('express');
var app = express();
var fs=require('fs');
var BodyParser = require('body-parser');
var UserController = require('./Controllers/UserController');
var HospitalController=require('./Controllers/HospitalController');
var SymptomsController=require('./Controllers/SymptomsController');
var DiseasesController=require('./Controllers/DiseasesController');
var uploadRouter=require('./Controllers/Upload');
var AppointmentController=require('./Controllers/AppointmentController');


require('./Models/DiagnosisModel');
app.use(BodyParser.urlencoded({extended: true}));

app.post('/signup',  UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Hashing,UserController.Login);
app.use('/upload', uploadRouter);
app.get('/profile/:email',UserController.GetProfile);
app.get('/image/:image', (req, res) => {
    pic=req.params.image
    res.sendFile('./public/uploads/'+pic, { root: __dirname });
});
app.get('/hospitals',HospitalController.GetAll);

app.get('/symptoms',SymptomsController.GetSymptom);

app.get('/appointment',AppointmentController.GetAll);

app.get('/diseases',DiseasesController.GetAll);
app.get('/d',DiseasesController.diagnosis);
//app.use(BodyParser.urlencoded({extended: true}));
app.listen(3003);