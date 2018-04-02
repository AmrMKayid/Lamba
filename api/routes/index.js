var express = require('express'),
  router = express.Router(),
  authCtrl = require('../controllers/auth.controller'),

  userCtrl=require('../controllers/user.controller'),
  articleCtrl = require('../controllers/article.controller'),

  mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
router.post('/auth/admin', mw.isAuthenticated, authCtrl.addAdmin);
//-----------------------------------User Routes-------------------------------------//
router.get('/admin/teachers_verfication', userCtrl.getPendingTeachers);
router.get('/admin/accept_teacher/:teacherID', userCtrl.acceptTeacher);

router.patch('/user/updateUser/:userId', userCtrl.updateUser);
router.get('/user/getUserInfo/:userId', userCtrl.getUserInfo);
// router.get('/user/getUserInfo/', (req, res, next)=> {
//   res.status(200).json({
//     err: null,
//     msg: 'User retrieved successfully.',
//     data: null
//   });
// });
//------------------------------Admin Routes---------------------------------//
//yasmeen
router.get('/user/viewUnverifiedArticles',mw.isAuthenticated,mw.isAdmin,userCtrl.viewUnverifiedArticles);
router.get('/user/viewArticleToVerify/:articleId',mw.isAuthenticated,mw.isAdmin,userCtrl.viewArticleToVerify);
router.get('/user/verifyArticle/:articleId',mw.isAuthenticated,mw.isAdmin,userCtrl.verifyArticle);
//router.get('/user/viewUnverifiedArticles',mw.isAuthenticated,userCtrl.viewUnverifiedArticles);
//router.get('/user/viewArticleToVerify/:articleId',userCtrl.viewArticleToVerify);
//router.get('/user/verifyArticle/:articleId',userCtrl.verifyArticle);







router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);

module.exports = router;
