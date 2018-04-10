'use strict';
process.env.NODE_ENV='test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('C:/Users/Mustafa Goudah/Lamba/bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
const base = 'C:/Users/Mustafa Goudah/Lamba/api';
const config = require(base + '/config'),
      logger = require('mocha-logger'),
      mongoose = require('mongoose'),
      user = require(base + '/models/user.model.js'),
      users = require(base + '/controllers/user.controller.js'),
      should  =require('should');
describe("Get and Update" , () =>{
  let info  = {
    "name":{
  "firstName":"Bla",
  "lastName":"Bla"
},

"address":{
  "city":"Alex",
  "street":"bla",
  "state":"ss",
  "zip":55

},
"fees":5000
  }
   before((done)=>{
     mongoose.connect('mongodb://localhost:27017/Lamba_test',() => {
       done();
     });
   });
it('it should give back the information' ,(done) =>{
  chai.request("http://localhost:3000/api").get('/user/getUserInfo/5acd073771ad732278968fb1').end((err,res)=>{
    expect (res).to.have.status(200);
    expect (err).to.be.null;
    expect(res.body.data).to.have.deep.property('role','Teacher');
    expect(res.body.data).to.have.deep.property('_id','5acd073771ad732278968fb1');
      expect(res.body.msg).to.eql('User retrieved successfully.');
    done();
  });
});
it('it should return user not found' ,(done) =>{
  chai.request("http://localhost:3000/api").get('/user/getUserInfo/5acd073771ad732278968fb0').end((err,res)=>{
    expect (res).to.have.status(404);
    expect (err).to.be.null;
    expect(res.body.msg).to.eql('User not found.');
    done();
  });
});

it('it should update user information', (done) => {
  chai.request("http://localhost:3000/api").patch('/user/updateUser/5acd073771ad732278968fb1').send(info).end((err,res)=>{
    expect(res).to.have.status(200);
    expect (err).to.be.null;

    expect(res.body.data).to.have.deep.property('name',{firstName:'Bla' , lastName:'Bla'});
      expect(res.body.data).to.have.deep.property('_id','5acd073771ad732278968fb1');
      expect(res.body.data).to.have.deep.property('address',{city:'Alex' , street:'bla' , state: 'ss', zip: 55});
      expect(res.body.data).to.have.deep.property('fees',5000);
      expect(res.body.data).to.have.deep.property('role','Teacher');
      expect(res.body.msg).to.eql('User was updated successfully.');


    done();
  });
});

it('it should not update user information and return user not found', (done) => {
  chai.request("http://localhost:3000/api").patch('/user/updateUser/5acd073771ad732278968fb0').send(info).end((err,res)=>{
    expect(res).to.have.status(404);
    expect (err).to.be.null;
    expect(res.body.msg).to.eql('User not found.');
    done();
  });
});

it('it should not return the info if the id is not valid',(done)=>{
  chai.request("http://localhost:3000/api").get('/user/getUserInfo/5acd073771ad73').end((err,res)=>{
    expect (res).to.have.status(422);
    expect (err).to.be.null;
    expect(res.body.msg).to.eql('userId parameter must be a valid ObjectId.');
    done();
  });
});

it('it should not update info if the id is not valid',(done)=>{
  chai.request("http://localhost:3000/api").patch('/user/updateUser/5acd073771').send(info).end((err,res)=>{
    expect (res).to.have.status(422);
    expect (err).to.be.null;
    expect(res.body.msg).to.eql('userId parameter must be a valid ObjectId.');
    done();
  });
})

});
