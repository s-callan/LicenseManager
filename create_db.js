var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
db.serialize(function() {

    db.run("CREATE TABLE client_info (id integer primary key, client_id, name, description)");
    db.run("CREATE TABLE license_info (id integer primary key, license_id, client_id, name, description)");

});

db.close();