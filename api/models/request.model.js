var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    requestingParentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    childId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    recievingTeacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    description : {
        type: String,
        required:true
    }
});

mongoose.model('Request', RequestSchema);