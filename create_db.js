var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
db.serialize(function() {

    db.run("CREATE TABLE client_info (client_id integer primary key, name, description)");
    db.run("CREATE TABLE license_info (license_id integer primary key, client_id, name, description, start_date date, end_date date)");

});

db.close();