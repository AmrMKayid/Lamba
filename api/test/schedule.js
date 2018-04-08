process.env.NODE_ENV = 'test';

var base = process.env.PWD;
var mongoose = require('mongoose'),
    user = require('../models/user.model'),
    schedule = require( '../controllers/schedule.controller'),
    should = require('should'),
    testUtils = require('../test/utils');

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
    let id, teacher;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/lambatest', () => {
    console.log('Connected to lambatest');
done();
});

teacher = new user({
    email: "mm@f.com",
    role: "Teacher",
    password: 'wwww',
    name:{firstname:'Mariam',
        lastName:'dessouki'}
});

teacher.save((err, user) => {
    if (err) { res.send(err); }
    id = user._id;
});
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
