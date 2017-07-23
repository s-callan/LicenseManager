var express = require('express');
var router = express.Router();


var fs = require('fs');
var fields = JSON.parse(fs.readFileSync('fields.json', 'utf8'));

// Return list of all clients
router.get('/clients', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    db.all("select client_id, name, description, start_date, end_date from client_info", function (err, rows) {
        var results = [];
        if (typeof rows !== 'undefined') {
            for (var index = 0; index < rows.length; ++index) {
                var data = rows[index];
                var row = {
                    id: data.client_id,
                    name: data.name,
                    description: data.description,
                    start_date: new Date(data.start_date),
                    end_date: new Date(data.end_date)
                };
                results.push(row)
            }
        }
        res.send(JSON.stringify(results));
        db.close();
    });
});

// Return license details
router.get('/licenses', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');

    var client_id = req.query["client"] | 0;
    var license_id = req.query["license"] | 0;

    if (client_id) {
        id = req.params.id;
        db.all('select license_id, name, description, client_id, start_date, end_date from license_info where client_id = ?',
            client_id, function (err, rows) {
                var results = [];
                for (var index = 0; index < rows.length; ++index) {
                    var data = rows[index];
                    var row = {
                        id: data.license_id,
                        name: data.name,
                        description: data.description,
                        start_date: data.start_date,
                        end_date: data.end_date
                    };
                    results.push(row)
                }
                res.send(JSON.stringify(results));
                db.close();
            });
    }
    else if (license_id) {
        id = req.params.id;
        db.all('select name, value from license_data where license_id = ?', license_id, function (err, rows) {
            var data = {};
            for (var index = 0; index < rows.length; ++index) {
                data[rows[index].name] = rows[index].value;
            }
            var results = {};
            for (var section in fields) {
                results[section] = {};
                for (var field in fields[section]) {
                    var name = fields[section][field].name;
                    results[section][name] = {};
                    results[section][name].value = data[name] || fields[section][field].default;
                    results[section][name].label = fields[section][field].label;
                    results[section][name].comment = fields[section][field].comment;
                    results[section][name].type = fields[section][field].type;
                    results[section][name].name = name;
                }
            }
            res.send(JSON.stringify(results));

            db.close();
        });

    }
});


module.exports = router;
