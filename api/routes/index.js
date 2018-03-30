var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  authCtrl = require('../controllers/auth.controller'),
  articleCtrl = require('../controllers/article.controller'),
  mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
//----------------------------------------------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);

module.exports = router;
