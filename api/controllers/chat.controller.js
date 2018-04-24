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

	Message.find({from: user_id}).distinct('to', function(err, logs) {
		if(err)
		{
			 return res.status(404).json({
                err: err,
                msg: "Chat Not Found",
                data: []
            });
		} 
		Message.find({to: user_id}).distinct('from', function(err, logs2) {
			if(err)
			{
				 return res.status(404).json({
	                err: err,
	                msg: "Chat Not Found",
	                data: []
	            });
			} 

			logs = logs.concat(logs2);
			logs = logs.filter(function(item, pos, self) {
			    return self.indexOf(item) == pos;
			});

			User.find({_id: {$in: logs}}, function(err, logs){
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


module.exports.getUnopenedChatsCount = function(req, res, next){

	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

	Message.find({to: user_id, opened_at: null}, function(err, logs) {

		if(err)
		{
			return res.status(404).json({
                err: err,
                msg: "Chat Not Found",
                data: []
            });
		}

		return  res.status(200).json({
            err: null,
            msg: "Retrieved Messages",
            data: logs.length
        });

	});

}


module.exports.openChat = function(req, res, next){


	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;

	
	
	Message.update({ to: user_id },{$set:{opened_at: Date.now()}},  function(err, logs) {

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
			msg: "Chats updated successfully",
			data: logs.length
		});

	});

}









module.exports.seen = function(req, res, next){

	if(!req.body.from)
	{
        return res.status(422).json({
            err: null,
            msg: 'One or More field(s) is missing or of incorrect type',
            data: null
    	});
	}
	// gets the logged in user id
    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;


	Message.update({from: req.body.from, to: user_id}, {$set:{opened_at: Date.now()}}, function(err, logs) {

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
			msg: "Chats updated successfully",
			data: logs.length
		});

	});
}