var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;

var User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,    
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

sequelize.sync();
module.exports = User;
