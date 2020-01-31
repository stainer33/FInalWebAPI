var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
var hospital=require('./hospitalsModel');
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
qualification:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  email:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  profileImg:{
    type: Sequelize.TEXT,
    allowNull: false
  }

},{timestamps:false, freezeTableName:true, tableName: 'doctorsTable'});
doctors.belongsTo(hospital);
//creating table
doctors.sync({force: false})
.then(function (result)
{console.log("Symptoms Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=doctors;