const request = require("supertest");
const app = require("../app");
const Test = require("supertest/lib/test");
const checkinput = require("./checkInput");

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
  test("input vide", async () => {
    const input = "";
    const formulaire = await request(app)
      .get("/signup_verification")
      .expect(200);
    const result = checkinput.IsvalidInput(formulaire.body.username_sign_up);
    execpt(result).toBe(false);
  });
});
