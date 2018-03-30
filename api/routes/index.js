var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
  storeCtrl = require('../controllers/store.controller');
  mw = require('./middlewares');

//---------------------------- Authentication Routes--------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);


/*-----------------------------Store Routes-------------------------------------*/
router.post('/store/create', mw.isAuthenticated, storeCtrl.createItems);
router.get('/store/view', mw.isAuthenticated, storeCtrl.viewItems);
router.post('/store/edit/:itemId', mw.isAuthenticated, storeCtrl.editItems);
router.delete('/store/delete/:itemId', mw.isAuthenticated, storeCtrl.deleteItems);
router.post('/store/buy/:itemId', mw.isAuthenticated, storeCtrl.buyItems);
router.post('/store/like/:itemId', mw.isAuthenticated, storeCtrl.likeItems);

module.exports = router;
