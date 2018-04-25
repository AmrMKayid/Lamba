process.env.NODE_ENV = 'test';

require('../api/models/activity.model');
let mongoose = require("mongoose");
let Activity = mongoose.model('Activity');
let jwt = require('jsonwebtoken');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let assert = chai.assert;
chai.use(chaiHttp);



const user = {
    role: "Admin",
    email: "usertest@test.com",
    password: "lambatest",
    confirmPassword: "lambatest",
    name: {
        firstName: "user",
        lastName: "test"
    },
    _id: mongoose.Types.ObjectId()
};

// use this token as the authentication token
const auth_token = jwt.sign({
    user: user
}, server.get('secret'), {
    expiresIn: '12h'
});



/*Deletes all the items in the data before each test*/
before(function (done) {
    Activity.remove({}, (err) => {
        done();
    });
});


/*Call the tests*/
RegisterForaChildTest();
createActivityTest();
DeleteActivityTest();
EditActivityTest();
GoingActivity();

/*
 *  Register for a child test 
 */
function RegisterForaChildTest()
{

	/*TODO: Ahmed Shawky*/
}


/*
 * Create Item
 */
function createActivityTest()
{
	/*TODO: Mayar*/
}

/*
 * Delete Item
 */
function DeleteActivityTest()
{
	/*TODO: Mayar*/
}


function EditActivityTest()
{
	/*TODO: Mayar*/
}


function GoingActivity()
{

	/*TODO: sohail*/
}


/*****************************************************************************************
 *                                                                                       *
 *                                                                                       *
 *                                    helpers                                            *
 *                                                                                       *
 *                                                                                       *
 *****************************************************************************************/



