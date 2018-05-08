// Execute the mongoDB file to create, define the collections and connect to the database
require('./api/config/mongoDB');

var express = require('express'),
    logger = require('morgan'),
    cors = require('cors'),
    path = require('path'),
    helmet = require('helmet'),
    passport = require('passport'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes'),
    config = require('./api/config'),
    multer = require('multer'),
    socketIO = require('./api/socket'),
    app = express();

// Set the secret of the app that will be used in authentication
app.set('secret', config.SECRET);


//---------------- Middlewares ----------------//

app.io = require('socket.io')();
socketIO(app.io);

// Middleware for uploading binary files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'api/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

app.use(multer({
    storage: storage
}).single('image'));


// Middleware to log all of the requests that comes to the server
logger.token('id', function getName(req) {
    if (req.decodedToken)
        return req.decodedToken.user.name.firstName + ' ' + req.decodedToken.user.name.lastName;
    return '';
})

app.use(
    logger(':method :url :status :response-time ms - :res[content-length] :req[x-real-ip] :id', {
        skip: function (req, res) {
            return req.originalUrl.endsWith('.js') || req.originalUrl.endsWith('.jpg')
                || req.originalUrl.startsWith('/styles') || req.originalUrl.startsWith('/inline') || req.originalUrl.startsWith('/scripts')
                || req.originalUrl.startsWith('/polyfills') || req.originalUrl.startsWith('/assets') || req.originalUrl.startsWith('/main')
                || req.originalUrl.startsWith('/Roboto') || req.originalUrl.startsWith('/fontawesome') || req.originalUrl.startsWith('/favicon')
                || req.originalUrl.startsWith('/api/uploads/store') || req.originalUrl.startsWith('/api/uploads/articlesThumbnails')
                || req.originalUrl.startsWith('/api/uploads/activity') || req.originalUrl == '/api/request/get' || req.originalUrl == '/api/chat/unopened/count'
                || req.originalUrl == '/api/notifications/get' || req.originalUrl == '/api/notifications/unopened/count'
        }
    })
);

// Middleware to allow requests from any frontend that is not hosted on the same machine as the server's
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    })
);

// Middleware to protect the server against common known security vulnerabilities
app.use(helmet());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());

// Middleware to compress the server json responses to be smaller in size
app.use(compression());

/*
  Middleware to parse the request body that is in format "application/json" or
  "application/x-www-form-urlencoded" as json and make it available as a key on the req
  object as req.body
*/
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

/*
  Middleware to match the request with one of our defined routes to do a certain function,
  All requests should have /api before writing the route as a convention for api servers
*/
app.use('/api', routes);

// Static Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle any (500 Internal server error) that may occur while doing database related functions
app.use(function (err, req, res, next) {
    if (err.statusCode === 404) return next();
    res.status(500).json({
        // Never leak the stack trace of the err if running in production mode
        err: process.env.NODE_ENV === 'production' ? null : err,
        msg: '500 Internal Server Error',
        data: null
    });
});

/*
  Middleware to handle any (404 Not Found) error that may occur if the request didn't find
  a matching route on our server, or the requested data could not be found in the database
*/
app.use(function (req, res) {

    res.status(404).json({
        err: null,
        msg: '404 Not Found',
        data: null
    });
    res.sendFile(__dirname + '/public/index.html');

});

//---------------- Middlewares ----------------//


module.exports = app;
