var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),

  scheduleCtrl = require('../controllers/schedule.controller'),
  taskCtrl = require('../controllers/task.controller'),
  storeCtrl = require('../controllers/store.controller'),
  authCtrl = require('../controllers/auth.controller'),
  userCtrl = require('../controllers/user.controller'),
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
//------------------------------Admin Routes---------------------------------//
router.get('/user/viewUnverifiedArticles', mw.isAuthenticated, mw.isAdmin, userCtrl.viewUnverifiedArticles);
router.get('/user/viewArticleToVerify/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.viewArticleToVerify);
router.get('/user/verifyArticle/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyArticle);
//-----------------------------Articles Routes----------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);
router.post('/articles/feedback', mw.isAuthenticated, articleCtrl.feedbackArticle);
//-----------------------------Schedules Routes----------------------------------------------//
router.post('/schedule/createTeacherSchedule/:UserId', scheduleCtrl.createTeacherSchedule);
router.get('/schedule/getTeacherSchedule/:UserId', mw.isAuthenticated,scheduleCtrl.getTeacherSchedule);
router.post('/schedule/createChildShcedule/:ParentId/:ChildId', scheduleCtrl.createChildShcedule);
router.get('/schedule/getChildSchedule/:ChildId',mw.isAuthenticated, scheduleCtrl.getChildSchedule);
router.post('/task/newTask', taskCtrl.createNewTask);
router.post('/task/newComment', taskCtrl.createNewComment);
router.get('/task/getComments/:taskId', taskCtrl.getComments);
router.patch('/schedule/updateTeacherSchedule/:SlotId/',mw.isAuthenticated,scheduleCtrl.updateTeacherSchedule);
router.patch('/schedule/updateChildSchedule/:SlotId/:ChildId',mw.isAuthenticated,scheduleCtrl.updateChildSchedule);
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
//-----------------------------Articles Routes----------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.get('/article/:id', mw.isAuthenticated, articleCtrl.getArticle);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);

module.exports = router;
