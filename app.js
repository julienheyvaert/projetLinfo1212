// APP CONFIG
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

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
    const users_collection = database.collection(user_collection);
    const incidents_col = database.collection(incidents_collection);

    async function getIncidents(nb_incidents = 10) {
      return await incidents_col.find({}).limit(nb_incidents).toArray();
    }

    // Homepage route
    app.get("/", async (req, res) => {
      const incidents_c = await getIncidents();
      res.render("homepage", { incidents_c });
    });

    // Incident route
    app.get("/incident", (req, res) => {
      res.render("incident");
    });

    // Login route
    app.get("/login", (req, res) => {
      res.render("login");
    });

    // Signup verification route
    app.post("/signup_verification", async (req, res) => {
      // handling form infos 
      const username_sign_up = req.body.username_sign_up;
      const password_sign_up = req.body.password_sign_up;
      const completeName_sign_up = req.body.completeName_sign_up;
      const email_sign_up = req.body.email_sign_up;

      if (!username_sign_up || !password_sign_up || !completeName_sign_up || !email_sign_up) {
        console.log("An iput is empty.");
        return res.render("login", { error: "Fill in all the inputs." });
      }

      // unique username verif
      const username_taken = await users_collection.findOne({ username: username_sign_up });
      if (username_taken) {
        console.log("username already used.");
        return res.render("login", { error: "Username already used." });
      }

      // unique email verif
      const email_taken = await users_collection.findOne({ email: email_sign_up });
      if (email_taken) {
        console.log("Email already used.");
        return res.render("login", { error: "Email already used." });
      }

      // insertion
      const new_user_json = {
        username: username_sign_up,
        password: password_sign_up,
        fullName: completeName_sign_up,
        email: email_sign_up
      };
      
      await users_collection.insertOne(new_user_json);

      // get incidents for hompgae
      const incidents_c = await getIncidents();
      res.render("homepage", { incidents_c });
    });
    
    app.listen(8080)

  } catch (error) {
    console.error("Connection error:", error);
  }
}

run_db_connection();