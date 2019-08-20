var db = require("../config/dbCon");
var bcrypt = require("bcrypt");
var connection = db.connection;
var userModel = require("../models/user");
var TaskList = require('../models/tasklist');
var Task = require('../models/task');

exports.loginUserPost = function(request, response) {
  
  userModel.findAll({
    where: {
      email : request.body.email
    }
  }).then(users=>{
    if(users.length == 0){
      response.end('User does not exists!')
    } 
    else{
      loginAuth(users, request, response);
    }
  });


};

exports.loginUserGet = function(request, response) {
  if (request.session.loggedin) {
    response.render("home");
  } else {
    response.render("index");
  }
};

exports.validateSignUp = function(req, res) {

  var password;
  
  userModel.findAll({
    where: {
      email : req.body.email
    }
  }).then(users=>{
    if(users.length == 0){
      createUser();
    } 
    else{
      res.end('User already exists!')
    }
  });


  
  function createUser() {
    bcrypt.hash(req.body.password, 3, function(err, encrypted) {
      if (err) {
        console.error(err);
      }

      userModel
        .create({
          name: req.body.name,
          email: req.body.email,
          password: encrypted,
        })
        .then(function() {
          res.redirect('/');
        });
      

    });
  }
};



exports.adminHome = function(req, res) {
  
  userModel.findAll(
    {
      include : [ 
      { model: TaskList, as: 'tasklists'},
      { model: Task, as: 'tasks'}]  
    }
  ).then(users=>{

    // var datatable = [];
    // users.forEach(function(value, index){
    //   datatable[index] = {name : value.name, email : value.email, tlcount : value.tasklists.length, tcount : value.tasks.length}
    // });
    res.render ('home', {user : users});
    console.log(':::::::::::::'+datatable[0].tcount);
  });

}

var loginAuth = function (results, request, response) {
    var encPass = results[0].password;
    bcrypt.compare(request.body.password, encPass, function(err, same) {
      if (same) {
        request.session.loggedin = true;
        request.session.email = request.body.email;
        request.session.userid=results[0].id;
        if(results[0].id == 1){
          response.redirect('/admin');  
        }
        else{
          response.render("home");
        }
        
      } else {
        response.end(" Incorrect Password!");
      }
    });
  
}
