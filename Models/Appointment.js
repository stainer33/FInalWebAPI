var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;
var doctors =require('./doctorsModel');
var users=require('./UserModel');
//defining schema
var appointment = sequelize.define('appointment',
{
  
date:{
  type: Sequelize.DATEONLY,
  allowNull: false
}
},{timestamps:false, freezeTableName:true, tableName: 'appointmentTable'});

//for doctor
doctors.hasMany(appointment);
appointment.belongsTo(doctors);
//for user
users.hasMany(appointment);
appointment.belongsTo(users);
//creating table
appointment.sync({force: false})
.then(function (result)
{console.log("Appointment Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=appointment;