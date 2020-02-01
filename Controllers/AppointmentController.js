var appointment = require('../Models/Appointment');
var doctor=require('../Models/doctorsModel');
var user=require('../Models/UserModel');

//get all hospital list
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

module.exports={GetAll};