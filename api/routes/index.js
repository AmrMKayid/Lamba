var express = require('express'),

router = express.Router(),
jwt = require('jsonwebtoken'),
scheduleCtrl = require('../controllers/schedule.controller'),
taskCtrl = require('../controllers/task.controller');
storeCtrl = require('../controllers/store.controller');
authCtrl = require('../controllers/auth.controller'),

userCtrl=require('../controllers/user.controller'),
articleCtrl = require('../controllers/article.controller'),

mw = require('./middlewares');

//C2 Schedules -------------------------------------------------------------

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


//End Of C2 Schedules ----------------------------------------------------

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

//-----------------------------Articles Routes----------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);
router.post('/articles/feedback', mw.isAuthenticated, articleCtrl.feedbackArticle);

//-----------------------------Schedules Routes----------------------------------------------//
router.post('/schedule/createTeacherSchedule/:UserId',scheduleCtrl.createTeacherSchedule);
router.get('/schedule/getTeacherSchedule/:UserId',scheduleCtrl.getTeacherSchedule);
router.post('/schedule/createChildShcedule/:ParentId/:ChildId',scheduleCtrl.createChildShcedule);
router.get('/schedule/getChildSchedule/:UserId/:ChildId',scheduleCtrl.getChildSchedule);
router.get('/schedule/getMySchedule/:ChildId',scheduleCtrl.getMySchedule);
router.post('/task/newTask', taskCtrl.createNewTask);
router.post('/task/newComment', taskCtrl.createNewComment);
router.get('/task/getComments/:taskId', taskCtrl.getComments);
router.get('/task/getStudents', taskCtrl.getStudents);


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



router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);

module.exports = router;
