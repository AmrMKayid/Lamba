var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
    scheduleCtrl = require('../controllers/schedule.controller');
	  taskCtrl = require('../controllers/task.controller');


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

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', isNotAuthenticated, authCtrl.register);
router.post('/auth/login', isNotAuthenticated, authCtrl.login);
//----------------------------------------------------------------------------------//

//-------------------------------Schedule Routes------------------------------------//
router.post('/schedule/createTeacherSchedule/:UserId',scheduleCtrl.createTeacherSchedule);
router.get('/schedule/getTeacherSchedule/:UserId',scheduleCtrl.getTeacherSchedule);
router.post('/schedule/createChildShcedule/:ParentId/:ChildId',scheduleCtrl.createChildShcedule);
router.get('/schedule/getChildSchedule/:UserId/:ChildId',scheduleCtrl.getChildSchedule);
router.get('/schedule/getMySchedule/:ChildId',scheduleCtrl.getMySchedule);
router.post('/task/newTask', taskCtrl.createNewTask);
router.post('/task/newComment', taskCtrl.createNewComment);
//----------------------------------------------------------------------------------//

module.exports = router;
