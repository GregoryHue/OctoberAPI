let chai = require("chai");
let chaiHttp = require('chai-http');
let app = require("../app");

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Companies", () => {
  describe("/GET company", () => {
    it("Should return a company object", (done) => {
      chai
        .request(app)
        .get("/company/EXPERDECO/303830244")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('creation_date');
          done();
        });
    });
  });
});
