/**
  * controller for the notification
  */

  var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/validations'),
    User = mongoose.model('User'),
    Notification = mongoose.model('Notification'),
	jwt = require('jsonwebtoken'),
	mw = require('../routes/middlewares'),
    path = require('path'),
    User = mongoose.model('User');



module.exports.addNotification = async function (req, res, next) {
 
	 var valid = req.body.title && Validations.isString(req.body.title) &&
	        req.body.description && Validations.isString(req.body.description) &&
	        req.body.url && Validations.isString(req.body.url) &&
	        req.body.recieving_user_id && Validations.isString(req.body.recieving_user_id);

	// returns error if not valid
	if (!valid) {
	    return res.status(422).json({
	        err: null,
	        msg: 'One or More field(s) is missing or of incorrect type',
	        data: null
	    });
	}


	// Creates the new item object
    notification = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        price: req.body.price,
        recieving_user_id: req.body.recieving_user_id,
        created_at: Date.now(),
        updated_at: Date.now()
    };

     // inserts the new object in the database
    Notification.create(notification, function (err, newNotification) {
        if (err) {
            return res.status(422).json({
                err: err,
                msg: "Couldn't create item",
                data: null
            });
        }
        return res.status(200).json({
            err: null,
            msg: "Created Item successfully",
            data: newNotification
        });

    });

}
