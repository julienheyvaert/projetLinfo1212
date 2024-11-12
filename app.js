// APP CONFIG
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(express.static("test"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var session = require("express-session");

app.use(
  session({
    secret: "propre123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

// DB CONFIG
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db_name = "mobilityAppDB";
const user_collection = "users_collection";
const incidents_collection = "incidents_collection";

// CONNECTION
try {
  const database = client.db(db_name);
  const users_collection = database.collection(user_collection);
  const incidents_col = database.collection(incidents_collection);

  async function getIncidents(nb_incidents = 10) {
    return await incidents_col.find({}).limit(nb_incidents).toArray();
  }

  // Homepage route
  app.get("/", async (req, res) => {
    const incidents_c = await getIncidents();
    res.render("homepage", { incidents_c, username: req.session.username });
  });

  // Incident route
  app.get("/incident", (req, res) => {
    res.render("incident", { error: null, username: req.session.username });
  });

  // Login route
  app.get("/login", (req, res) => {
    res.render("login", { error: null, username: req.session.username });
  });

  // Signup verification route
  app.post("/signup_verification", async (req, res) => {
    // form infos
    const username_sign_up = req.body.username_sign_up;
    const password_sign_up = req.body.password_sign_up;
    const completeName_sign_up = req.body.completeName_sign_up;
    const email_sign_up = req.body.email_sign_up;

    if (
      !username_sign_up ||
      !password_sign_up ||
      !completeName_sign_up ||
      !email_sign_up
    ) {
      console.log("An iput is empty.");
      return res.render("login", {
        error: 3,
        username: req.session.username,
      });
    }

    // unique username verif
    const username_taken = await users_collection.findOne({
      username: username_sign_up,
    });
    if (username_taken) {
      console.log("username already used.");
      return res.render("login", {
        error: 4,
        username: req.session.username,
      });
    }

    // unique email verif
    const email_taken = await users_collection.findOne({
      email: email_sign_up,
    });
    if (email_taken) {
      console.log("Email already used.");
      return res.render("login", {
        error: 5,
        username: req.session.username,
      });
    }

    // insertion
    const new_user_json = {
      username: username_sign_up,
      password: password_sign_up,
      fullName: completeName_sign_up,
      email: email_sign_up,
    };

    await users_collection.insertOne(new_user_json);

    // get incidents for hompgae
    const incidents_c = await getIncidents();
    req.session.username = username_sign_up;
    res.render("login", {
      error: null,
      incidents_c,
      username: req.session.username,
    });
  });

  // login_verification route
  app.post("/login_verification", async (req, res) => {
    // form infos
    const username_login = req.body.username_login;
    const password_login = req.body.password_login;

    if (!username_login || !password_login) {
      console.log("An input is empty.");
      return res.render("login", {
        error: 0,
        username: req.session.username,
      });
    }

    // VERIFICATION
    const user = await users_collection.findOne({ username: username_login });

    if (user && user.password === password_login) {
      const incidents_c = await getIncidents();
      console.log("logged in.");
      req.session.username = username_login;
      return res.render("homepage", {
        incidents_c,
        username: req.session.username,
      });
    } else {
      if (user) {
        var error_code = 1;
      } else {
        var error_code = 2;
      }
      return res.render("login", {
        error: error_code,
        username: req.session.username,
      });
    }
  });

  // incident_verification route
  app.post("/incident_verification", async (req, res) => {
    //form infos
    const incident_description = req.body.incident_description;
    const incident_adress = req.body.incident_adress;

    if (!incident_description || !incident_adress) {
      if (!incident_description) {
        errorCode = 0;
      } else {
        errorCode = 1;
      }
      return res.render("incident", {
        error: errorCode,
        username: req.session.username,
      });
    }

    // user is connected ?
    if (!req.session.username) {
      return res.render("incident", {
        error: 2,
        username: req.session.username,
      });
    }

    // date
    const time = new Date();
    var year = String(time.getFullYear());
    var month = String(time.getMonth() + 1);
    var day = String(time.getDate());
    var day_index = time.getDate();
    const week_days = [
      "Mon. ",
      "Tue. ",
      "Wed. ",
      "Thu. ",
      "Fri. ",
      "Sat. ",
      "Sun. ",
    ];
    const incident_date =
      week_days[day_index % 7] + day + "/" + month + "/" + year;

    // new incident
    const newIncident = {
      description: incident_description,
      address: incident_adress,
      reported_by: req.session.username,
      date: incident_date,
    };

    // Insertion
    const incidentsCollection = client
      .db(db_name)
      .collection(incidents_collection);
    await incidentsCollection.insertOne(newIncident);

    const incidents_c = await getIncidents();
    res.render("homepage", { incidents_c, username: req.session.username });
  });

  //logout route
  app.get("/logout", (req, res) => {
    req.session.username = null;
    res.redirect("/login");
  });

  // RUN APP
  console.log("App connected and runing...");
  app.listen(8080);
} catch (error) {
  console.error("Connection error:", error);
}

module.exports = app;
