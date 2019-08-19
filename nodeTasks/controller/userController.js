var bcrypt = require('bcrypt');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host : 'sql12.freemysqlhosting.net',
    user : 'sql12301827',
    password : 'nbMLm8sNYm',
    database : 'sql12301827'
});
connection.connect(function(err){
    if(err){
        console.error(err);
    }
});


exports.validateSignUp = function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password;
    connection.query('SELECT email, password from users WHERE email = ?',[email], function(err, results, fields){
        console.log(results == 0);
        if (results == 0){

            createUser();
        }
        else {
            res.header('Content-Type', 'text/html');
            res.end('user already exists!')
        }

    });
    function createUser(){
        bcrypt.hash(req.body.password, 3, function(err, encrypted){
            if (err){
                console.error(err);
            }
            password = encrypted;
            console.log('Successfully encrypted.');

            connection.query('INSERT INTO users (email, password, name) VALUES (? , ? , ?)', [email, password, name], function(err, results, fields){
                if(err){
                    console.error(err);
                }
                res.header('Content-Type', 'text/html');
                res.end(JSON.stringify(results));
            })
        });
    }
};
