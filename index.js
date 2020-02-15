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
var DoctorsController=require('./Controllers/DoctorsController');
var AuthController=require('./Controllers/AuthController');
var cors = require('cors')
//require('./Models/DiagnosisModel');
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(cors());
app.post('/signup',  UserController.Hashing,UserController.CheckIfExist,UserController.Registration);
app.post('/login',UserController.Hashing,UserController.Login);
app.use('/upload', uploadRouter);
app.get('/me',UserController.GetProfile);
app.get('/image/:image', (req, res) => {
    pic=req.params.image
    res.sendFile('./public/uploads/'+pic, { root: __dirname });
});
app.put('/user/update',UserController.Update)
app.get('/hospitals',HospitalController.GetAll);

app.get('/symptoms',SymptomsController.GetAll);

app.get('/appointment',AppointmentController.GetAll);
app.delete('/appointment/delete/:id',AppointmentController.DeleteAppointment);
app.get('/doctors/:date',DoctorsController.avaliableDoctors);
app.get('/diseases',DiseasesController.GetAll);
app.get('/d/:id',DiseasesController.diagnosis);
app.post('/appoint',AppointmentController.CheckIfExist,AppointmentController.Appoint);
//app.use(BodyParser.urlencoded({extended: true}));
app.listen(3003);

module.exports= app;