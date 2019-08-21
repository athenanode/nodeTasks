var db = require("../config/dbCon");
var bcrypt = require("bcrypt");
var connection = db.connection;
var userModel = require("../models/user");
var TaskList = require("../models/tasklist");
var Task = require("../models/task");
var nodemailer = require("nodemailer");

exports.logoutuser = function (req, res) { 
  console.log('Destroying session');
  req.session.destroy(); 
  res.render("index");
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
        response.end("User does not exists!");
      } else {
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
        res.end("User already exists!");
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
          password: encrypted
        })
        .then(function() {
          res.redirect("/");
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
      res.render("home", { user: users , currentUser : req.session.email});
    });
};

var loginAuth = function(results, request, response) {
  var encPass = results[0].password;
  bcrypt.compare(request.body.password, encPass, function(err, same) {
    if (same) {
      request.session.loggedin = true;
      request.session.email = request.body.email;
      request.session.userid = results[0].id;
      if (results[0].id == 1) {
        response.redirect("/admin");
      } else {
        response.render("home");
      }
    } else {
      response.end(" Incorrect Password!");
    }
  });
};

exports.sendEmailGet = function(req, res) {
  if (req.session.loggedin) res.render("sendEmail");
  else res.render("index");
};

exports.sendEmail = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "kirti.sharma@athenalogics.com",
      pass: "athena@123123"
    }
  });

  var mailOptions = {
    from: "kirti.sharma@athenalogics.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent");
      res.end('Email sent');
    }
  });
};
