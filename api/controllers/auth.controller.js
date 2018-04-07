var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Validations = require('../utils/validations'),
    Encryption = require('../utils/encryption'),
    EMAIL_REGEX = require('../config').EMAIL_REGEX,
    UniqueUser = mongoose.model('UniqueUser'),
    Child = mongoose.model('Child'),
    User = mongoose.model('User');

module.exports.register = function (req, res, next) {
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
        // console.log(req.body);
        return res.status(422).json({
            err: null,
            msg:
                'name(Object(firstName & lastName)), email(String and of valid email format), password(String), confirmPassword(String) and Role(String) are required fields.',
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
    }).exec(function (err, user) {
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

        // Encrypt the password before saving the user in the database
        Encryption.hashPassword(password, function (err, hash) {
            // If an err occurred, call the next middleware in the app.js which is the error handler
            if (err) {
                return next(err);
            }


            // Teacher Verification //
            delete req.body.isVerified
            delete req.body.joinedAt

            req.body.password = hash;

            UniqueUser.create({}, function (err, newUniqueUser) {
                if (err) {
                    return next(err);
                }

                req.body._id = newUniqueUser._id
                User.create(req.body, function (err, newUser) {
                    if (err) {
                        return next(err);
                    }
                    if(newUser.role == 'Teacher'){
                        for(var i=0; i< 8 ; i++){
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


module.exports.login = function (req, res, next) {
    // Check that the body keys are in the expected format and the required fields are there
    var user = req.body.email && Validations.isString(req.body.email) && Validations.matchesRegex(req.body.email, EMAIL_REGEX);
    var child = req.body.username && Validations.isString(req.body.username);
    var valid = req.body.password && Validations.isString(req.body.password);

    if (!(user || child)) {
        return res.status(422).json({
            err: null,
            msg:
                'email(String) or username(String) is required to login.',
            data: null
        });
    }

    if (!valid) {
        return res.status(422).json({
            err: null,
            msg:
                'password(String) is required.',
            data: null
        });
    }

    if (user) {

        loginUser(req, res, next);


    } else {
        loginChild(req, res, next);
    }
};


module.exports.addChild = function (req, res, next) {

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
            msg:
                'name(Object(firstName & lastName)), username(String), password(String) and confirmPassword(String) are required fields.',
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
    }).exec(function (err, user) {

        if (err) {
            return next(err);
        }

        if (user) {
            return res.status(422).json({
                err: null,
                msg:
                    'A child with this username already exists, please try another username.',
                data: null
            });
        }

        Encryption.hashPassword(password, function (err, hash) {
            if (err) {
                return next(err);
            }
            req.body.password = hash;
            UniqueUser.create({}, function (err, newUniqueUser) {

                if (err) {
                    return next(err);
                }

                req.body.parent_id = req.decodedToken.user._id; //Parent's id required in the authorization
                req.body._id = newUniqueUser._id;

                Child.create(req.body, function (err, newUser) {
                    if (err) {
                        return next(err);
                    }
                    for(var i=0; i< 8 ; i++){
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


module.exports.addAdmin = function (req, res, next) {

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
            msg:
                'name(Object(firstName & lastName)), email(String and of valid email format), password(String) and confirmPassword(String) are required fields.',
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
    }).exec(function (err, user) {
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

        // Encrypt the password before saving the user in the database
        Encryption.hashPassword(password, function (err, hash) {
            // If an err occurred, call the next middleware in the app.js which is the error handler
            if (err) {
                return next(err);
            }

            req.body.password = hash;

            req.body.role = 'Admin';

            UniqueUser.create({}, function (err, newUniqueUser) {
                if (err) {
                    return next(err);
                }

                req.body._id = newUniqueUser._id
                User.create(req.body, function (err, newUser) {
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
    }).exec(function (err, user) {
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
            Encryption.comparePasswordToHash(req.body.password, user.password, function (err, passwordMatches) {
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

                res.status(200).json({err: null, msg: 'Welcome', data: token});
            });
        }
    );
}


function loginChild(req, res, next) {

    Child.findOne({
        username: req.body.username
    }).exec(function (err, user) {
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

        Encryption.comparePasswordToHash(req.body.password, user.password, function (err, passwordMatches) {
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
            res.status(200).json({err: null, msg: 'Welcome', data: token});
        });
    });
}
