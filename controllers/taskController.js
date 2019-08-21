var task = require("../models/task");

exports.createTask = function (req , res) {
    task.create({
        title : req.body.taskname,
        description : req.body.desc,
        userId : req.session.userid,
        tasklistId : req.body.tasklistid
    }).then(function(){
        // task.findAll({
        //     where : {
        //         tasklistId : req.body.tasklistid
        //     }
        // }).then(function(tasks){
        //     response.render('addTasks', {tasks : tasks, tasklistid : req.body.tasklistid});
        // });
        getTasks(req, res);
    })
}

 function getTasks(request, response){
    task.findAll({
        where : {
            tasklistId : request.body.tasklistid
        }
    }).then(function(tasks){
        response.render('addTasks', {tasks : tasks, tasklistid : request.body.tasklistid});
    });
}

exports.postTasks = function(request, response){
    getTasks(request, response);
}