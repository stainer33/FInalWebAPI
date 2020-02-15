var appointment = require('../Models/Appointment');
var doctor=require('../Models/doctorsModel');
var user=require('../Models/UserModel');
var jwt = require('jsonwebtoken');
var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//get all appointment list of a user
function GetAll(req,res,next)
{const token = req.headers['token'];
   
jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
        console.log(err.message);
        res.json(err);
    } else {
     //  res.send(decoded);
     sequelize.query("select a.id as id,d.name as doctorName,d.qualification,h.name as hospitalName,a.date from appointmentTable a join doctorsTable d on a.doctorId=d.id join hospitalsTable h on d.hospitalId=h.id where a.userId =(:userId);", { replacements: { userId: decoded.id },type: sequelize.QueryTypes.SELECT}).then(function(result)
     {
         res.json(result);
     })
     .catch(function(err)
     {
         res.json({status: 505, message:'something wrong'});
         console.log(err);
     })
       
    }
})
    
}
//checking if user has appointed that doctor that day or not
function CheckIfExist(req, res, next)
{//select query
    const token = req.body.token;
    jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
        console.log(err.message);
        res.json(err);
    } else {
        req.userId=decoded.id;
        appointment.findOne({
            where:{userId:req.userId,doctorId:req.body.doctorId,date:req.body.date},
            
        })
        .then(function(result)
        {
            if(result===null)
            {
                console.log("no email found");
            
                next();
            }
            else
            {
                res.json({ status: 409, message: 'Already booked' });
            }
        })
    }
})
  
}

function Appoint(req, res, next)
{
   
    appointment.create({
        date: req.body.date,
        doctorId: req.body.doctorId,
        userId: req.userId
    })
    .then(function (result)
    {
        console.log("recorded");
        res.json({ status: 201, message: 'Appointment done' });
    })
    .catch(function(err){
        console.log(err);
        res.json({ status: 409, message: 'Appointment failed' });
    })
}

//Delete
function DeleteAppointment(req,res,)
{
    console.log(req.params.id);
  
    appointment.destroy({
      where:{ id: req.params.id}
        
    })
    .then(function (result)
    {
           
            res.json({ status: 201, message: 'Appointment deleted successfully' });
        
    })
    .catch(function(err){
        console.log(err);
        
        res.json({ status: 500, message: 'could not delete' });
    })
}
module.exports={GetAll,CheckIfExist,Appoint,DeleteAppointment};