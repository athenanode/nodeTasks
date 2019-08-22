var task = require("../models/task");

exports.createTask = function (req , res) {
    task.create({
        title : req.body.taskname,
        description : req.body.desc,
        userId : req.session.userid,
        tasklistId : req.body.tasklistid
    }).then(function(){
        res.end('Created')
    })
}

exports.getTasks = function(request, response){
    task.findAll({
        where : {
            tasklistId : request.body.id
        }
    }).then(function(tasks){
        console.log(tasks);
        response.render('addTasks', {tasks : tasks, tasklistid : request.body.id,});
    });
}