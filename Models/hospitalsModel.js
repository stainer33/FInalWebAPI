var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//defining schema
var hospotals = sequelize.define('hospital',
{
  id:{type: Sequelize.INTEGER,
  primaryKey: true,
autoIncrement: true,

},
name:{
  type: Sequelize.TEXT,
  allowNull: false
},
address:{
  type: Sequelize.TEXT,
  allowNull: false
},
tel:{
  type: Sequelize.TEXT,
  allowNull: false
},
lat:{
  type: Sequelize.DOUBLE,
  allowNull: false
},
lon:{
  type: Sequelize.DOUBLE,
  allowNull: false
}

},{timestamps:false, freezeTableName:true, tableName: 'hospitalsTable'});

//creating table
items.sync({force: false})
.then(function (result)
{console.log("Diseases Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=hospitals;