var express = require('express');
var router = express.Router();

//===============================================================================
// clients

// Return list of all clients
router.get('/clients', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    db.all('select client_id, name, description from client_info', function (err, rows) {
        var results = [];
        for (var index = 0; index < rows.length; ++index) {
            var data = rows[index];
            var row = {
                id: 'c_' + data.client_id,
                name: data.name,
                description: data.description
            };
            results.push(row)
        }
        res.send(JSON.stringify(results));
        db.close();
    });
});

// create new client
router.post('/clients', function (req, res) {
    if (undefined == req.body.client_id || undefined == req.body.name) {

    }
    else {
        var client_id = req.body.client_id;
        var name = req.body.name;
        var description = req.body.description || "";
        var id = -1;

        res.location('./' + id);
        res.status(201);
    }

});

// Return client details
router.get('/clients/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    var id = req.params.id.substring(2);
    db.all('select client_id, name, description from client_info where client_id = ?', id, function (err, rows) {
        var result = {};
        if (undefined == row) {
            result = {
                id: row.client_id,
                name: row.name,
                description: row.description
            };
        }
        res.send(JSON.stringify(result));
        db.close();
    });
});

// Update client details
router.patch('/clients/:clientID', function (req, res, next) {

});

// Return license details
router.get('/licenses/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    var type = req.params.id.substring(0,1);
    var id;

    if(type == 'c') {
        id = req.params.id;
        db.all('select license_id, name, description, client_id, start_date, end_date from license_info where client_id = ?', id, function (err, rows) {
            var results = [];
            for (var index = 0; index < rows.length; ++index) {
                var data = rows[index];
                var row = {
                    id: 'l_' + data.license_id,
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
    else if(type == 'l') {
        id = req.params.id.substring(2);
        db.all('select license_id, name, description, client_id from license_info where license_id = ?', id, function (err, rows) {
            var results = [];
            for (var index = 0; index < rows.length; ++index) {
                var data = rows[index];
                var row = {
                    id: 'l_' + data.license_id,
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
});


module.exports = router;
