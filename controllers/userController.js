var createError = require('http-errors');
var bcrypt = require("bcrypt");
var userModel = require("../models/user");
var TaskList = require("../models/tasklist");
var Task = require("../models/task");
var sendAEmail =require('../config/emailConfig').sendAMail;

exports.logoutuser = function (req, res) { 
  req.session.destroy(); 
  res.redirect('/');
}

exports.loginUserPost = function(request, response) {
  userModel
    .findAll({  
      where: {
        email: request.body.email
      }
    })
    .then(users => {
      if (users.length == 0) {
          response.render("index", { error : 'User does not exists!. Please try again'});
      } else {
        loginAuth(users, request, response);
      }
    });
};

exports.loginUserGet = function(request, response, next) {
  if (!request.session.loggedin && request.originalUrl != '/auth' && request.originalUrl != '/signup') {
    response.render("index");
  }
  else{
    if(!request.session.isAdmin && (request.originalUrl.toLowerCase() == '/admin'|| request.originalUrl.toLowerCase() == '/sendemail')){
      response.send(createError(404));
    }
    else{
      next();
    }
  }
}

exports.getHomePage = function(request, response){
  if(request.session.isAdmin){
    response.redirect('/admin');
  }
  else{
    response.redirect('/createtasklist');
  }
}


exports.validateSignUp = function(req, res) {
  var password;
  userModel
    .findAll({
      where: {
        email: req.body.email
      }
    })
    .then(users => {
      if (users.length == 0) {
        createUser();
      } else {
        res.render("index", { error : 'User already exists!. Please try again'});
      }
    });

  function createUser() {
    bcrypt.hash(req.body.password, 3, function(err, encrypted) {
      if (err) {
        console.error(err);
      }
      userModel.findAll().then(function(users){
        console.log(users.length);
        if(users.length == 0){
          userModel
          .create({
            id : 1,
            name: req.body.name,
            email: req.body.email,
            password: encrypted
          })
          .then(function() {
            // res.session.loggedin = false;
            sendAEmail(req.body.email,'welcome to athena task app','you are in heaven now',res)
            res.redirect("/");
          });
        }
        else{
          userModel
          .create({
            name: req.body.name,
            email: req.body.email,
            password: encrypted
          })
          .then(function() {
            // res.session.loggedin = false;
            sendAEmail(req.body.email,'welcome to athena task app','you are in heaven now',res)
            res.redirect("/");
          });

        }
      });
    
    });
  }
};

exports.adminHome = function(req, res) {
  userModel
    .findAll({
      include: [
        { model: TaskList, as: "tasklists" },
        { model: Task, as: "tasks" }
      ]
    })
    .then(users => {
      res.render("home", { user: users , currentUser : req.session.email,currentUsername:req.session.name});
    });
};

var loginAuth = function(results, request, response) {
  var encPass = results[0].password;
  bcrypt.compare(request.body.password, encPass, function(err, same) {
    if (same) {
      request.session.loggedin = true;
       request.session.name = results[0].name
      request.session.email = request.body.email;
      request.session.userid = results[0].id;
      if (results[0].id == 1) {
        request.session.isAdmin = true;
        response.redirect('/admin');
      } else {
        request.session.isAdmin = false;
        response.redirect('/createtasklist');
      }
    } else {
      response.render("index", { error : 'Incorrect Password!. Please try again'});
      //response.end(" Incorrect Password!");
    }
  });
};

exports.sendEmailGet = function(req, res) {
  if (req.session.loggedin) 
    res.render("sendEmail");
  else 
    res.render("index");
};

exports.sendEmail = function(req, res) {
  sendAEmail(req.body.email,req.body.subject,req.body.body,res);
};
