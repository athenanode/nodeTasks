var db = require("../config/dbCon");
var bcrypt = require("bcrypt");
var connection = db.connection;
var userModel = require("../models/user").User;

exports.loginUserPost = function(request, response) {
  var email = request.body.email;
  var password = request.body.password;
  //var errors = request.validationErrors();

  connection.query(
    "SELECT email, password FROM users WHERE email = ?",
    [email],
    function(err, results, fields) {
      if (err) {
        console.error(err);
      }

      if (results == 0) {
        response.send("Incorrect Username");
      } else {
        var encPass = results[0].password;
        bcrypt.compare(password, encPass, function(err, same) {
          if (same) {
            request.session.loggedin = true;
            request.session.email = email;
            response.redirect("/home");
          } else {
            response.end(" Incorrect Password!");
          }
        });
      }
    }
  );
};

exports.loginUserGet = function(request, response) {
  if (request.session.loggedin) {
    response.render("home");
  } else {
    response.render("index");
  }
};

exports.validateSignUp = function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password;
  connection.query(
    "SELECT email, password from users WHERE email = ?",
    [email],
    function(err, results, fields) {
      console.log(results == 0);
      if (results == 0) {
        createUser();
      } else {
        res.header("Content-Type", "text/html");
        res.end("user already exists!");
      }
    }
  );
  function createUser() {
    bcrypt.hash(req.body.password, 3, function(err, encrypted) {
      if (err) {
        console.error(err);
      }
      password = encrypted;
      // connection.query('INSERT INTO users (email, password, name) VALUES (? , ? , ?)', [email, password, name], function(err, results, fields){
      //     if(err){
      //         console.error(err);
      //     }
      //     res.header('Content-Type', 'text/html');
      //     res.end(JSON.stringify(results));
      // })

      userModel
        .create({
          name: req.body.name,
          email: req.body.email,
          password: password,
        })
        .then(function() {
          res.redirect("/");
        });
    });
  }
};
