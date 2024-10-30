var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//ROUTE PRINCIPALE
app.get('/', function(req, res) {
    res.render('homepage');
  });

//ROUTE LOGIN
app.get('/incident', function(req, res) {
  res.render('incident');
});
  
//ROUTE LOGIN
app.get('/login', function(req, res) {
  res.render('login');
});

//ROUTE GESTION IDENTIFICATION
app.get('/signup_verification', function(req,res,next) {
  res.render('homepage');
  });

//ROUTE GESTION NOUVEL UTILISATEUR
app.get('/login_verification', function(req,res,next) {
  res.render('homepage');
  });

app.use(express.static("static"));
app.listen(8080);