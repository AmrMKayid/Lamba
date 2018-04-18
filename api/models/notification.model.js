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
        type: Schema.Types.ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    seen_at: {
        type: Date,
        required: false
    }
});

//missing timing
mongoose.model('Notification', NotificationSchema);

