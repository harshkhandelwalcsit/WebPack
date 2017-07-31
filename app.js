var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
var appPath = "build";

//appPath = "app_server";

app.use(express.static(path.join(__dirname, appPath)));

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});