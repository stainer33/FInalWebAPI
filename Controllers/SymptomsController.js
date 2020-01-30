var symptoms = require('../Models/SymptomsModel');

//get all symptoms
function GetAll(req,res,next)
{
    symptoms.findAll().then(function (result)
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