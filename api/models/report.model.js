var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReportSchema = new Schema({
    issue: {
        type: String,
        required: true
    },
    isClosed: {
        type: Boolean,
        default: false,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

mongoose.model('Report', ReportSchema);