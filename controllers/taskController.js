var task = require("../models/task");

exports.createTask = function (req , res) {
    task.create({
        title : req.body.taskname,
        description : req.body.desc,
        userId : req.session.userid,
        tasklistId : req.body.tasklistid
    })
    .then(function(){
        getTasks(req, res);
    })
}

 function getTasks(request, response){
    task.findAll({
        where : {
            tasklistId : request.body.tasklistid
        }
    }).then(function(tasks){
        response.render('addTasks', {tasks : tasks, tasklistid : request.body.tasklistid, isAdmin : request.session.isAdmin,currentUsername : request.session.name});
    });
}

exports.postTasks = function(request, response){
    getTasks(request, response);
}

exports.deleteTask = function(request, response){
    console.log(request.body.tasklistid);
    task.destroy({
        where : {
            id : request.body.taskid
        }
    })
    .then(function(){
        getTasks(request, response);
    })
}

exports.updateTask = function(request, response){
    task.update(
        {title : request.body.updatedName, description : request.body.updatedDesc},
        {where : {id : request.body.taskid}}
    )
    .then(function(){
        getTasks(request, response);
    })
}