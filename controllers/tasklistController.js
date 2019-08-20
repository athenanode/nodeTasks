var tasklist = require('../models/tasklist');



exports.createTaskList = function(request, response) {
    tasklist
    .create({
        tasklistname: request.body.tasklistname,
        userId : request.session.userid
    })
    .then(function() {
        response.end('Created!');
    });
}

exports.createTaskListGet = function(request, response) {
    if (request.session.loggedin) {
      response.render("addTaskList");
    } else {
      response.render("index");
    }
  };
