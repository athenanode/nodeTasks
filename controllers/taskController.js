var taskModel = require("../models/user").Task;

exports.createTask = function (req,resp) {
    let title = req.body.title
    let description = req.body.description

    taskModel.create({
        title : title,
        description : description
    })
    
}