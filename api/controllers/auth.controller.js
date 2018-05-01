var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
  UniqueUser = mongoose.model('UniqueUser'),
  Child = mongoose.model('Child'),
  uuidv4 = require('uuid/v4'),
  User = mongoose.model('User'),
  moment = require('moment');

const sgMail = require('@sendgrid/mail');
const MAIL_TEMPLATE = require('../utils/MAIL_TEMPLATE');

//This should be loaded from the .env ofcourse, bas I trust everyone :D
sgMail.setApiKey('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');


module.exports.register = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.name &&
    req.body.name.firstName &&
    Validations.isString(req.body.name.firstName) &&
    req.body.name.lastName &&
    Validations.isString(req.body.name.lastName) &&
    req.body.role &&
    Validations.isString(req.body.role) &&
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
      msg: 'name(Object(firstName & lastName)), email(String and of valid email format), password(String), confirmPassword(String) and Role(String) are required fields.',
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

  if (!(/^[a-zA-Z]+$/.test(req.body.name.firstName) && /^[a-zA-Z]+$/.test(req.body.name.lastName))) {
    return res.status(422).json({
      err: null,
      msg: 'Name is invalid (only English characters).',
      data: null
    });
  }


  var role = req.body.role;
  if (!(role === 'Teacher' || role === 'Parent')) {
    return res.status(422).json({
      err: null,
      msg: 'role is not valid.',
      data: null
    });
  }


  if (req.body.gender && !(req.body.gender === 'male' || req.body.gender === 'female')) {
    return res.status(422).json({
      err: null,
      msg: 'gender is not valid.',
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
        msg: 'A user with this email address already exists, please try another email address.',
        data: null
      });
    }

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function(err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }



      // Teacher Verification //
      delete req.body.isVerified
      delete req.body.joinedAt
      //////////////////////////

      //Expires in 1 hour
      req.body.password = hash;
      req.body.mailToken = {
        id: uuidv4(),
        expires: moment().add(1, 'h').utc().valueOf()
      };

      UniqueUser.create({}, function(err, newUniqueUser) {
        if (err) {
          return next(err);
        }

        req.body._id = newUniqueUser._id
        User.create(req.body, function(err, newUser) {
          if (err) {
            return next(err);
          }

          let verificationURL = req.protocol + '://' + req.get('host') + `/api/verify/${newUser._id}/${newUser.mailToken.id}`;

          let msg = {
            to: req.body.email,
            from: 'nawwar@nawwar.com',
            subject: 'Welcome to Nawwar, please confirm your email address!',
            text: verificationURL,
            html: MAIL_TEMPLATE.VERIFICATION.replace('[VERIFICATION_LINK]', verificationURL)
          };
          sgMail.send(msg);

          if (newUser.role == 'Teacher') {
            for (var i = 0; i < 8; i++) {
              newUser.schedule.table.saturday.push({});
              newUser.schedule.table.sunday.push({});
              newUser.schedule.table.monday.push({});
              newUser.schedule.table.tuesday.push({});
              newUser.schedule.table.wednesday.push({});
              newUser.schedule.table.thursday.push({});
              newUser.schedule.table.friday.push({});
            }
            newUser.save();
          }
          res.status(201).json({
            err: null,
            msg: 'Registration successful, you can now login to your account.',
            data: newUser.toObject()
          });
        });

      })
    });
  });
};


module.exports.login = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there

  var user = req.body.email && Validations.isString(req.body.email) && Validations.matchesRegex(req.body.email, EMAIL_REGEX);
  var child = req.body.username && Validations.isString(req.body.username);
  var valid = req.body.password && Validations.isString(req.body.password);



  if (!(user || child)) {
    return res.status(422).json({
      err: null,
      msg: 'email(String) or username(String) is required to login.',
      data: null
    });
  }

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'password(String) is required.',
      data: null
    });
  }

  if (user) {

    loginUser(req, res, next);


  } else {
    loginChild(req, res, next);
  }
};


module.exports.addChild = function(req, res, next) {

  var valid =
    req.body.name &&
    req.body.name.firstName &&
    Validations.isString(req.body.name.firstName) &&
    req.body.name.lastName &&
    Validations.isString(req.body.name.lastName) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword) &&
    req.body.username &&
    Validations.isString(req.body.username);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(Object(firstName & lastName)), username(String), password(String) and confirmPassword(String) are required fields.',
      data: null
    });
  }

  if (!(/^[a-z0-9]+$/i.test(req.body.username))) {
    return res.status(422).json({
      err: null,
      msg: 'Username cannot have special characters.',
      data: null
    });
  }

  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }

  if (password !== req.body.confirmPassword.trim()) {
    return res.status(422).json({
      err: null,
      msg: 'password and confirmPassword does not match.',
      data: null
    });
  }

  if (req.decodedToken.user.role !== "Parent") {
    return res.status(401).json({
      err: null,
      msg: "You don't have permissions (Only parent accounts can add children)",
      data: null
    });
  }


  if (req.body.gender && !(req.body.gender === 'male' || req.body.gender === 'female')) {
    return res.status(422).json({
      err: null,
      msg: 'gender is not valid.',
      data: null
    });
  }

  Child.findOne({
    username: req.body.username.trim().toLowerCase()
  }).exec(function(err, user) {

    if (err) {
      return next(err);
    }

    if (user) {
      return res.status(422).json({
        err: null,
        msg: 'A child with this username already exists, please try another username.',
        data: null
      });
    }

    Encryption.hashPassword(password, function(err, hash) {
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      UniqueUser.create({}, function(err, newUniqueUser) {

        if (err) {
          return next(err);
        }

        req.body.parent_id = req.decodedToken.user._id; //Parent's id required in the authorization
        req.body._id = newUniqueUser._id;

        Child.create(req.body, function(err, newUser) {
          if (err) {
            return next(err);
          }
          for (var i = 0; i < 8; i++) {
            newUser.schedule.table.saturday.push({});
            newUser.schedule.table.sunday.push({});
            newUser.schedule.table.monday.push({});
            newUser.schedule.table.tuesday.push({});
            newUser.schedule.table.wednesday.push({});
            newUser.schedule.table.thursday.push({});
            newUser.schedule.table.friday.push({});
          }
          newUser.save();
          res.status(201).json({
            err: null,
            msg: 'Registration successful, Child is now added.',
            data: newUser.toObject()
          });
        });

      })
    });
  });

};


module.exports.addAdmin = function(req, res, next) {

  var valid =
    req.body.name &&
    req.body.name.firstName &&
    Validations.isString(req.body.name.firstName) &&
    req.body.name.lastName &&
    Validations.isString(req.body.name.lastName) &&
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
      msg: 'name(Object(firstName & lastName)), email(String and of valid email format), password(String) and confirmPassword(String) are required fields.',
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


  if (req.decodedToken.user.role !== "Admin") {
    return res.status(401).json({
      err: null,
      msg: "You don't have permissions (Only Admin accounts can add new Admin!)",
      data: null
    });
  }


  if (req.body.gender && !(req.body.gender === 'male' || req.body.gender === 'female')) {
    return res.status(422).json({
      err: null,
      msg: 'gender is not valid.',
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
        msg: 'A user with this email address already exists, please try another email address.',
        data: null
      });
    }

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function(err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }

      req.body.password = hash;
      req.body.isVerified = true;
      req.body.role = 'Admin';

      UniqueUser.create({}, function(err, newUniqueUser) {
        if (err) {
          return next(err);
        }

        req.body._id = newUniqueUser._id
        User.create(req.body, function(err, newUser) {
          if (err) {
            return next(err);
          }
          res.status(201).json({
            err: null,
            msg: 'new Admin is Created!',
            data: newUser.toObject()
          });
        });

      })
    });
  });
};


////////////////////////////////////// HELPERS ///////////////////////////////////////////////

function loginUser(req, res, next) {

  User.findOne({
    email: req.body.email.trim().toLowerCase()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }

    // If user not found then he/she is not registered
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found!',
        data: null
      });
    }

    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, user.password, function(err, passwordMatches) {
      if (err) {
        return next(err);
      }

      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res.status(401).json({
          err: null,
          msg: 'Password is incorrect.',
          data: null
        });
      }

      if (!user.mailActivated) {
        //Token expired already, send him a new one
        if (moment(user.mailToken.expires).isBefore(moment().utc())) {
          user.mailToken = {
            id: uuidv4(),
            expires: moment().add(1, 'h').utc().valueOf()
          };
          //Save the new mail token with the new expiration date
          user.save((err, newUser) => {
            if (err) {
              return next(err);
            }
            let verificationURL = req.protocol + '://' + req.get('host') + `/api/verify/${user._id}/${user.mailToken.id}`;

            let msg = {
              to: user.email,
              from: 'nawwar@nawwar.com',
              subject: 'Welcome to Nawwar, please confirm your email address!',
              text: verificationURL,
              html: MAIL_TEMPLATE.VERIFICATION.replace('[VERIFICATION_LINK]', verificationURL)
            };
            sgMail.send(msg);
          });
          return res.status(201).json({
            err: null,
            msg: 'A verification email has been sent.',
            data: null
          });

        } else {
          return res.status(429).json({
            err: null,
            msg: 'Verification already sent',
            data: moment(user.mailToken.expires).diff(moment().utc(), 'm')
          });
        }

      }

      // Create a JWT and put in it the user object from the database
      let tokenData = user.toObject();
      delete tokenData.schedule;
      delete tokenData.favorites;
      delete tokenData.messages;
      delete tokenData.myItems;
      delete tokenData.interests;
      delete tokenData.joinedAt;
      delete tokenData.qualifications;
      delete tokenData.sessions;
      delete tokenData.cart;
      delete tokenData.gender;



      var token = jwt.sign({
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          user: tokenData
        },
        req.app.get('secret'), {
          expiresIn: '21d'
        }
      );
      // Send the JWT to the frontend

      res.status(200).json({
        err: null,
        msg: 'Welcome',
        data: token
      });
    });
  });
}


function loginChild(req, res, next) {

  Child.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found!',
        data: null
      });
    }

    Encryption.comparePasswordToHash(req.body.password, user.password, function(err, passwordMatches) {
      if (err) {
        return next(err);
      }

      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res.status(401).json({
          err: null,
          msg: 'Password is incorrect.',
          data: null
        });
      }

      let tokenData = user.toObject();
      delete tokenData.schedule;
      delete tokenData.favorites;
      delete tokenData.messages;
      delete tokenData.myItems;
      delete tokenData.interests;
      delete tokenData.joinedAt;
      delete tokenData.qualifications;
      delete tokenData.sessions;
      delete tokenData.cart;
      delete tokenData.gender;

      // Create a JWT and put in it the user object from the database
      var token = jwt.sign({
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          user: tokenData
        },
        req.app.get('secret'), {
          expiresIn: '21d'
        }
      );
      // Send the JWT to the frontend
      res.status(200).json({
        err: null,
        msg: 'Welcome',
        data: token
      });
    });
  });
}

module.exports.refreshUserToken = function(req, res, next) {
  let tokenData = req.decodedToken.user;


  User.findById(tokenData._id).exec(function(err, myuser) {
    if (err) {
      return next(err);
    }



    if (myuser.isVerified != tokenData.isVerified) {
      delete myuser.schedule;
      delete myuser.favorites;
      delete myuser.messages;
      delete myuser.myItems;
      delete myuser.interests;
      delete myuser.joinedAt;
      delete myuser.qualifications;
      delete myuser.sessions;
      delete myuser.cart;
      delete myuser.gender;

      var token = jwt.sign({
        user: myuser
      }, req.app.get('secret'), {
        expiresIn: '21d'
      });

      return res.status(200).json({
        err: null,
        msg: 'Token refereshed',
        data: token
      });
    } else {
      delete tokenData.schedule;
      delete tokenData.favorites;
      delete tokenData.messages;
      delete tokenData.myItems;
      delete tokenData.interests;
      delete tokenData.joinedAt;
      delete tokenData.qualifications;
      delete tokenData.sessions;
      delete tokenData.cart;
      delete tokenData.gender;
      var token = jwt.sign({
        user: tokenData
      }, req.app.get('secret'), {
        expiresIn: '21d'
      });

      return res.status(200).json({
        err: null,
        msg: 'Token refereshed',
        data: token
      });

    }
  });
}

module.exports.refreshToken = function(req, res, next) {
  let tokenData = req.decodedToken.user;
  delete tokenData.schedule;
  delete tokenData.favorites;
  delete tokenData.messages;
  delete tokenData.myItems;
  delete tokenData.interests;
  delete tokenData.joinedAt;
  delete tokenData.qualifications;
  delete tokenData.sessions;
  delete tokenData.cart;
  delete tokenData.gender;
  var token = jwt.sign({
    user: tokenData
  }, req.app.get('secret'), {
    expiresIn: '21d'
  });
  return res.status(200).json({
    err: null,
    msg: 'Token refereshed',
    data: token
  });
}

module.exports.verifyMail = function(req, res, next) {
  let FRONTEND_URL = 'http://localhost:4200';
  //FOR BUILT PROJECTS
  // let FRONTEND_URL =  req.protocol + '://' + req.get('host') ;

  let id = req.params.id;
  let token = req.params.token;

  User.findById(id, (err, user) => {
    if (err) {
      return res.redirect(FRONTEND_URL + '/activation?mode=error');
    }
    if (user.mailActivated) {
      return res.redirect(FRONTEND_URL + '/activation?mode=already');
    }
    if (!user) {
      return res.redirect(FRONTEND_URL + '/activation?mode=user');
    }
    if (user.mailToken.id !== token) {
      return res.redirect(FRONTEND_URL + '/activation?mode=invalid');
    }
    if (moment(user.mailToken.expires).isBefore(moment().utc())) {
      return res.redirect(FRONTEND_URL + '/activation?mode=expired');
    }
    user.mailActivated = true;
    user.mailToken = undefined;
    user.save(function(err, updatedUser) {
      if (err) {
        return res.redirect(FRONTEND_URL + '/activation?mode=user');
      }
      return res.redirect(FRONTEND_URL + '/activation?mode=success');
    });
  });
}

module.exports.forgotPassword = function(req, res, next) {
  let FRONTEND_URL = 'http://localhost:4200';
  //FOR BUILT PROJECTS
  // let FRONTEND =  req.protocol + '://' + req.get('host') ;

  userMail = req.params.email;
  if (!userMail) {
    return res.status(422).json({
      err: null,
      msg: 'Empty email provided',
      data: null
    });
  }

  User.findOne({
    email: userMail.toLowerCase()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'No user exists with the provided email.',
        data: null
      });
    }
    //He requested an unproccessed reset recently?
    if (user.passwordResetToken) {
      //Recent token has expired, serve him a new one.
      if (moment(user.passwordResetToken.expires).isBefore(moment().utc())) {
        user.passwordResetToken = {
          id: uuidv4(),
          expires: moment().add(1, 'h').utc().valueOf()
        }
        user.save((err, updatedUser) => {
          if (err) {
            return next(err);
          }
          let passwordResetURL = FRONTEND_URL + `/reset/${user.passwordResetToken.id}`;

          let msg = {
            to: updatedUser.email,
            from: 'nawwar@nawwar.com',
            subject: 'Password reset request.',
            text: passwordResetURL,
            html: MAIL_TEMPLATE.RESET.replace('[RESET_LINK]', passwordResetURL)
          };
          sgMail.send(msg);
          return res.status(200).json({
            err: null,
            msg: 'Reset email sent successfully.',
            data: null
          });
        });
        // Recent token has not expired, send back a timer of how long to wait to re-request
      } else {
        return res.status(429).json({
          err: null,
          msg: 'Reset email already sent.',
          data: moment(user.passwordResetToken.expires).diff(moment().utc(), 'm')
        });
      }

      //He didn't request an unproccessed reset, so a new mail is generated directly
    } else {
      user.passwordResetToken = {
        id: uuidv4(),
        expires: moment().add(1, 'h').utc().valueOf()
      }
      user.save((err, updatedUser) => {
        if (err) {
          return next(err);
        }
        let passwordResetURL = FRONTEND_URL + `/reset/${user.passwordResetToken.id}`;

        let msg = {
          to: updatedUser.email,
          from: 'nawwar@nawwar.com',
          subject: 'Password reset request.',
          text: passwordResetURL,
          html: MAIL_TEMPLATE.RESET.replace('[RESET_LINK]', passwordResetURL)
        };
        sgMail.send(msg);
        return res.status(200).json({
          err: null,
          msg: 'Reset email has been sent.',
          data: null
        });
      });
    }
  });
}

module.exports.resetPassword = function(req, res, next) {
  let newPassword = req.body.password;
  let token = req.params.token;
  let uuidREGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!token || !uuidREGEX.test(token)) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid token.',
      data: null
    });

  }
  if (!newPassword || newPassword.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid password provided.',
      data: null
    });
  }
  User.findOne({
    'passwordResetToken.id': token
  }).exec(
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(404).json({
          err: null,
          msg: 'Invalid token.',
          data: null
        });
      }
      //If token expired, don't delete it from the document for further fetches :D
      if (moment(user.passwordResetToken.expires).isBefore(moment().utc())) {
        return res.status(401).json({
          err: null,
          msg: 'Token expired.',
          data: null
        });
      } else {
        Encryption.hashPassword(newPassword, (err, hash) => {
          if (err) return next(err);
          user.passwordResetToken = undefined;
          user.password = hash;
          user.save((err, updatedUser) => {
            if (err) return next(err);
            return res.status(200).json({
              err: null,
              msg: 'Password updated successfully.',
              data: null
            });
          });
        });
      }
    }
  );
}
