process.env.NODE_ENV = 'test';
var server = require('../bin/www');
var base = process.env.PWD;
var config = require('../api/config'),
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    user = require('../api/models/user.model'),
    auth = require('../api/controllers/auth.controller'),
    schedule = require('../api/controllers/schedule.controller'),
    chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe("Admin user verification", () => {
    let admin, parent1,parent2, adminId,parent1Id,parent2Id,adminToken,parent1Token,parent2Token;
    before((done) => {
        mongoose.connect('mongodb://localhost:27017/lambatest', () => {
            console.log('Connected to lambatest');
            done();
        });
    });
    parent1 = {
        email: 'mazen1@yahoo.com',
        role: 'Parent',
        password: 'wwwlalaw',
        confirmPassword: 'wwwlalaw',
        name: {
            firstName: 'Ali',
            lastName: 'dessouki'
        },
        gender: 'male'
    };

    describe("register a parent", () => {
        it("it should register a user", (done) => {

            chai.request("http://localhost:3000/api").post("/auth/register").send(parent1).end((err, res) => {
                parent1Id = res.body.data._id;
                done();
            });
        });
    });
    describe("login a parent", () => {
        it("it should login a user", (done) => {
            chai.request("http://localhost:3000/api").post("/auth/login").send(parent1).end((err, res) => {
                parent1Token = res.body.data;
                done();
            });
        });
    });
    let request={
        contactEmail:'yas@gmail.com',
        contactNumber:'1234'
    }
   describe("create Interview Request",() =>{
    it("it should create an interview Request", (done) => {
        chai.request("http://localhost:3000/api").post("/user/requestVerification").set("authorization", parent1Token).send(request).end((err,res) =>{
            expect(res).to.have.status(201);
            expect(res.body.data).to.have.property('owner_id');
            expect(res.body.data).to.have.property('contactEmail');
            expect(res.body.data).to.have.property('contactNumber');
            expect(res.body.data).to.have.property('firstName');
            done();
        });
    });
   });
   describe("create Interview Request",() =>{
    it("it shouldnot create an interview Request", (done) => {
        chai.request("http://localhost:3000/api").post("/user/requestVerification").set("authorization", parent1Token).send(request).end((err,res) =>{
            expect(res).to.have.status(422);
            done();
        });
    });
   });
});