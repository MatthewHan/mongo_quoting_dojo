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
	// This is where we would get the users from the database and send them to the index view to be displayed.
	res.render('index');
})

app.get('/quotes', function(req, res) {
	// This is where we would get the users from the database and send them to the index view to be displayed.
	res.render('quotes');
})

var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String
})

app.post('/quotes', function(req,res){
	console.log("POST DATA", req.body);
})
// listen on 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
})



// var UserSchema = new mongoose.Schema({
// 	name: String,
// 	age: Number
// })
// var User = mongoose.model('User', UserSchema);

// // route to add a user
// app.post('/users', function(req, res) {
//   console.log("POST DATA", req.body);
//   // create a new User with the name and age corresponding to those from req.body
//   var user = new User({name: req.body.name, age: req.body.age});
//   // try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
//   user.save(function(err) {
//     // if there is an error console.log that something went wrong!
//     if(err) {
//       console.log('something went wrong');
//     } else { // else console.log that we did well and then redirect to the root route
//       console.log('successfully added a user!');
//       res.redirect('/');
//     }
//   })
// })