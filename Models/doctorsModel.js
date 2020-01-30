var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//defining schema
var doctors = sequelize.define('doctor',
{
  id:{type: Sequelize.INTEGER,
  primaryKey: true,
autoIncrement: true,

},
name:{
  type: Sequelize.TEXT,
  allowNull: false
},
type:{
    type: Sequelize.TEXT,
    allowNull: false
  }

},{timestamps:false, freezeTableName:true, tableName: 'doctorsTable'});

//creating table
items.sync({force: false})
.then(function (result)
{console.log("Symptoms Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=symptoms;