var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.use(function (req, res, next) {
  console.log('New request!');
  next();
});

app.use(function (req, res, next) {
  console.log(req.method, req.protocol, req.xhr);
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.use(function (req, res, next) {
	if(req.query) {
		fs.writeFile("./text.txt", JSON.stringify(req.query, null, 10), function() {
		console.log('query in')
		});
		res.end('hi')
	}
	next();
})

app.use(function (req, res) {
	if(req.body) {
		fs.writeFile("./text2.txt", JSON.stringify(req.body, null, 10), function() {
			console.log('body in')
		});
		res.end('ho')
	}
})
 
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.post('/', function (req, res) {
  res.send('Hello World');
})

app.listen(3000);