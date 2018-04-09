var mongoose = require('mongoose'),
    config = require('../config'),
    dbUrl = config.MONGO_URI;

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
var gracefulShutdown = function (callback) {
    mongoose.connection.close(function (err) {
        callback(err);
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('nodemon restart');
        }
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function () {
    gracefulShutdown(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('App termination (SIGINT)');
        }
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('App termination (SIGTERM)');
        }
        process.exit(0);
    });
});

mongoose.connect(dbUrl, function (err) {
    if (!err) {
        return console.log('Successfully connected to mongoDB');
    }
    console.error(err);
    gracefulShutdown(function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Could not connect to mongoDB');
        }
        process.exit(1);
    });
});

require('../models/article.model');
require('../models/item.model');
require('../models/task.model');
require('../models/user.model');
require('../models/tag.model');

