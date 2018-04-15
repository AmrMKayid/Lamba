var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    going_user_id: {
        type: Array,
        required: true
    },
    activity_type: {
        type: String,
        required: true
    },
    picture_url: {
        type: String,
        required: true
    },
    host_id: {
        type: Schema.Types.ObjectId,
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
mongoose.model('Activity', ActivitySchema);

