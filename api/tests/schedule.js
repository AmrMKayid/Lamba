process.env.NODE_ENV = 'test';
var server = require('../../bin/www');
var base = process.env.PWD;
var config= require('../config'),
    logger= require('mocha-logger')
    mongoose = require('mongoose'),
    user = require('../models/user.model'),
    task = require('../models/task.model'),
    auth = require( '../controllers/auth.controller'),
    schedule = require( '../controllers/schedule.controller'),
    taskCon= require( '../controllers/task.controller'),
    chai = require('chai'),
    expect=chai.expect,
    chaiHttp = require('chai-http'),
    chai.use(chaiHttp);


describe("schedule ", () => {
    let  teacher , parent , child , task , com , teacherToken, parentToken , childToken , teacherId , childId , parentId , taskId ;
    before((done) => {
        mongoose.connect('mongodb://localhost:27017/lambatest', () => {
            console.log('Connected to lambatest');
            done();
        });
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
        it("it should register a user and create his schedule", (done) => {

            chai.request("http://localhost:3000/api").post("/auth/register").send(teacher).end((err,res) =>{
                teacherId = res.body.data._id;
                expect(res.body.data.schedule.table.saturday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.sunday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.monday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.tuesday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.wednesday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.thursday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.friday).to.be.an('array').that.is.not.empty;
                done();
            });
        });
    });
    describe("login a teacher", () => {
        it("it should login a user", (done) => {
            chai.request("http://localhost:3000/api").post("/auth/login").send(teacher).end((err,res)=>{
                teacherToken = res.body.data;
                done();
            });
        });
    });


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
                parentId = res.body.data._id;
                expect(res.body.data.schedule.table.saturday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.sunday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.monday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.tuesday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.wednesday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.thursday).to.be.an('array').that.is.empty;
                expect(res.body.data.schedule.table.friday).to.be.an('array').that.is.empty;
                done();
            });
        });
    });
    describe("login a parent", () => {
        it("it should login a user", (done) => {
            chai.request("http://localhost:3000/api").post("/auth/login").send(parent).end((err,res)=>{
                parentToken = res.body.data;
                done();
            });
        });
    });


    child ={
        username: 'ahmed',
        password: 'wwwlalaw',
        confirmPassword:'wwwlalaw',
        name:{firstName:'Ahmed',
              lastName:'dessouki'},
        gender:'male'
    };

    describe("register a child and create his schedule", () => {
        it("it should register a child", (done) => {
            chai.request("http://localhost:3000/api").post("/auth/child").set("authorization",parentToken).send(child).end((err,res) =>{
                childId = res.body.data._id;
                expect(res.body.data.schedule.table.saturday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.sunday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.monday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.tuesday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.wednesday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.thursday).to.be.an('array').that.is.not.empty;
                expect(res.body.data.schedule.table.friday).to.be.an('array').that.is.not.empty;
                done();
            });
        });
    });
    describe("login a user", () => {
        it("it should login a child", (done) => {
            chai.request("http://localhost:3000/api").post("/auth/login").send(child).end((err,res)=>{
                childToken = res.body.data;
                done();
            });
        });
    });

    describe("get a child schedule", () => {
        it("it should return child schedule for his parent", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/'+ childId).set("authorization",parentToken).end((err,res) =>{
                expect(res).to.have.status(200);
                expect(res.body.data).to.have.property('saturday');
                expect(res.body.data).to.have.property('sunday');
                expect(res.body.data).to.have.property('monday');
                expect(res.body.data).to.have.property('tuesday');
                expect(res.body.data).to.have.property('wednesday');
                expect(res.body.data).to.have.property('thursday');
                expect(res.body.data).to.have.property('friday');
                done();
            });
        });


        it("it should return child schedule for himself", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/'+ childId).set("authorization",childToken).end((err,res) =>{
                expect(res).to.have.status(200);

                expect(res.body.data).to.have.property('saturday');
                expect(res.body.data).to.have.property('sunday');
                expect(res.body.data).to.have.property('monday');
                expect(res.body.data).to.have.property('tuesday');
                expect(res.body.data).to.have.property('wednesday');
                expect(res.body.data).to.have.property('thursday');
                expect(res.body.data).to.have.property('friday');
                done();
            });
        });


        it("it should not return child schedule for unauthorized user", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/'+ childId).set("authorization",teacherToken).end((err,res) =>{
                expect(res).to.have.status(401);
                done();
            });
        });


        it("it should return 422 for unvalid object id", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/sahjfkjahas').set("authorization",childToken).end((err,res) =>{
                expect(res).to.have.status(422);
                done();
            });
        });

        it("it should return 404 for not finding user", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/'+ teacherId).set("authorization",childToken).end((err,res) =>{
            expect(res).to.have.status(404);
            done();
            });
        });


        it("it should return 401 for not being logged in", (done) => {
            chai.request("http://localhost:3000/api").get('/schedule/getChildSchedule/'+ childId).end((err,res) =>{
                expect(res).to.have.status(401);
                done();
            });
        });
    });


    describe("getting teacher schedule",()=>{
        it("it should return 200 ok",(done)=>{
            chai.request("http://localhost:3000/api").get('/schedule/getTeacherSchedule/'+teacherId).set("authorization",teacherToken).end((err,res) =>{
                expect(res).to.have.status(200);
                expect(res.body.data.table).to.have.property('saturday');
                expect(res.body.data.table).to.have.property('sunday');
                expect(res.body.data.table).to.have.property('monday');
                expect(res.body.data.table).to.have.property('tuesday');
                expect(res.body.data.table).to.have.property('wednesday');
                expect(res.body.data.table).to.have.property('thursday');
                expect(res.body.data.table).to.have.property('friday');
                done();
            });
        });
        it("it should return 422",(done)=>{
            chai.request("http://localhost:3000/api").get('/schedule/getTeacherSchedule/123abge').set("authorization",teacherToken).end((err,res) =>{
                expect(res).to.have.status(422);
                done();
            });
        });
        it("it should return 404",(done)=>{
            chai.request("http://localhost:3000/api").get('/schedule/getTeacherSchedule/5acbc578a423863d2430e9c6').set("authorization",teacherToken).end((err,res) =>{
                expect(res).to.have.status(404);
                done();
            });
        });

    });

    describe("create a task", () => {
        it("it should create a task" , (done) => {
            task = {
                title: "dummy task",
                description: "description for dummy task",
                userId: parentId ,
                studentId: childId
            };
            chai.request("http://localhost:3000/api").post("/task/newTask").send(task).end((err,res)=>{
                taskId = res.body.data._id;
                done();
            });
        });
    });

    describe("create a comment", () => {


        it("it should create a comment" , (done) => {
            com = {
                comment: "dummy comment",
                userId: parentId ,
                userType: "Parent",
                name: "dummy name",
                taskId : taskId
            };
            chai.request("http://localhost:3000/api").post("/task/newComment").send(com).set("authorization",parentToken).end((err,res)=>{
                expect(res).to.have.status(201);
                done();
            });
        });

        it("it should create a comment made by the parent in a teacher task" , (done) => {
            com = {
                comment: "dummy comment",
                userId: teacherId ,
                userType: "Parent",
                name: "dummy name",
                taskId : taskId
            };
            chai.request("http://localhost:3000/api").post("/task/newComment").send(com).set("authorization",parentToken).end((err,res)=>{
                expect(res).to.have.status(201);
                done();
            });
        });


        it("it should not create a comment because user is not logged in" , (done) => {
            com = {
                comment: "dummy comment",
                userId: parentId ,
                userType: "Parent",
                name: "dummy name",
                taskId : taskId
            };
            chai.request("http://localhost:3000/api").post("/task/newComment").send(com).end((err,res)=>{
                expect(res).to.have.status(401);
                done();
            });
        });

        it("it should not find the task" , (done) => {
            com = {
                comment: "dummy comment",
                userId: parentId ,
                userType: "Parent",
                name: "dummy name",
                taskId : parentId
            };
            chai.request("http://localhost:3000/api").post("/task/newComment").send(com).set("authorization",parentToken).end((err,res)=>{
                expect(res).to.have.status(404);
                done();
            });
        });

    });





    after((done) => {
        mongoose.connection.db.dropDatabase();
        done();
    });



});