var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	owner_id: {
		type: String,
		required: true
	},
	approved: {
		type: Boolean,
		required: true,
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
	updatedAt: Date

});

articleSchema.pre('save', function (next) {
	now = new Date();
	this.updatedAt = now;
	next();
});


mongoose.model('Article', articleSchema);
