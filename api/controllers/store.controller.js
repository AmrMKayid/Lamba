var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Item = mongoose.model('Item');
  jwt = require('jsonwebtoken');




module.exports.createItems = async function(req, res, next) {
	
	// checks for the validity of all the required fields	
	var valid = req.body.name && Validations.isString(req.body.name)
				&& req.body.description && Validations.isString(req.body.description)
				&& req.body.quantity && Number.isInteger(req.body.quantity)
				&& req.body.price && typeof req.body.price == "number" 
				&& req.body.item_type && Validations.isString(req.body.item_type)
				&& req.body.picture_url && Validations.isString(req.body.picture_url);
	// returns error if not valid
  	if (!valid) {
		return res.status(422).json({
		  err: null,
		  msg: 'One or More field(s) is missing or of incorrect type',
		  data: null
		});
	  }


	// gets the logged in user id	
	const authorization =  req.headers.authorization;
	const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

    // Creates the new item object
    item = {
    	name: req.body.name,
    	description: req.body.description,
    	quantity: req.body.quantity,
    	price: req.body.price,
    	likes_user_id: [],
    	buyers_id: [],
    	item_type: req.body.item_type,
    	item_condition: req.body.item_condition == undefined? null : req.body.item_condition,
    	picture_url: req.body.picture_url,
    	seller_id: user_id
    };
  console.log(item);
  	// inserts the new object in the database
    Item.create(item, function(err, newItem){
    	if(err)
    	{
    		return res.status(422).json({
			  err: null,
			  msg: "Couldn't create item",
			  data: null
			});
    	}
    	res.status(200).json({ err: null, msg: "Created Item successfully" , data: newItem });

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


