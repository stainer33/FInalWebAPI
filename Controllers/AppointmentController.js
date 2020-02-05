var appointment = require('../Models/Appointment');
var doctor=require('../Models/doctorsModel');
var user=require('../Models/UserModel');

//get all appointment list of a user
function GetAll(req,res,next)
{
    appointment.findAll({where:{'$user.id$':1},
        include: [{
            model: doctor,
        attributes: ['name']},
       { model: user,
    attributes: ['fullName']}]
                        }).then(function (result)
    {
        res.json(result);
        console.log("done");
    })
    .catch(function(err)
    {
        res.json({status: 505, message:'something wrong'});
        console.log(err);
    })
}
//checking if user has appointed that doctor that day or not
function CheckIfExist(req, res, next)
{//select query
    appointment.findOne({
        where:{userId:req.body.userId,doctorId:req.body.doctorId,date:req.body.date},
        
    })
    .then(function(result)
    {
        if(result===null)
        {
            console.log("no email found");
            res.json({message:'can appoint'});
            next();
        }
        else
        {
            res.json({ status: 409, message: 'Already booked' });
        }
    })
}

function Appoint(req, res, next)
{
   
    appointment.create({
        date: req.body.date,
        doctorId: req.body.doctorId,
        userId: req.body.userId
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
module.exports={GetAll,CheckIfExist,Appoint};