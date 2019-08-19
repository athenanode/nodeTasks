var Sequelize = require("sequelize");
var sequelize = require("../config/seqCon").sequelize;

var Task = sequelize.define("tasks", {
  title: Sequelize.STRING,
  description : Sequelize.STRING
});

Task.associate = function(models) {
  models.Task.belongsTo(models.User, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: true
    }
  });
};

sequelize.sync();
module.exports.Task = Task;