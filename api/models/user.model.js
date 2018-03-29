var mongoose = require('mongoose');
// TODO: Add other models

const ChildSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  score: { type: Number }
  // activities: [Activities], // TODO: List of activities schema
  // schedule: Schedule // TODO: Add schedule schema
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  name: {
    firstName: {type: String , required: true},
    middleName: {type: String},
    lastName: {type: String, required: true}
  },
  birthday: { type: Date },
  gender: {
        type: String,
        enum: ['male', 'female']
  },

  photo: { type: Buffer },
  phone: { type: String },
  address: {
        street: String,
        city: String,
        state: String,
        zip: Number
  },
  educationSystem: { type: String },

  /* Parent */
  children: [ChildSchema],

  /* Teacher */
  fees: { type: Number },
  students: [ChildSchema],
  // schedule: Schedule, TODO: Add schedule schema

  role: {
    type: String,
    enum: ['Admin', 'Parent', 'Teacher']
  }
});

// Override the transform function of the schema to delete the password before it returns the object
if (!UserSchema.options.toObject) {
  UserSchema.options.toObject = {};
}
UserSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('Child', ChildSchema);
mongoose.model('User', UserSchema);
