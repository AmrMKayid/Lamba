var jwt = require('jsonwebtoken');

module.exports.isAuthenticated = function (req, res, next) {
    // Check that the request has the JWT in the authorization header
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            error: null,
            msg: 'You have to login first!',
            data: null
        });
    }
    // Verify that the JWT is created using our server secret and that it hasn't expired yet
    jwt.verify(token, req.app.get('secret'), function (err, decodedToken) {
        if (err) {
            return res.status(401).json({
                error: err,
                msg: 'Login timed out, please login again.',
                data: null
            });
        }
        req.decodedToken = decodedToken;
        next();
    });
};

module.exports.isNotAuthenticated = function (req, res, next) {
    // Check that the request doesn't have the JWT in the authorization header
    var token = req.headers['authorization'];
    if (token) {
        return res.status(403).json({
            error: null,
            msg: 'You are already logged in.',
            data: null
        });
    }
    next();
};

//To be called only after an 'isAuthenticated' call.
module.exports.isNotChild = function (req, res, next) {
    //Since the middlewares are still executing, it implys that that the token was successfull, and the req.decodedToken is valid.
    if (req.decodedToken.user.username) {
        return res.status(401).json({
            err: null,
            msg: "You don't have permissions (child account)",
            data: null
        });
    }
    next();
};

//To check if User is an Admin (yasmeen)

module.exports.isAdmin=function(req,res,next){
    if(req.decodedToken.user.role !=="Admin"){
        return res.status(401).json({
            err: null,
            msg: "You don't have permissions (Not An Admin account)",
            data: null
        });
    }
    next();
};