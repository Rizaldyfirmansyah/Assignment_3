const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize } = require("../models");

const userData = {
  id: 1,
  email: "rizaldy@gmail.com",
  username: "rizaldy",
  password: "12345678",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const photoData = {
  id: 4,
  title: "test",
  caption: "ini test foto",
  image_url: "https://photopertama/test",
};

let token = "";

beforeAll((done) => {
  sequelize.queryInterface
    .bulkInsert("Users", [userData], {})
    .then(() => {
      token = generateToken({
        id: userData.id,
        email: userData.email,
      });

      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /photos", () => {
  it("should send response wth 201 status code", (done) => {
    request(app)
      .post("/photos")
      .set("token", token)
      .send(photoData)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(201);
        expect(typeof res.body).toEqual("object");

        console.info(done());
      });
  });
});

const photoDataError = {
  title: "",
  caption: "ini test foto",
  image_url: "https://photopertama/test",
};

describe("POST /photos ERROR", () => {
  it("should send response wth 404 status code", (done) => {
    request(app)
      .post("/photos")
      .set("token", token)
      .send(photoDataError)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(500);
        expect(res.body.name).toBe("SequelizeValidationError");

        done();
      });
  });
});

describe("GET /photos getAll", () => {
  it("should send response wth 200 status code", (done) => {
    request(app)
      .get("/photos")
      .set("token", token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(200);
        expect(typeof res.body).toEqual("object");

        done();
      });
  });
});

describe("GET /photos getAll ERROR", () => {
  it("should send response wth  status code", (done) => {
    request(app)
      .get("/photo")
      .set("token", token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(404);
        expect(res.clientError).toBe(true);

        done();
      });
  });
});

describe("GET /photos/:id", () => {
  it("should send response wth 200 status code", (done) => {
    request(app)
      .get(`/photos/${photoData.id}`)
      .set("token", token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.status).toBe(200);
        expect(typeof res.body).toEqual("object");

        done();
      });
  });
});

describe("GET /photos/:id ERROR", () => {
  it("should send response wth 404 status code", (done) => {
    request(app)
      .get(`photos/${1}`)
      .set("token", token)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.info(res);

        expect(res.status).toBe(404);
        expect(res.clientError).toBe(true);

        done();
      });
  });
});

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete("Users", {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });

  sequelize.queryInterface
    .bulkDelete("Photos", {})
    .then(() => {
      return done();
    })
    .catch((err) => {
      done(err);
    });
});
