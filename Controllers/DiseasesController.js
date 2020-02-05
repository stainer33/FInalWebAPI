var diseases = require('../Models/DiseasesModel');
var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
function GetAll(req,res,next)
{
    diseases.findAll().then(function (result)
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

function diagnosis(req, res, next)
{var id=req.params.id;
    sequelize.query("select distinct d.id,d.disease,d.website from diagnosisTable dt join diseasesTable d on dt.diseaseId=d.id join symptomsTable s on dt.symptomId=s.id where s.id in (:id);", { replacements: { id: id },type: sequelize.QueryTypes.SELECT}).then(function(result)
    {
        res.json(result);
    })
    .catch(function(err)
    {
        res.json({status: 505, message:'something wrong'});
        console.log(err);
    })
}

module.exports={GetAll,diagnosis};