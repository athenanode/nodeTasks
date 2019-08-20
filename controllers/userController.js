var db = require("../config/dbCon");
var bcrypt = require("bcrypt");
var connection = db.connection;
var userModel = require("../models/user");

exports.loginUserPost = function(request, response) {
  
  //var errors = request.validationErrors();

  // connection.query(
  //   "SELECT email, password FROM users WHERE email = ?",
  //   [email],
  // );
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
          res.redirect("/");
        });
      

    });
  }
};

var loginAuth = function (results, request, response) {
    var encPass = results[0].password;
    bcrypt.compare(request.body.password, encPass, function(err, same) {
      if (same) {
        request.session.loggedin = true;
        request.session.email = request.body.email;
        request.session.userid=results[0].id;
        response.redirect("/home");
      } else {
        response.end(" Incorrect Password!");
      }
    });
  
}