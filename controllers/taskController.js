var task = require("../models/task");

exports.createTask = function (req , res) {
    
    task.create({
        title : req.body.title,
        description : req.body.description,
        userId : req.session.userid,
        tasklistId : req.body.tasklistId
    }).then(function(){
        res.end('Created')
    })

    
    
}