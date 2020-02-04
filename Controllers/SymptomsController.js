var symptoms = require('../Models/SymptomsModel');
var diseases = require('../Models/DiseasesModel');
var diagnosis =require('../Models/DiagnosisModel');
const { QueryTypes } = require('sequelize');
/*const t= await sequelize.query("select s.symptom from symptomsTable s join diagnosisTable d on d.symptomId=s.id join diseasesTable dt on d.diseaseId =dt.id where dt.id=2",
 { type: QueryTypes.SELECT });*/
//get all symptoms
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

module.exports={GetSymptom};