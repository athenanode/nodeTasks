var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;
var User = require('../models/user')
var TaskList = require('../models/tasklist')

var Task = sequelize.define("tasks", {
  title: Sequelize.STRING,
  description : Sequelize.STRING
});

  User.hasMany(Task, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });
  Task.belongsTo(User, {
    foreignKey: {
      allowNull: false
    }
  });

  TaskList.hasMany(Task, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });
  Task.belongsTo(TaskList, {
    foreignKey: {
      allowNull: false
    }
  });

sequelize.sync();
module.exports = Task;