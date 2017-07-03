
'use strict';

var express = require('express');
var path = require('path');
// var pkg = require('./package');
// var router = express.Router();

var routes = require('./routes/router');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(3000, function() {
	console.log('listening on port 3000');
});
