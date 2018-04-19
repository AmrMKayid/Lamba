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
    }
});

MessageSchema.statics.addMessage = (message, callback) => {
    message.save(callback);
};

MessageSchema.statics.getMessages = (callback) => {
    Message.find({}, callback);
};

MessageSchema.statics.getMessagesFromUser = (user, callback) => {
    Message.find({from: user}, callback);
};


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
