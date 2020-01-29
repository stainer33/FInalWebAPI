var dbConfig= require('../DatabaseConfig');
var Sequelize = dbConfig.Sequelize;
var sequelize = dbConfig.sequelize;

//defining schema
var items = sequelize.define('item',
{
  id:{type: Sequelize.INTEGER,
  primaryKey: true,
autoIncrement: true,

},
disease:{
  type: Sequelize.TEXT,
  allowNull: false
}

},{timestamps:false, freezeTableName:true, tableName: 'diseasesTable'});

//creating table
items.sync({force: false})
.then(function (result)
{console.log("Diseases Table created successfully");
})
 .catch(function (err)
 {console.log(err);
})
module.exports=items;