var mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  TeacherId: {
    type: String,
    required: true,
  },
  StudentId: {
    type: String,
    required: true,
  },
  Comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['Child', 'Parent', 'Teacher']
  },
  Comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



mongoose.model('Task', TaskSchema);
mongoose.model('Comment', CommentSchema);
