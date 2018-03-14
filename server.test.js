const mongoose = require("mongoose");

const chai = require("chai");
const chaihttp = require("chai-http");
const { expect } = chai;
const sinon = require("sinon");

const server = require("./server");
chai.use(chaihttp);

describe("Server", () => {
  before(done => {
    mongoose.connect("mongodb://localhost/test");
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('Connection to mongodb failed');
    })
    db.once('open', () => {
      console.log('Connected');
      done();
    });
  })
  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    })
  });
  describe("[POST] /band", () => {
    it("should add a new band", (done) => {
      const newBand = {
        name: "Radiohead",
        genre: "Alt-Rock"
      };
      chai
        .request(server)
        .post("/band")
        .send(newBand)
        .end((err, res) => {
          if (err) {
            console.error(err)
            done();
          };
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal("Radiohead");
        });
        done()
    });
  });
  describe("[GET] /", () => {
    it("should return `Hello World`", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          if (err) {
            console.error(err)
            done();
          };
          expect(res.status).to.equal(200);
          expect(res.body).to.equal("Hello World");
        });
        done();
    });
  });
});
