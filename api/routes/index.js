var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
  listCtrl = require('../controllers/list.controller');

var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first before you can access your lists.',
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

//-----------------------------Authentication Routes-------------------------
router.post('/auth/register', isNotAuthenticated, authCtrl.register);
router.post('/auth/login', isNotAuthenticated, authCtrl.login);

//-------------------------------List Routes---------------------------------
router.get('/list/getLists', isAuthenticated, listCtrl.getLists);
router.get('/list/getList/:listId', isAuthenticated, listCtrl.getList);
router.post('/list/createList', isAuthenticated, listCtrl.createList);
router.patch(
  '/list/updateListName/:listId',
  isAuthenticated,
  listCtrl.updateListName
);
router.patch('/list/:listId/createTask', isAuthenticated, listCtrl.createTask);
router.patch(
  '/list/:listId/updateTask/:taskId',
  isAuthenticated,
  listCtrl.updateTask
);
router.patch(
  '/list/:listId/deleteTask/:taskId',
  isAuthenticated,
  listCtrl.deleteTask
);
router.delete('/list/deleteList/:listId', isAuthenticated, listCtrl.deleteList);

module.exports = router;
