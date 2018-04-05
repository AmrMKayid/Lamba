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
router.post('/store/upload', storeCtrl.uploadItemPhoto);
// TODO add mw.isAuthenticated
router.get('/store/countItmes', storeCtrl.countItmes);
router.get('/store/view/:tuplesPerPage/:pageNumber', storeCtrl.viewItems);
router.post('/store/edit/:itemId', mw.isAuthenticated, storeCtrl.editItems);
router.delete('/store/delete/:itemId', mw.isAuthenticated, storeCtrl.deleteItems);
router.post('/store/buy/:itemId', mw.isAuthenticated, storeCtrl.buyItems);
router.post('/store/like/:itemId', mw.isAuthenticated, storeCtrl.likeItems);
router.get('/uploads/store/:filename', storeCtrl.getImage);

module.exports = router;