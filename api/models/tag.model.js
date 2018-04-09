var mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

mongoose.model('Tag', tagSchema);
