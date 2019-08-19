var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;

var User = sequelize.define("users", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

User.associate = function(models) {
  User.hasMany(models.Task);
};

sequelize.sync();
module.exports.User = User;
