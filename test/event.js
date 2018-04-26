process.env.NODE_ENV = 'test';

// require('../api/models/Activity.model');
// require('../api/models/User.model');
// require('../api/models/User.model');
let mongoose = require("mongoose");
let Activity = mongoose.model('Activity');
let User = mongoose.model('User');
let Child = mongoose.model('Child');
let jwt = require('jsonwebtoken');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;
chai.use(chaiHttp);

const admin = {
  role: "Admin",
  email: "usertest@test.com",
  password: "lambatest",
  confirmPassword: "lambatest",
  name: {
    firstName: "admin",
    lastName: "test"
  },
  _id: mongoose.Types.ObjectId()
};

const parent = {
  role: "Parent",
  email: "usertest@test.com",
  password: "lambatest",
  confirmPassword: "lambatest",
  name: {
    firstName: "admin",
    lastName: "test"
  },
  _id: mongoose.Types.ObjectId()
};

const activity = {
  _id: mongoose.Types.ObjectId(),
  name: "activity1",
  description: "1234567890",
  place: "gasjkhkjhkjdghkjsg",
  price: 100,
  going_user_id: [],
  comments: [],
  activity_type: "asd",
  picture_url: "#",
  host_id: parent._id,
  host_firstName: "Ahmed",
  host_lastName: "Shawky",
  isVerified: true,
  created_at: Date.now(),
  updated_at: Date.now()
};


const activity2 = {
  _id: mongoose.Types.ObjectId(),
  name: "activity2",
  description: "1234567890",
  place: "gasjkhkjhkjdghkjsg",
  price: 100,
  going_user_id: [],
  comments: [],
  activity_type: "asd",
  picture_url: "#",
  host_id: parent._id,
  host_firstName: "Ahmed",
  host_lastName: "Shawky",
  isVerified: true,
  created_at: Date.now(),
  updated_at: Date.now()
};

const child1 = {
  _id: mongoose.Types.ObjectId(),
  "name": {
    "firstName": "c",
    "lastName": "c"
  },
  "username": "child1",
  "password": "$2a$10$EtajIVfhqDI91Srz7OImHe84TYtWPZ0Ty5FVJ.ZR79DVVrMhy/31y",
  "gender": "male",
  "parent_id": parent._id,
  "role": "Child",
  "allowedArticles": [],
  "enrolledActivities": [],
  "__v": 1
};


// use this token as the authentication token
const adminToken = jwt.sign({
  user: admin
}, server.get('secret'), {
  expiresIn: '12h'
});

const parentToken = jwt.sign({
  user: parent
}, server.get('secret'), {
  expiresIn: '12h'
});

/*Deletes all the Events in the data before each test*/
before(function(done) {
  Activity.remove({}, (err) => {
    Child.remove({}, (err) => {
      console.log("Removed all Children");

      Activity.create(activity, (err, data) => {
        console.log("Activity1 created");
        Activity.create(activity2, (err, data) => {
          console.log("Activity2 created");
          Child.create(child1, (err, data) => {
            console.log("child created");

          });
        });
      });
      done();
    });
  });
});

/*****************************************************************************************
 *                                                                                       *
 *                                                                                       *
 *                                    store Tests                                        *
 *                                                                                       *
 *                                                                                       *
 *****************************************************************************************/

registerChildTests();

function registerChildTests() {
  describe('registerChild1', () => {
    it("It should add the child's id to the event's registerChildList", (done) => {
      console.log("Test entered");
      chai.request(server).post('/api/activity/registerChild').set('authorization', parentToken).send({
          activityID: activity._id,
          childId: child1._id
        })
        .end(function(err, res) {

          Activity.findById(activity._id, (err, activityData) => {
            assert.equal(activityData.going_user_id['length'], 1);
            assert.equal(activityData.going_user_id.includes(child1._id + ""), true);

            done();
          });

        });
    });
  });

  describe('registerChild2', () => {
    it("It shouldn't add child's id to other events", (done) => {
      console.log("Test2 entered");
      chai.request(server).post('/api/activity/registerChild').set('authorization', parentToken).send({
          activityID: activity._id,
          childId: child1._id
        })
        .end(function(err, res) {

          Activity.findById(activity2._id, (err, activityData) => {
            assert.equal(activityData.going_user_id['length'], 0);
            assert.equal(activityData.going_user_id.includes(child1._id + ""), false);

            done();
          });

        });
    });
  });

}