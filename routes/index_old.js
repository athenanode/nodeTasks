var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var tasklistController = require('../controllers/tasklistController');
var taskController = require('../controllers/taskController');

/* GET home page. */
router.get('/', userController.getHomePage );
router.post('/auth', userController.loginUserPost);
router.post('/signup', userController.validateSignUp);
router.post('/createtasklist', tasklistController.createTaskList);
router.post('/createtask', taskController.createTask);
router.get('/createtasklist', tasklistController.createTaskListGet);
router.post('/deleteTasklist' , tasklistController.deleteTasklist);
router.post('/deletetasksLists' , taskController.deletetasksLists);

router.post('/tasklist', taskController.postTasks);
router.get('/admin', userController.adminHome);
router.get('/sendEmail', userController.sendEmailGet);
router.post('/sendEmail', userController.sendEmail);
router.get('/logout',userController.logoutuser);

module.exports = router;
