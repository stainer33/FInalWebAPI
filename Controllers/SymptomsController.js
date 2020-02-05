var symptoms = require('../Models/SymptomsModel');
var diseases = require('../Models/DiseasesModel');
var diagnosis =require('../Models/DiagnosisModel');
const { QueryTypes } = require('sequelize');

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
//for specific disease
function GetSymptom(req,res,next)
{
    diagnosis.findAll({where:{'$disease.id$':1},include: [{
        model: diseases,required: false},
   { model: symptoms,
required: false}]})
    .then(function (result)
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

module.exports={GetSymptom,GetAll};