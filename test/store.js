process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../api/models/item.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

console.log("hello");



/*This will empty the items database everytime before testing*/ 
describe('Items', () => {
    beforeEach((done) => { 
        Book.remove({}, (err) => { 
           done();         
        });     
    });
/*



/*****************************************************************************************
 *																					     *
 *																						 *
 *									store Tests											 *											
 *																						 *
 *                                                  									 *
 *****************************************************************************************/

/*
 * Tests for Items creation
 * Route: post('api/store/create')
 */
function CreateItemsTests()
{
	describe('Create Items', function(){

	});
}


