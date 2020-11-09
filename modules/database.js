const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'final_project'
});

connection.connect((err) => {
    if (err) { console.log("Connection error!") }
    else { console.log("Connection success!") }
});
 
let query = (sql, callback) => {
    connection.query(sql, function (err, rows) {
        callback(err, rows);
    });
};

exports.query = query