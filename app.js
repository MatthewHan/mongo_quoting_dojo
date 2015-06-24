// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoting_dojo');

app.use(bodyParser.urlencoded({
  extended: true
}));
// static content
app.use(express.static(path.join(__dirname, "./public")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route
app.get('/', function(req, res) {
	res.render('index');
})

app.get('/quotes', function(req, res) {
	Quote.find({}, function(err,quotes){
		if(err){
			console.log('something went wrong');
		} else {
			console.log(quotes);
			res.render('quotes',{data:quotes});
		}
	})
})

var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String,
	created_on: { type: Date, default:Date.now }
})
var Quote = mongoose.model('Quote', QuoteSchema);
app.post('/quotes', function(req,res){
	console.log("POST DATA", req.body);
	var quote = new Quote({name: req.body.name, quote: req.body.quote});

	quote.save(function(err){
		if(err){
			console.log('something went wrong');
		} else {
			console.log('quote successfully added');
			res.redirect('quotes');
		}
	}) 
})
// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})