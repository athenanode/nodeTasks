var tasklist = require("../models/tasklist");

exports.createTaskList = function(request, response) {
  tasklist
    .create({
      tasklistname: request.body.tasklistname,
      userId: request.session.userid
    })
    .then(function() {
      response.redirect('/createtasklist');
    });
};

exports.createTaskListGet = function(request, response) {
  tasklist
    .findAll({
      where: {
        userId: request.session.userid
      }
    })
    .then(function(tasklists) {
      response.render("addTaskList", { tasklist: tasklists });
    });
};

exports.deleteTasklist = function(request, response){
    
}