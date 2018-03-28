var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  dueDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

var listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  tasks: [taskSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  lists: [listSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Override the transform function of the schema to delete the password before it returns the object
if (!userSchema.options.toObject) {
  userSchema.options.toObject = {};
}
userSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('User', userSchema);
