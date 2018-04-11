var mongoose = require('mongoose');

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
    comments: [{
        comment_content:String,
        commenter: {type:String,
            ref: 'User'
        },
        replies: [
            {
                reply_content: String,
                replier: String
            }
        ]
    }]
});

articleSchema.pre('save', function (next) {
    now = new Date();
    this.updatedAt = now;
    next();
});


mongoose.model('Article', articleSchema);
