var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var index = require('./routes/index');
var api = require('./routes/api');
//var users = require('./routes/users');
var fs = require('fs');

if (!fs.existsSync('mydb.db')) {
    var db = new sqlite3.Database('mydb.db');
    db.serialize(function () {

        db.run("CREATE TABLE client_info (client_id integer primary key, name, description)");
        db.run("CREATE TABLE license_info (license_id integer primary key, client_id, name, description, start_date date, end_date date)");
        db.run("CREATE TABLE license_data (license_id, name, value)");

        db.run('INSERT INTO client_info (name, description) values(?,?)',
            "Default", "Default licenses");
        db.run("INSERT INTO license_info (client_id, name, description, start_date, end_date) values(?,?,?,?,?)",
            "c_1", "Gold", "Default gold license", "2017/1/1", "2012/12/31");
        db.run("INSERT INTO license_info (client_id, name, description, start_date, end_date) values(?,?,?,?,?)",
            "c_1", "Silver", "Default silver license", "2017/1/1", "2012/12/31");
        db.run("INSERT INTO license_info (client_id, name, description, start_date, end_date) values(?,?,?,?,?)",
            "c_1", "Bronze", "Default bronze license", "2017/1/1", "2012/12/31");
    });

    db.close();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
