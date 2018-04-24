process.env.NODE_ENV = 'test';

require('../api/models/item.model');
let mongoose = require("mongoose");
let Item = mongoose.model('Item');
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

/*Call tests*/
CreateItemsTests();
ViewItemsTests();
EditItemsTests();
//DeleteItemsTests();
LikeItemsTests();
ViewMyItemsTests();

/*****************************************************************************************
 *                                                                                       *
 *                                                                                       *
 *                                    store Tests                                        *
 *                                                                                       *
 *                                                                                       *
 *****************************************************************************************/

/*
 * Tests for Items creation
 *
 * Routes: -post('api/store/create')
 *  	   -post('api/store/upload')
 */
function CreateItemsTests() {
    describe('Create Items', function () {
        it('It should create a new Item', createItemCat);
    });

    describe('Create multiple Items', function () {
        it('It should create multiple Items', createMultipleItems);
    });
    describe('Item with missing field', function () {
        it('It respond with an error', createItemFail);
    });
}


/*
 * Tests for Items view
 *
 * Routes:  -get('api/store/countItmes')
 *			-get('api/store/view/:tuplesPerPage/:pageNumber')
 */

function ViewItemsTests() {


    describe('View first n Items', function () {

        it('It should return an array of items consisting of the first n items', function (done) {


            chai.request(server).get('/api/store/view/2/1').set('authorization', auth_token)
                .end(function (err, res) {


                    assert.equal(res.body.data['length'], 2);
                    assert.equal(res.body.data[0]['name'], 'cats');
                    assert.equal(res.body.data[1]['name'], 'cats');
                    assert.notEqual(res.body.data[0]['_id'], res.body.data[1]['_id']);
                    done();

                });

        })
    });


    describe('View second n Items', function () {

        it('It should return an array of items consisting of the second n items', function (done) {

            chai.request(server).get('/api/store/view/3/2').set('authorization', auth_token)
                .end(function (err, res) {
                    assert.equal(res.body.data['length'], 1);
                    assert.equal(res.body.data[0]['name'], 'dogs');

                    done();

                });

        })
    });


    describe('View total count of items', function () {

        it('It should return the number of items in the database', function (done) {

            chai.request(server).get('/api/store/countItmes').set('authorization', auth_token)
                .end(function (err, res) {
                    assert.equal(res.body.data, '4');

                    done();

                });

        })
    });


    describe('Reject overloading requests', function () {

        it('It should not return any data', function (done) {

            chai.request(server).get('/api/store/view/200/1').set('authorization', auth_token)
                .end(function (err, res) {
                    assert.equal(res.body.data, null);

                    done();

                });

        })
    });
}

/*
 * Tests for Items Update
 *
 * Routes:  -post('api/store/edit/:itemId')
 *
 */
function EditItemsTests() {
    describe('Edit Items', function () {

        const item = {
            name: 'cats',
            description: 'A cat that has 4 legs and 2 eyes',
            quantity: 3,
            price: 300000,
            item_type: 'pet',
            item_condition: 'bad',
        }

        it('It should Edit element', function (done) {

            chai.request(server)
                .get('/api/store/getItemsById').set('authorization', auth_token)
                .end(function (err, res) {
                    console.log("res = " + res);
                    chai.request(server).patch('/api/store/edit/' + res.body.data[0]._id).set('authorization', auth_token).send(item).end(function (error, response) {

                        chai.request(server)
                            .get('/api/store/getItemsById').set('authorization', auth_token)
                            .end(function (err, res) {
                                response.should.have.status(200);
                                assert(res.body.data[0].name, 'cats');
                                assert(res.body.data[0].description, 'A cat that has 4 legs and 2 eyes');
                                assert(res.body.data[0].price, 300000);
                                assert(res.body.data[0].quantity, 3);
                                assert(res.body.data[0].item_type, 'pet');
                                assert(res.body.data[0].item_condition, 'bad');

                            });


                        done();

                    });
                })
        });


    });

}


/*
 * Tests for Items Deletion
 *
 * Routes:  -delete('api/store/delete/:itemId')
 *
 */
function DeleteItemsTests() {

    describe('Delete Items', function () {

        it('It should Delete one element', function (done) {

            chai.request(server)
                .get('/api/store/getItemsById').set('authorization', auth_token)
                .end(function (err, res) {
                    console.log("res =  2 2" + res);
                    console.log(res.body.data[0]._id);
                    let id = res.body.data[0]._id;


                    chai.request(server).delete('/api/store/delete/' + res.body.data[0]._id).end(function (error, response) {
                        console.log('res.body.data[0]._id');

                        chai.request(server)
                            .get('/api/store/getItemsById').set('authorization', auth_token)
                            .end(function (err, res) {
                                response.should.have.status(200);
                                assert(res.body.data[0]._id, id);

                            });

                        done();
                    });
                });
        });
    });

}


/*
 * Tests for Items Likes and unlikes
 *
 * Routes:  -post('api/store/like/:itemId')
 *			-patch('api/store/like/:itemId')
 */
function LikeItemsTests() {
    /*TODO: Mayar*/
}


/*
 * Tests for my Items view
 *
 * Routes:  -get('api/store/myitems/view')
 */
function ViewMyItemsTests() {
    /*TODO: Sohail*/
}


/*****************************************************************************************
 *                                                                                       *
 *                                                                                       *
 *                                    helpers                                            *
 *                                                                                       *
 *                                                                                       *
 *****************************************************************************************/

/** done -> void
 * Sends a post request with an item and checks if the server creates this item successfully
 * Function done: should be called when the test is done
 */
function createItemCat(done) {
    const item = {
        name: 'cats',
        description: 'A cat that has 4 legs and 2 eyes',
        quantity: 3,
        price: 300000,
        item_type: 'pet',
        item_condition: 'bad',
        picture_url: 'img-123213'
    }

    chai.request(server).post('/api/store/create').set('authorization', auth_token).send(item)
        .end((err, res) => {

            // checks for the formate of the response
            res.body.should.have.property('msg').eql('Created Item successfully');
            res.body.should.have.property('data').should.be.a('object');

            // checks that the item was actually inserted in the database
            Item.find({}, function (err, docs) {

                docs.should.have.property('length').eql(1);


                actual_item = docs[0];
                try {
                    assertItem(item, actual_item);
                } catch (err) {
                    console.log(err);
                }
                done();
            });
        });
}

/** done -> void
 * Sends three post request with three  item and checks if the server creates these items successfully
 * Function done: should be called when the test is done
 */
function createMultipleItems() {
    const item1 = {
        name: 'cats',
        description: 'A cat that has 4 legs and 2 eyes',
        quantity: 3,
        price: 300000,
        item_type: 'pet',
        item_condition: 'bad',
        picture_url: 'img-123213'
    }
    const item2 = {
        name: 'dogs',
        description: 'A dog that has 4 legs and 2 eyes',
        quantity: 3,
        price: 300000,
        item_type: 'pet',
        item_condition: 'bad',
        picture_url: 'img-123213'
    }
    const item3 = {
        name: 'bolbol',
        description: 'A toy',
        quantity: 3,
        price: 300000,
        item_type: 'toy',
        item_condition: 'good',
        picture_url: 'img-123213'
    }


    chai.request(server).post('/api/store/create').set('authorization', auth_token).send(item1)
        .end((err, res) => {
            chai.request(server).post('/api/store/create').set('authorization', auth_token).send(item2)
                .end((err, res) => {
                    chai.request(server).post('/api/store/create').set('authorization', auth_token).send(item)
                        .end((err, res) => {
                            Item.find({}, function (err, docs) {
                                console.log(docs.length);
                                docs.should.have.property('length').eql(3);


                                actual_item = docs[0];
                                assertItem(item1, actual_item);
                                actual_item = docs[1];
                                assertItem(item2, actual_item);
                                actual_item = docs[2];
                                assertItem(item3, actual_item);
                                done();
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
    const item = {
        name: 'cats',
        description: 'A cat that has 4 legs and 2 eyes',
        quantity: 3,
        item_type: 'pet',
        item_condition: 'bad',
        picture_url: 'img-123213'
    }

    chai.request(server).post('/api/store/create').set('authorization', auth_token).send(item)
        .end((err, res) => {

            // checks for the formate of the response
            res.should.have.status(422);
            res.body.should.have.property('msg').eql('One or More field(s) is missing or of incorrect type');
            res.body.should.have.property('data').should.be.a('object');

            done();
        });
}


/** item, item -> void
 * Asserts the expected item against the actual item
 * Item expected: the exepected item
 * Item actual: the actual item that was inserted to the database
 */
function assertItem(expected, actual) {
    // makes sure the correct fields were inserted
    actual.should.have.property('name').eql(expected.name);
    actual.should.have.property('description').eql(expected.description);
    actual.should.have.property('price').eql(expected.price);
    actual.should.have.property('item_type').eql(expected.item_type);
    actual.should.have.property('item_condition').eql(expected.item_condition);
}
