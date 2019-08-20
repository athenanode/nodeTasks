var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;
var User = require('../models/user')
var TaskList = require('../models/tasklist')

var Task = sequelize.define("tasks", {
  title: Sequelize.STRING,
  description : Sequelize.STRING
});

  User.hasMany(Task);
  Task.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });

  TaskList.hasMany(Task);
  Task.belongsTo(TaskList, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });

sequelize.sync();
module.exports = Task;