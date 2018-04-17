var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    //TODO: CHANGE BACK TO FALSE DEFAULT!! True is just for testing.
    approved: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    //For the feedback, keeping track of the IDs so that you cannot up & down more than once, score identified by the array's length
    upvoters: [String],
    downvoters: [String],
    thumbnail_url: String,
    comments: [{
        kind: String,
        comment_content: String,
        commenter: {
            type: ObjectId,
            refPath: 'comments.kind'
        },
        replies: [{
            reply_content: String,
            replier: {
                type: ObjectId,
                ref: 'User'
            }
        }]
    }]
});

articleSchema.pre('save', function (next) {
    now = new Date();
    this.updatedAt = now;
    next();
});


mongoose.model('Article', articleSchema);
