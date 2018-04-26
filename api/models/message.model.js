const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
	opened_at:
	{
		type: Date,
        default: null	
	},
	seen_at:
	{
		type: Date,
		default: null
	}

});

const Message = mongoose.model('Message', MessageSchema);


MessageSchema.statics.addMessage = (message, callback) => {
    var message = new Message(message);
    message.save(callback);
};

MessageSchema.statics.getMessages = (callback) => {
    Message.find({}, callback);
};

MessageSchema.statics.getMessagesFromUser = (user, callback) => {
    Message.find({from: user}, callback);
};


module.exports = Message;
