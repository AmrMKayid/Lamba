process.env.NODE_ENV = 'test';

require('../api/models/notification.model');
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
    Notification.remove({}, (err) => {
        done();
    });
});


/*call the tests*/
CreateNotification();
ViewNotification();





/*
 * Create  notification test 
 */
function CreateNotification()
{
	describe('Create multiple Notifications', function () {
        it('It should create multiple Items', createMultipleNotifications);
    });

    describe('Notification with missing field', function () {
        it('It should respond with an error message', createItemFail);
    });
}

/*
 * view Notifications test
 */
function ViewNotification()
{
	describe('Retrieve Notification', function () {
        it('Gets all the notifications', viewNotification);
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
		url: "/home",	
		recieving_user_id: user._id	
	};

	const notification2 = {
		title: "Mohsen messaged you",
		description: "you send you a message",
		url: "/home",
		recieving_user_id: user._id		
	};
	const notification3 = {
		title: "Mohsen likes you",
		description: "you was invited by mohsen to an activity",
		url: "/home",
		recieving_user_id: user._id		
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
								console.log(docs.length);
                                assertItem(notification3, actual_item);
							   Notification.remove({}, (err) => {
									done();
								});
                  });

			});
		});

	});

}


/** done -> void
 * Sends a post request with an item missing a field and checks if the server rejects this item
 * Function done: should be called when the test is done
 */
function createItemFail(done) {

		const notification1 = {
		title: "Mohsen invited you",
		description: "you was invited by mohsen to an activity",
		url: "/home",
		};

    chai.request(server).post('/api/notifications/create').set('authorization', auth_token).send(notification1)
        .end((err, res) => {

            // checks for the formate of the response
            res.should.have.status(422);
            res.body.should.have.property('msg').eql('One or More field(s) is missing or of incorrect type');
            res.body.should.have.property('data').should.be.a('object');

            done();
        });
}


function viewNotification(done)
{
		const notification1 = {
		title: "Mohsen invited you",
		description: "you was invited by mohsen to an activity",
		url: "/home",
		recieving_user_id: user._id		
		};
	
		 chai.request(server).post('/api/notifications/create').set('authorization', auth_token).send(notification1)
        .end((err, res) => {
			
			 chai.request(server).get('/api/notifications/get').set('authorization', auth_token).end((err, res) =>{
					
					var data = res.body.data;

					data.should.have.property('length').eql(1);
					data.recieving_user_id = data.recieving_user_id;
					assertItem(notification1, data[0]);
					done();
		
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

}