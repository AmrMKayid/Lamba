var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Store = mongoose.model('Item');
  jwt = require('jsonwebtoken');




module.exports.createItems = async function(req, res, next) {
	
	// checks for the validity of all the required fields	
	var valid = req.body.name && Validations.isString(req.body.name)
				&& req.body.description && Validations.isString(req.body.description)
				&& req.body.quantity && Number.isInteger(req.body.quantity)
				&& req.body.price && Number.isNaN(req.body.price)
				&& req.body.type && Validations.isString(req.body.type)
				&& req.body.pic_url && Validitions.isString(req.body.pic_url);
	// returns error if not valid
  	/*if (!valid) {
		return res.status(422).json({
		  err: null,
		  msg: 'One or More field(s) is missing or of incorrect type',
		  data: null
		});
	  }*/

	// checks that the user exists in the database
	var response = await User.findOne({email: "abdullah@hotmail.com"});

	
	const authorization =  req.headers.authorization;
	const secret = req.app.get('secret');

    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

    item = {
    	name: req.body.name,
    	description: req.body.description,
    	quantity: req.body.quantity,
    	price: req.body.price,
    	likes_user_id: [],
    	buyers_id: [],
    	type: req.body.type,


    };
  


    return res.status(200).json({

		msg:decoded
	});
}


module.exports.viewItems = function(req, res, next) {
	console.log("view\n");

}



module.exports.editItems = function(req, res, next) {

	console.log("edit\n");
}



module.exports.deleteItems = function(req, res, next) {

	console.log("delete\n");
}


module.exports.buyItems = function(req, res, next) {
	console.log("buy\n");

}


module.exports.likeItems = function(req, res, next) {

	console.log("like\n");
}

/*****************************************************************************
 *																			 *
 *                          private functions								 *
 *																			 *
 *****************************************************************************/

/**
  * Object -> Promise -> Boolean
  * returns a promise that has a boolean
  */
async function userExists(key)
{
	const user = await User.findOne(key).exec();

}


