var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    recieving_user_id: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

//missing timing
mongoose.model('Notification', NotificationSchema);

