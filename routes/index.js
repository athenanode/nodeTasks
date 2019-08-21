var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.loginUserGet);

router.post('/auth', userController.loginUserPost);

router.post('/signup', userController.validateSignUp);

router.post('/logout',userController.logoutuser);

module.exports = router;
