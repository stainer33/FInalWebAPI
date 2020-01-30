var hospitals = require('../Models/hospitalsModel');

//get all hospital list
function GetAll(req,res,next)
{
    hospitals.findAll().then(function (result)
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