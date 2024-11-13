const checkinput = require("./chekInput");
const request = require("supertest");
const app = require("../app");

describe("test l'input formulaire", () => {
  afterAll(() => {
    app.close();
  });
  test("input vide", async () => {
    const formulaire = await request(app)
      .post("/signup_verification")
      .execpt(200);
    const result = checkinput.IsvalidInput(formulaire.body.username_sign_up);
    execpt(result).toBe(false);
  });
});
