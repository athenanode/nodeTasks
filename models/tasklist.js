var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;
var User = require('../models/user')

var Tasklist = sequelize.define("tasklist", {
  tasklistname: Sequelize.STRING
});

  User.hasMany(Tasklist);
  Tasklist.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });

sequelize.sync();
module.exports = Tasklist;