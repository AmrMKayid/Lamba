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

 console.log(req.body);
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
        seen_at: null
    };


    console.log(notification);

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


module.exports.changeSeenStatus = async function (req, res, next) {

 	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;
	Notification.updateMany({recieving_user_id: user_id}, {$set: {
		seen_at: Date.now()
	}}, function(err, newNotifications) {
		if (err) {
            return res.status(422).json({
                err: err,
                msg: "Couldn't update items",
                data: null
            });
        }
        return res.status(200).json({
            err: null,
            msg: "Updated Items successfully",
            data: newNotifications
        });
	});
}


/**
  * gets all the notifications for the logged in user
  */
module.exports.getNotifications = function(req, res, next)
{
	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

    Notification.find({recieving_user_id: user_id}, function(err, retrievedNotifications){
    	if (err) {
            return res.status(422).json({
                err: err,
                msg: "Couldn't update items",
                data: null
            });
        }
        return res.status(200).json({
            err: null,
            msg: "retrieved" + retrievedNotifications.length + "Notifications",
            data: retrievedNotifications
        });
    });

}
