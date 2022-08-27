var mysql = require('mysql');
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bvit",
  database: "carData",
  multipleStatements: true
  
});

db.connect(function(err) {
  if(err) {
    console.log(err);
  }
  else{
    console.log("Connected!");
  }
  
});
module.exports = db;