process.env.NODE_ENV = 'test';

var base = process.env.PWD;
var mongoose = require('mongoose'),
    user = require('../models/user.model'),
    auth = require( '../controllers/schedule.controller'),
    schedule = require( '../controllers/schedule.controller'),

    should = require('should'),

     chai = require('chai'),
    chaiHttp = require('chai-http'),
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
    var id, teacher, token;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/lambatest', () => {
    console.log('Connected to lambatest');
done();
});

teacher ={
    'email': "mm@f.com",
    'role': "Teacher",
    'password': 'wwww',
    'name':{'firstname':'Mariam',
        'lastName':'dessouki'}
};
describe("register a user", () => {
it("it should register a user", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/register").send(teacher).end((err,res) =>{
    id = res.body._id;
    done();
});
}); });

describe("login a user", () => {
    it("it should login a user", (done) => {
    chai.request("http://localhost:3000/api").post("/auth/login").send(teacher).end((err,res)=>{
        token = res.body.data;
        done();
    });
}); });



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
});
