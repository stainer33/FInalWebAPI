var appointment = require('../Models/Appointment');
var doctor=require('../Models/doctorsModel');
var user=require('../Models/UserModel');

//get all appointment list of a user
function GetAll(req,res,next)
{
    doctor.findAll({where:{},
        include: [{
            model: hospital,
        attributes: ['name','address']},
       { model: appointment,
    attributes: ['']}]
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