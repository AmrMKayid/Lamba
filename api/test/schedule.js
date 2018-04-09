process.env.NODE_ENV = 'test';
var server = require('E:/mozakra/semester6/SE/Lamba/bin/www');
var base = process.env.PWD;
var config= require('../config'),
    logger= require('mocha-logger')
    mongoose = require('mongoose'),
    user = require('../models/user.model'),
    auth = require( '../controllers/auth.controller'),
    schedule = require( '../controllers/schedule.controller'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should,
    testUtils = require('../test/utils');
chai.use(chaiHttp);

/*describe('Getting schedule',() => {
    it('should return the teacher schedule',(done) => {
        var user =  {
            email: "mm@f.com",
           role: "Teacher",
            password: 'wwww',
            name:{firstname:'Mariam',
            lastName:'dessouki'}
        }
    user.save((err, user) => {
        route.post('/schedule/createTeacherSchedule/'+user.id)
        .end((err, res) => {
        res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('saturday');
    res.body.should.have.property('sunday');
    res.body.should.have.property('monday');
   res.body.should.have.property('tuesday');
    res.body.should.have.property('wednesday');
    res.body.should.have.property('thursday');
    res.body.should.have.property('friday');
    done();
});
});
});
});*/
describe("teacher ", () => {
    let  teacher , parent , child, teacherToken, parentToken , childToken , teacherId , childId , parentId ;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/lambatest', () => {
    console.log('Connected to lambatest');
done();
});

teacher ={
    email: 'mariamm@yahoo.com',
    role: 'Teacher',
    password: 'wwwlalaw',
    confirmPassword:'wwwlalaw',
    name:{firstName:'Mariam',
        lastName:'dessouki'},
    gender:'female'
};
describe("register a teacher", () => {
it("it should register a user", (done) => {

    chai.request("http://localhost:3000/api").post("/auth/register").send(teacher).end((err,res) =>{
       teacherId = res.body._id;
    done();
});
}).timeout(5000); });
describe("login a teacher", () => {
    it("it should login a user", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/login").send(teacher).end((err,res)=>{
        teacherToken = res.body.data;
        done();
    });
}).timeout(5000); });


parent ={
    email: 'ali@yahoo.com',
    role: 'Parent',
    password: 'wwwlalaw',
    confirmPassword:'wwwlalaw',
    name:{firstName:'Ali',
        lastName:'dessouki'},
    gender:'male'
};

describe("register a parent", () => {
    it("it should register a user", (done) => {

    chai.request("http://localhost:3000/api").post("/auth/register").send(parent).end((err,res) =>{
    parentId = res.body._id;
    done();
});
}).timeout(5000); });
describe("login a parent", () => {
    it("it should login a user", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/login").send(parent).end((err,res)=>{
        parentToken = res.body.data;
    done();
});
}).timeout(5000); });


child ={
    username: 'ahmed',
    password: 'wwwlalaw',
    confirmPassword:'wwwlalaw',
    name:{firstName:'Ahmed',
        lastName:'dessouki'},
    gender:'male'
};

describe("register a child", () => {
    it("it should register a child", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/child").send(child).set('authorization',parentToken).end((err,res) =>{
    childId = res.body._id;
    done();
});
}).timeout(5000); });
describe("login a user", () => {
    it("it should login a user", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/login").send(child).end((err,res)=>{
        childToken = res.body.data;
    done();
});
}).timeout(5000); });



});

describe("GET teacherSchedule", () => {
    it("should get schedule by its teacher's id", (done) => {
    let req = {
        params : {UserId : id}
    };

    let res = testUtils.responseValidatorAsync(200, (user) => {
    res.body.should.be.a('object');
    res.body.should.have.property('saturday');
    res.body.should.have.property('sunday');
    res.body.should.have.property('monday');
    res.body.should.have.property('tuesday');
    res.body.should.have.property('wednesday');
    res.body.should.have.property('thursday');
    res.body.should.have.property('friday');
    done();
});

    schedule.getTeacherSchedule(req, res);
});

it("should throw an error for invalid id", (done) => {
    let req = {
        params : {id: '23545'}
    };

let res = testUtils.responseValidatorAsync(500, (err) => {
    done();
});

schedule.getTeacherSchedule(req, res);
});
});

after((done) => {
    mongoose.disconnect(done);
});
});

