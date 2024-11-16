const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

//creer un serveur temporaire avant chaque test
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// ferme le serveur après tout les test
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Test des routes vers les pages", () => {
  it("test homepage", async () => {
    const demande = await request(app).get("/");
    expect(demande.statusCode).toBe(200);
    expect(demande.text).toContain("<title>Mobility Watch</title>");
  });
  test("test route incident", async function () {
    const demande = await request(app).get("/incident").expect(200);
    expect(demande.text).toContain(
      "<title>MobilityWatch - Report Incident</title>"
    );
  });
  test("test route login", async function () {
    const demande = await request(app).get("/login").expect(200);
    expect(demande.text).toContain("<title>MobilityWatch - Login</title>");
  });
});

describe("test l'input formulaire", () => {
  test("test du sign up", async () => {
    const formulaire = await request(app)
      .post("/signup_verification")
      .send(
        "username_sign_up=Jean&password_sign_up=Pierre123&completeName_sign_up=jean Pierre&email_sign_up=Pierrejean@gmail.com"
      )
      .expect(200);
    expect(formulaire.text).toContain("Jean");
  });
  test("test du sign up vide", async () => {
    const formulaire = await request(app)
      .post("/signup_verification")
      .expect(200);
    expect(formulaire.text).toContain("displayError(3)");
  });
  test("test username du sign up deja pris", async () => {
    const formulaire = await request(app)
      .post("/signup_verification")
      .send(
        "username_sign_up=Jean&password_sign_up=Pierre123&completeName_sign_up=jean Pierre&email_sign_up=jean@gmail.com"
      )
      .expect(200);
    expect(formulaire.text).toContain("displayError(4)");
  });
  test("test email du sign up deja pris", async () => {
    const formulaire = await request(app)
      .post("/signup_verification")
      .send(
        "username_sign_up=Pierre&password_sign_up=Pierre123&completeName_sign_up=jean Pierre&email_sign_up=Pierrejean@gmail.com"
      )
      .expect(200);
    expect(formulaire.text).toContain("displayError(5)");
  });

  test(" test du log in", async () => {
    const formulaire = await request(app)
      .post("/login_verification")
      .send("username_login=Jean&password_login=Pierre123")
      .expect(200);

    expect(formulaire.text).toContain("Jean");
  });
  test("test du log in vide", async () => {
    const formulaire = await request(app)
      .post("/login_verification")
      .expect(200);
    expect(formulaire.text).toContain("displayError(0)");
  });
  test("test du log in avec username pas valide", async () => {
    const formulaire = await request(app)
      .post("/login_verification")
      .send("username_login=Martin&password_login=Martin123")
      .expect(200);
    expect(formulaire.text).toContain("displayError(2)");
  });
  test("test du log in avec mauvais mot de passe", async () => {
    const formulaire = await request(app)
      .post("/login_verification")
      .send("username_login=Jean&password_login=keilan123")
      .expect(200);
    expect(formulaire.text).toContain("displayError(1)");
  });
});

describe("test sur les incidents", () => {
  test("test input description incident vide", async () => {
    const ajout = await request(app)
      .post("/incident_verification")
      .send("incident_description=&incident_adress=champêtre")
      .expect(200);
    expect(ajout.text).toContain("displayError(0)");
  });
  test("test input adresse incident vide", async () => {
    const ajout = await request(app)
      .post("/incident_verification")
      .send("incident_description=voiture&incident_adress=")
      .expect(200);
    expect(ajout.text).toContain("displayError(1)");
  });
  test("test user pas connecté", async () => {
    const ajout = await request(app)
      .post("/incident_verification")
      .send("incident_description=voiture&incident_adress=champêtre")
      .expect(200);
    expect(ajout.text).toContain("displayError(2)");
  });
});
describe("test sur la db", () => {
  test("test ajout de l'incident dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("incidents_collection")
      .findOne({ description: "voiture" });
    expect(collectionIncident).toBeDefined();
  });
  test("test ajout de l'addresse de l'incident dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("incidents_collection")
      .findOne({ adrress: "champêtre" });
    expect(collectionIncident).toBeDefined();
  });

  test("test ajout du username dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("users_collection")
      .findOne({ username: "Jean" });
    expect(collectionIncident).toBeDefined();
  });
  test("test ajout du password dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("users_collection")
      .findOne({ password: "Pierre123" });
    expect(collectionIncident).toBeDefined();
  });
  test("test ajout du fullname dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("users_collection")
      .findOne({ fullName: "jean Pierre" });
    expect(collectionIncident).toBeDefined();
  });
  test("test ajout du email dans la db", async () => {
    const collectionIncident = await mongoose.connection.db
      .collection("users_collection")
      .findOne({ email: "Pierrejena@gmail.com" });
    expect(collectionIncident).toBeDefined();
  });
});
