var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
var diseases =require('./DiseasesModel');
//defining schema
var symptoms = sequelize.define('symptom',
{
  id:{type: Sequelize.INTEGER,
  primaryKey: true,
autoIncrement: true,

},
symptom:{
  type: Sequelize.TEXT,
  allowNull: false
}

},{timestamps:false, freezeTableName:true, tableName: 'symptomsTable'});

//creating table
symptoms.sync({force: false})
.then(function (result)
{console.log("Symptoms Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})

module.exports={symptoms};