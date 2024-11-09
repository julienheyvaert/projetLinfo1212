//APP CONFIG
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));

// ROUTES CONFIG
// simple routes
app.get('/', function(req, res) {
    res.render('homepage');
});

app.get('/incident', function(req, res) {
    res.render('incident');
  });

app.get('/login', function(req, res) {
res.render('login');
});

// DB CONFIG
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db_name = 'mobilityAppDB';
const user_collection = 'users_collection';
const incidents_collection = 'incidents_collection';

// CONNECTION
async function run_db_connection() {
  try {
    const database = client.db(db_name);
    const users_c = database.collection(user_collection);
    const incidents_c = database.collection(incidents_collection);

    console.log('Connected.');
    app.listen(8080)

  } finally {
    await client.close();
  }
}
run_db_connection();