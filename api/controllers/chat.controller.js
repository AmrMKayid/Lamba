var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/validations'),
    User = mongoose.model('User'),
    Message = mongoose.model('Message');
jwt = require('jsonwebtoken');
mw = require('../routes/middlewares'),
    path = require('path'),
fs = require('fs');



module.exports.getAllChats = function (req, res, next) {
	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

	Message.find({$or:[{from: user_id, to: req.params.id},{from: req.params.id, to: user_id}]}, function(err, logs) {
		if(err)
		{
			 return res.status(404).json({
                err: err,
                msg: "Chat Not Found",
                data: []
            });
		} 

		 return res.status(200).json({
            err: null,
            msg: "Retrieved Messages",
            data: logs
        });

	});
}

module.exports.getChat = function (req, res, next) {
// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

	Message.find({$or:[{from: user_id, to: req.params.id},{from: req.params.id, to: user_id}]}, function(err, logs) {
		if(err)
		{
			 return res.status(404).json({
                err: err,
                msg: "Chat Not Found",
                data: []
            });
		} 

		 return res.status(200).json({
            err: null,
            msg: "Retrieved Messages",
            data: logs
        });

	});
}
