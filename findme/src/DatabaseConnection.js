let mysql = require('mysql');
let connection = mysql.createConnection({
    host: "45.55.136.114",
    user: "teamDB_F2021",
    password: "no1inTeam!",
    database: "teamDB_F2021_2"
});
module.exports = connection;
export default connection;