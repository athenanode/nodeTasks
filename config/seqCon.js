var Sequelize = require('sequelize');

/* exports.sequelize = new Sequelize('sql7302573', 'sql7302573', 'p8x8zHiAir', {
    host : 'sql7.freemysqlhosting.net',
    dialect: 'mysql'
}); */

exports.sequelize = new Sequelize('nodelogin', 'root', 'athenalogics', {
    host : 'localhost',
    dialect: 'mysql'
});