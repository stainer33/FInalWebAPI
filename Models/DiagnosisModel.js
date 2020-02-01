var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
var diseases =require('./DiseasesModel');
var symptoms=require('./SymptomsModel');
//defining schema
var diagnosis = sequelize.define('diagnosis',{},{timestamps:false, freezeTableName:true, tableName: 'diagnosisTable'});

//for diseases
diseases.hasMany(diagnosis);
diagnosis.belongsTo(diseases);
//for symptoms
symptoms.hasMany(diagnosis);
diagnosis.belongsTo(symptoms);
//creating table
diagnosis.sync({force: false})
.then(function (result)
{console.log("Diagnosis Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=diagnosis;