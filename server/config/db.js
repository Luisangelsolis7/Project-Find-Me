const mysql = require('mysql')
const db = mysql.createConnection({
    host: "45.55.136.114",
    user: "teamDB_F2021",
    password: "no1inTeam!",
    database: "teamDB_F2021_2",
    multipleStatements: true
})

db.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully!');
});

module.exports = db;