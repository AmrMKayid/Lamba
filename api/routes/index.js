var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
  articleCtrl = require('../controllers/article.controller');

var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login to get permission.',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
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

var isNotAuthenticated = function(req, res, next) {
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

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', isNotAuthenticated, authCtrl.register);
router.post('/auth/login', isNotAuthenticated, authCtrl.login);
//----------------------------------------------------------------------------------//
router.get('/articles', isAuthenticated, articleCtrl.getArticles);
router.post('/articles', isAuthenticated, articleCtrl.createArticle);

module.exports = router;
