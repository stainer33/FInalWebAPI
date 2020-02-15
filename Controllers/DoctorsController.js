var appointment = require('../Models/Appointment');
var doctor=require('../Models/doctorsModel');
var user=require('../Models/UserModel');
var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//get all doctors
function GetAll(req,res,next)
{
    doctor.findAll({where:{},
        include: [{
            model: hospital,
        attributes: ['name']},
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
//get info about available doctors
function avaliableDoctors(req, res, next)
{var date=req.params.date;
    sequelize.query(" select distinct d.id,d.name,d.qualification,d.email,d.profileImg,h.name as hospitalName from doctorsTable d inner join appointmentTable a on a.doctorId=d.id join hospitalsTable h on d.hospitalId=h.id where ( select COUNT(userId) from appointmentTable where date=(:date))<10;", { replacements: { date: date },type: sequelize.QueryTypes.SELECT}).then(function(result)
    {
        res.json(result);
    })
    .catch(function(err)
    {
        res.json({status: 505, message:'something wrong'});
        console.log(err);
    })
}
module.exports={GetAll,avaliableDoctors};