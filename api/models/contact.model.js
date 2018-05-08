var mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: String,
  message: String,
  name: String
});



mongoose.model('Contact', contactSchema);
