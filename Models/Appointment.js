var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
var doctors =require('./doctorsModel');
var users=require('./UserModel');
//defining schema
var appointment = sequelize.define('appointment',
{
  
date:{
  type: Sequelize.DATE,
  allowNull: false
}

},{timestamps:false, freezeTableName:true, tableName: 'appointmentTable'});
doctors.belongsToMany(users,{through: appointment});
//creating table
appointment.sync({force: false})
.then(function (result)
{console.log("Appointment Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=appointment;