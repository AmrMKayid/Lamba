process.env.NODE_ENV = 'test';

require('../api/models/item.model');
let mongoose = require("mongoose");
let Notification = mongoose.model('Notification');
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
    Item.remove({}, (err) => {
        done();
    });
});






/*
 * Create  notification test 
 */
function CreateNotification()
{
	describe('Create multiple Notifications', function () {
        it('It should create multiple Items', createItemCat);
    });

    describe('Notification with missing field', function () {
        it('It should respond with an error message', createMultipleItems);
    });
}







/*****************************************************************************************
 *                                                                                       *
 *                                                                                       *
 *                                    helpers                                            *
 *                                                                                       *
 *                                                                                       *
 *****************************************************************************************/


function createMultipleNotifications(done)
{
	const notification1 = {
		title: "Mohsen invited you",
		description: "you was invited by mohsen to an activity",
		url: "/home"	
	};

	const notification2 = {
		title: "Mohsen messaged you",
		description: "you send you a message",
		url: "/home"	
	};
	const notification3 = {
		title: "Mohsen likes you",
		description: "you was invited by mohsen to an activity",
		url: "/home"	
	};

	 chai.request(server).post('/api/notifications/create').set('authorization', auth_token).send(notification1)
        .end((err, res) => {
		
			chai.request(server).post('/api/notifications/create').set('authorization', auth_token).send(notification2)
                .end((err, res) => {
 					chai.request(server).post('/api/notifications/create').set('authorization', auth_token).send(notification3)
                        .end((err, res) => {
				 Notification.find({}, function (err, docs) {

                                docs.should.have.property('length').eql(3);

                                actual_item = docs[0];
                                assertItem(notification1, actual_item);
                                actual_item = docs[1];
                                assertItem(notification2, actual_item);
                                actual_item = docs[2];
                                assertItem(notificaion3, actual_item);
                                done();
                  });

			});
		});

	});

}


/** notification, notification -> void
 * Asserts the expected item against the actual item
 * Item expected: the exepected item
 * Item actual: the actual item that was inserted to the database
 */
function assertItem(expected, actual) {
    // makes sure the correct fields were inserted
    actual.should.have.property('title').eql(expected.title);
    actual.should.have.property('description').eql(expected.description);
    actual.should.have.property('url').eql(expected.url);
    actual.should.have.property('recieving_user_id').eql(user._id);
}