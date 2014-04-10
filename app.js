/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set("view engine", "html");
app.set("view options", { layout: false });
app.set("views", path.join(__dirname, 'views'));
app.engine("html", require("hbs").__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({
    src: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/users', user.list);
app.get('/api/list', function(req, res, err) {
    res.json([{
        'text': 'i am a beautiful butterfly',
        'value': 5
    }, {
        'text': 'that is so nice',
        'value': 2
    }]);
});
app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
