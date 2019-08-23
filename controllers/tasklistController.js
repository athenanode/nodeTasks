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
      response.render("addTaskList", { tasklist: tasklists , isAdmin : request.session.isAdmin,currentUsername : request.session.name});
    });
};

exports.deleteTasklist = function(request, response){
  tasklist.destroy({
    where : {
      id : request.body.tasklistid
    }
  })
  .then(function(){
    response.redirect('/createtasklist');
  });
}

exports.updateTasklist = function(request, response){
  tasklist.update(
    {tasklistname : request.body.updatedName},
    {where : {
      id : request.body.tasklistid
    }})
    .then(function(){
      response.redirect('/createtasklist');
    })
}