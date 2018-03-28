var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
  User = mongoose.model('User');

module.exports.register = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'email(String and of valid email format), password(String) and confirmPassword(String) are required fields.',
      data: null
    });
  }
  // Check that the password is 8+ characters
  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }
  // Check that password matches confirmPassword
  if (password !== req.body.confirmPassword.trim()) {
    return res.status(422).json({
      err: null,
      msg: 'password and confirmPassword does not match.',
      data: null
    });
  }
  // Check that no other user is registered with this email
  User.findOne({
    email: req.body.email.trim().toLowerCase()
  }).exec(function(err, user) {
    // If an err occurred, call the next middleware in the app.js which is the error handler
    if (err) {
      return next(err);
    }
    // If there is a user with this email don't continue
    if (user) {
      return res.status(422).json({
        err: null,
        msg:
          'A user with this email address already exists, please try another email address.',
        data: null
      });
    }

    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function(err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      User.create(req.body, function(err, newUser) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Registration successful, you can now login to your account.',
          data: newUser.toObject()
        });
      });
    });
  });
};

module.exports.login = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'email(String and of valid email format) and password(String) are required fields.',
      data: null
    });
  }

  // Find the user with this email from the database
  User.findOne({
    email: req.body.email.trim().toLowerCase()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    // If user not found then he/she is not registered
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, user.password, function(
      err,
      passwordMatches
    ) {
      if (err) {
        return next(err);
      }
      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res
          .status(401)
          .json({ err: null, msg: 'Password is incorrect.', data: null });
      }
      // Create a JWT and put in it the user object from the database
      var token = jwt.sign(
        {
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          user: user.toObject()
        },
        req.app.get('secret'),
        {
          expiresIn: '12h'
        }
      );
      // Send the JWT to the frontend
      res.status(200).json({ err: null, msg: 'Welcome', data: token });
    });
  });
};
