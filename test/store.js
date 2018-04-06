process.env.NODE_ENV = 'test';

require('../api/models/item.model');
let mongoose = require("mongoose");
let Item = mongoose.model('Item');
let jwt = require('jsonwebtoken');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

const user = {
	role: "Admin",
	email: "usertest@test.com",
	password: "lambatest",
	confirmPassword:"lambatest",
	name: {
		firstName: "user",
		lastName: "test"
	},
	_id: mongoose.Types.ObjectId()
};


// use this token as the authentication token
const auth_token = jwt.sign({user: user}, server.get('secret'),{expiresIn: '12h'});



/*Deletes all the items in the data before each test*/
before(function(done) {
    Item.remove({}, (err) => { 
           done();         
    });     
}); 

 /*Call tests*/
 CreateItemsTests();
 ViewItemsTests();
 EditItemsTests();
 DeleteItemsTests();
 LikeItemsTests();
 ViewMyItemsTests();

/*****************************************************************************************
 *																					     *
 *																						 *
 *									store Tests											 *											
 *																						 *
 *                                                  									 *
 *****************************************************************************************/

/*
 * Tests for Items creation
 *
 * Routes: -post('api/store/create')
 *  	   -post('api/store/upload')
 */
function CreateItemsTests()
{
	describe('Create Items', function(){
		it('It should create a new Item',createItemCat);
	});
}



/*
 * Tests for Items view 
 * 
 * Routes:  -get('api/store/countItmes')
 *			-get('api/store/view/:tuplesPerPage/:pageNumber')
 */

function ViewItemsTests()
{

	/*TODD: Shawky*/
}

/*
 * Tests for Items Update 
 * 
 * Routes:  -post('api/store/edit/:itemId') 
 *	
 */
 function EditItemsTests()
 {
 	/*TODO: Moghazy*/
 }


/*
 * Tests for Items Deletion 
 * 
 * Routes:  -delete('api/store/delete/:itemId') 
 *	
 */
 function DeleteItemsTests()
 {
 	/*TODO: Moghazy*/
 }


 /*
 * Tests for Items Likes and unlikes 
 * 
 * Routes:  -post('api/store/like/:itemId') 
 *			-patch('api/store/like/:itemId')
 */
 function LikeItemsTests()
 {
 	/*TODO: Mayar*/
 }




 /*
 * Tests for my Items view
 * 
 * Routes:  -get('api/store/myitems/view') 
 */
 function ViewMyItemsTests()
 {
 	/*TODO: Sohail*/
 }




/*****************************************************************************************
 *																					     *
 *																						 *
 *									helpers											 *											
 *																						 *
 *                                                  									 *
 *****************************************************************************************/


 function createItemCat(done)
 {
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
 		res.body.should.have.property('msg').eql('Created Item successfully');
 		res.body.should.have.property('data').should.be.a('object');
 		Item.find({}, function (err, docs) {
 			done();
		});
 	});
 }