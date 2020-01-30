var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

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
items.sync({force: false})
.then(function (result)
{console.log("Symptoms Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=symptoms;