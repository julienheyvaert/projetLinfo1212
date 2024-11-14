const request = require("supertest");
const app = require("../app");
const Test = require("supertest/lib/test");
const checkinput = require("./chekInput");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

//creer un serveur temporaire avant chaque test
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const URI = mongoServer.getUri();
  await mongoose.connect(URI);
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
});
