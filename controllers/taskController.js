var task = require("../models/task");

exports.createTask = function (req , res) {
    task.create({
        title : req.body.title,
        description : req.body.description,
        userId : req.session.userid,
        tasklistId : req.params.tasklistId
    }).then(function(){
        res.end('Created')
    })
}

exports.getTasks = function(request, response){
    task.findAll({
        where : {
            tasklistId : request.params.id
        }
    }).then(function(tasks){
        response.render(tasks);
    });
}