var express = require('express'),
  router = express.Router(),
  authCtrl = require('../controllers/auth.controller'),
  UserCtrl = require('../controllers/user.controller'),
  mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
router.post('/auth/admin', mw.isAuthenticated, authCtrl.addAdmin);
//----------------------------------------------------------------------------------//

//---------------------------User Routes----------------------------------------------//
router.patch('/user/updateUser/:userId', UserCtrl.updateUser);
router.get('/user/getUserInfo/:userId', UserCtrl.getUserInfo);

// router.get('/user/getUserInfo/', (req, res, next)=> {
//   res.status(200).json({
//     err: null,
//     msg: 'User retrieved successfully.',
//     data: null
//   });
// });

module.exports = router;
