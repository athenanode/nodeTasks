var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'sql12.freemysqlhosting.net',
	user     : 'sql12301827',
	password : 'nbMLm8sNYm',
	database : 'sql12301827'
});


connection.connect(function(err){
    if(err){
        console.error(err);
    }
});

exports.connection = connection;