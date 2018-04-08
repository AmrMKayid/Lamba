process.env.NODE_ENV = 'test';

var mongoose = require("mongoose"),
     User = require('../models/user.model'),
    Task = require('../models/task.model'),
    Item = require('../models/item.model'),
    Article = require('../models/article.model'),
    Tag = require('../models/tag.model'),
         route = require('../routes/index'),
    chai = require('chai'),
chaiHttp = require('chai-http'),
    should = chai.should();

describe('Getting schedule',() => {
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
});