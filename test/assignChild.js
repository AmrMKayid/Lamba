/*'use strict';
process.env.NODE_ENV = 'test';
const apiURL = 'http://localhost:3000/api';
var server = require('../bin/www'),
    base = process.env.PWD,
    config = require('../api/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    user = require('../api/models/user.model'),
    auth = require('../api/controllers/auth.controller'),
    chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('assign article to child' , () => {
  let token,childID,articleID,parentID,body,parent,fakeToken,parent2;

  before((done) => {
      mongoose.connect('mongodb://localhost:27017/lamba', () => {
          console.log('Connected to lamba');
          done();
      });
  });
parent = {
  "email":"mg@gmail.com",
  "password":"123456789"
},
parent2 = {
  "email":"a@gmail.com",
  "password":"123456789"
};

describe("Login as a Parent", () => {
    it("it should login the user as Parent", (done) => {
        chai.request(apiURL).post("/auth/login").send(parent).end((err, res) => {
            token = res.body.data;
            expect(res.body.msg).to.be.eql('Welcome');
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("Login as a second Parent", () => {
    it("it should login the user as second Parent", (done) => {
        chai.request(apiURL).post("/auth/login").send(parent2).end((err, res) => {
            fakeToken = res.body.data;
            expect(res.body.msg).to.be.eql('Welcome');
            expect(res).to.have.status(200);
            done();
        });
    });
});
childID = "5adc78a6384677e300b4ab86";
body={
"articleID":"5ad384490f37ba3f1c769af8"
};
describe("assign child to article", () => {
    it("it should assign child to article", (done) => {
        chai.request(apiURL).patch("/user/assignArticleToChild/"+childID).set('Authorization',token).send(body).end((err, res) => {
            expect(res.body.msg).to.be.eql('Successfully assigned.');
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe("don't assign again if already assigned", () => {
    it("it should'nt assign again", (done) => {
        chai.request(apiURL).patch("/user/assignArticleToChild/"+childID).set('Authorization',token).send(body).end((err, res) => {
            expect(res.body.msg).to.be.eql('The child is already assigned');
            expect(res).to.have.status(200);
            done();
        });
    });
});


describe("don't allow unauthorized parents to assign", () => {
    it("it should'nt assign", (done) => {
        chai.request(apiURL).patch("/user/assignArticleToChild/"+childID).set('Authorization',fakeToken).send({
        "articleID":"5ad384490f37ba3f1c769af8",
        }).end((err, res) => {
            expect(res.body.msg).to.be.eql('your are not allowed to assign articles for this child');
            expect(res).to.have.status(401);
            done();
        });
    });
});



});
*/