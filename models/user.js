var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;

var User = sequelize.define("users", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

sequelize.sync();
module.exports = User;
