process.env.NODE_ENV = 'test';


var mongoose = require("mongoose"),
    config = require('../config/index')
     User = require('../models/user.model'),
    schedule = require( '../controllers/schedule.controller'),
    chai = require('chai'),
chaiHttp = require('chai-http'),
    should = chai.should();
chai.use(chaiHttp);

describe('Getting schedule',() => {



/*describe('Getting schedule',() => {
>>>>>>> d1e9702dddaa138cd2aefc18c04b5bf97db409ee
    it('should return the teacher schedule',(done) => {
        var user =  {
            'email': 'mm@f.com',
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
    var id;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/lambatest', () => {
    console.log('Connected to lambatest');
done();
});
});




describe("GET teacherSchedule", () => {
    it("should get schedule by its teacher's id", (done) => {
      var  user = new User({
            role: 'Teacher',
            email: 'mm@f.com',
            password: 'wwww',
            name:{firstname:'Mariam',
                lastName:'dessouki'}
        });

        user.save((err, user) => {
            if (err) { console.log(err); }
            id = user._id;
        });
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
});