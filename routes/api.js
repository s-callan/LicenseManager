var express = require('express');
var router = express.Router();

//===============================================================================
// clients

// Return list of all clients
router.get('/clients', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    db.all('select id, client_id, name, description from client_info', function (err, rows) {
        var results = [];
        for (var index = 0; index < rows.length; ++index) {
            var row = {id: rows[index].id, name: rows[index].name};
            results.push(row)
        }
        res.send(JSON.stringify(results));
    });
});

// create new client
router.post('/clients', function(req, res) {
   if(undefined == req.body.client_id || undefined == req.body.name)
   {

   }
   else
   {
       var client_id = req.body.client_id;
       var name = req.body.name;
       var description = req.body.description || "";
       var id = -1;

       res.location('./' + id);
       res.status(201);
   }

});
// Return client details
router.get('/clients/:clientID', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    db.get('select id, client_id, name, description from client_info where id = ?', req.params.clientID, function (err, row) {
        var result = {};
        if(undefined == row) {
            result = {
                id: row.id,
                name: row.name,
                description: row.description,
                client_id: row.client_id
            };
        }
        res.send(JSON.stringify(result));
    });
});

// Update client details
router.patch('/clients/:clientID', function (req, res, next) {

});

module.exports = router;
