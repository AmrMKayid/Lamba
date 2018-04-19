const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    from: {
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
    conversationId: {
        type: String,
        required: true
    }
});

MessageSchema.statics.addMessage = (message, callback) => {
    message.save(callback);
};

MessageSchema.statics.getMessages = (callback) => {
    Message.find({}, callback);
};

MessageSchema.statics.getMessagesByConv = (id, callback) => {
    Message.find({conversationId: id}, callback);
};


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
