'use strict';
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


describe('Registration & Login', () => {

    let parent, teacher, child, parentToken, teacherToken, childToken, pID, tID, cID;
    var user;

    before((done) => {
        mongoose.connect('mongodb://localhost:27017/lambatest', () => {
            console.log('Connected to lambatest');
            done();
        });
    });


    //------------------------------ Successful Registration & Login ------------------------------//


    parent = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@parent.com',
        role: 'Parent',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent", () => {
        it("it should register the user as Parent", (done) => {
            chai.request(apiURL).post("/auth/register").send(parent).end((err, res) => {
                pID = res.body.data._id;
                expect(res.body.msg).to.be.eql('Registration successful, you can now login to your account.');
                expect(res).to.have.status(201);
                done();
            });
        });
    });


    teacher = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@teacher.com',
        role: 'Teacher',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Teacher", () => {
        it("it should register the user as Teacher", (done) => {
            chai.request(apiURL).post("/auth/register").send(teacher).end((err, res) => {
                tID = res.body.data._id;
                expect(res.body.msg).to.be.eql('Registration successful, you can now login to your account.');
                expect(res).to.have.status(201);
                done();
            });
        });
    });

    describe("Login as a Parent", () => {
        it("it should login the user as Parent", (done) => {
            chai.request(apiURL).post("/auth/login").send(parent).end((err, res) => {
                parentToken = res.body.data;
                expect(res.body.msg).to.be.eql('Welcome');
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    child = {
        name: {
            firstName: 'Child_FirstName',
            lastName: 'Child_LastName'
        },
        username: 'ChildUserName',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("register a child", () => {
        it("it should register a child", (done) => {
            chai.request(apiURL).post("/auth/child").set("authorization", parentToken).send(child).end((err, res) => {
                cID = res.body.data._id;
                expect(res.body.msg).to.be.eql('Registration successful, Child is now added.');
                expect(res).to.have.status(201);
                done();
            });
        });
    });

    describe("Login as a Teacher", () => {
        it("it should login the user as Teacher", (done) => {
            chai.request(apiURL).post("/auth/login").send(teacher).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe("Login as a Child", () => {
        it("it should login the user as Child", (done) => {
            chai.request(apiURL).post("/auth/login").send(child).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    //------------------------------------------------------------------------------------------//


    //--------------------------- UnSuccessful Registration & Login ---------------------------//

    user = {
        // name: {
        //     firstName: 'Amr',
        //     lastName: 'Kayid'
        // },
        email: 'amr@user.com',
        role: 'Parent',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent without the name", () => {
        it("it should return 422 because name is missing", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });

    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        // email: 'amr@user.com',
        role: 'Parent',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent without the email", () => {
        it("it should return 422 because email is missing", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });


    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@user.com',
        // role: 'Parent',
        password: '123456789',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent without providing a role", () => {
        it("it should return 422 because role is missing", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });

    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@user.com',
        role: 'Parent',
        // password: '123456789',
        // confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent without providing a password", () => {
        it("it should return 422 because password is missing", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });

    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@user.com',
        role: 'Parent',
        password: '123456789',
        confirmPassword: '123456789',
        // gender: 'male'
    };

    describe("Register as a Parent without providing a gender", () => {
        it("it should return 422 because gender is missing", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });

    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@user.com',
        role: 'Parent',
        password: '123456',
        confirmPassword: '123456',
        gender: 'male'
    };

    describe("Register as a Parent with password less than 8", () => {
        it("it should return 422 because password is less than 8", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });

    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@user.com',
        role: 'Parent',
        password: '12345678',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent with password & different confirm password", () => {
        it("it should return 422 because password & confirm password unequal", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });


    user = {
        name: {
            firstName: 'Amr',
            lastName: 'Kayid'
        },
        email: 'amr@parent.com',
        role: 'Parent',
        password: '12345678',
        confirmPassword: '123456789',
        gender: 'male'
    };

    describe("Register as a Parent with existing email", () => {
        it("it should return 422 because user exist with this email", (done) => {
            chai.request(apiURL).post("/auth/register").send(user).end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });
    });


    user = {
        password: '123456789',
    };

    describe("Login as a Parent without email", () => {
        it("it should not login this user without providing his/her email", (done) => {
            chai.request(apiURL).post("/auth/login").send(user).end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });

    user = {
        email: 'amr@parent.com',
    };

    describe("Login as a Parent without password", () => {
        it("it should not login this user without providing his/her password", (done) => {
            chai.request(apiURL).post("/auth/login").send(user).end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });

    user = {
        email: 'amrNotExists@parent.com',
        password: '123456789',
    };

    describe("Login as a Parent with unregister account", () => {
        it("it should not login this user", (done) => {
            chai.request(apiURL).post("/auth/login").send(user).end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });

    user = {
        email: 'amr@parent.com',
        password: '123',
    };

    describe("Login as a Parent with incorrect password", () => {
        it("it should not login this user with incorreect password", (done) => {
            chai.request(apiURL).post("/auth/login").send(user).end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });
    });

    //--------------------------------------------------------------------------------------//

    after((done) => {
        mongoose.connection.db.dropDatabase();
        done();
    });


});
