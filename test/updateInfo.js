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
describe('update User info' , () => {
  let token,fakeToken,fakeLogin,teacherLogin,taeacherSignup,Info,userID,body,parent;


  before((done) => {
      mongoose.connect('mongodb://localhost:27017/lamba', () => {
          console.log('Connected to lamba');
          done();
      });
  });
  taeacherSignup = {
      name: {
          firstName: 'Amr',
          lastName: 'Kayid'
      },
      email: 'amr@teacher.com',
      role: 'Teacher',
      password: '123456789',
      confirmPassword: '123456789',
      gender: 'male'
  },
 Info = {
    "name": {
      "firstName": "Mustafa",
      "middleName": "Goudah",
      "lastName": "Abdulkhalek"
    },
    "address": {
      "street": "updatedStreet",
      "city": "updatedCity",
      "state": "updatedState",
      "zip": 12345
    },
    "birthday": "1/1/1998",
  "phone": 12345678,
    "about": "dummy about",
  },

  teacherLogin = {
    "email":"amr@teacher.com",
    "password":"123456789"
  },

  fakeLogin = {
    "email":"mg@gmail.com",
    "password":"123456789"
  };



  describe("Register as a Teacher", () => {
      it("it should register the user as Teacher", (done) => {
          chai.request(apiURL).post("/auth/register").send(taeacherSignup).end((err, res) => {
             userID = res.body.data._id;
            console.log(userID);
              expect(res.body.msg).to.be.eql('Registration successful, you can now login to your account.');
              expect(res).to.have.status(201);
              done();
          });
      });
  });



  describe("Login a User", () => {
      it("it should login a user", (done) => {
          chai.request(apiURL).post("/auth/login").send(teacherLogin).end((err, res) => {
              token = res.body.data;
              expect(res.body.msg).to.be.eql('Welcome');
done();

          });
      });
  });

  describe("Login a second User", () => {
      it("it should login a user", (done) => {
          chai.request(apiURL).post("/auth/login").send(fakeLogin).end((err, res) => {
              fakeToken = res.body.data;
              expect(res.body.msg).to.be.eql('Welcome');
done();

          });
      });
  });



describe ("update tecaher info", () =>{
  it("it should update teacher's info", (done)=>{
    chai.request(apiURL).patch("/user/updateUser/"+userID).set("Authorization",token).send(Info).end((err,res) =>{
            expect(res).to.have.status(200);
             expect(res.body.msg).to.be.eql('Information is Updated!');
  done();

  });
  });

});

describe ("don't update tecaher info", () =>{
  it("it should not update teacher's info for unauthorized users", (done)=>{
    chai.request(apiURL).patch("/user/updateUser/"+userID).set("Authorization",fakeToken).send(Info).end((err,res) =>{
            expect(res).to.have.status(401);
            expect(res.body.msg).to.be.eql('Not authorized.');
  done();

  });
  });

});


});
*/