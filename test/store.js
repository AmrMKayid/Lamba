process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../api/models/item.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);




/*This will empty the items database everytime before testing*/ 
describe('Items', () => {
    beforeEach((done) => { 
        Item.remove({}, (err) => { 
           done();         
        });     
    });
});
/*

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




