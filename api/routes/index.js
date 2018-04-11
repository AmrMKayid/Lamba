var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),

    scheduleCtrl = require('../controllers/schedule.controller'),
    taskCtrl = require('../controllers/task.controller'),
    storeCtrl = require('../controllers/store.controller'),
    authCtrl = require('../controllers/auth.controller'),
    userCtrl = require('../controllers/user.controller'),
    articleCtrl = require('../controllers/article.controller'),
    tagCtrl = require('../controllers/tag.controller'),

    mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
router.post('/auth/admin', mw.isAuthenticated, authCtrl.addAdmin);
//-----------------------------------User Routes-------------------------------------//
router.get('/user/getAllUsers', userCtrl.getAllUsers);
router.get('/user/getUser/:userID', userCtrl.getUserByID);
router.get('/user/getChild/:childID', userCtrl.getChildByID);
router.get('/user/getUserChildren/:userID', userCtrl.getUserChildren);

router.get('/admin/teachers_verfication', userCtrl.getPendingTeachers);
router.get('/admin/accept_teacher/:teacherID', userCtrl.acceptTeacher);

router.patch('/user/updateUser/:userId', userCtrl.updateUser);
router.get('/user/getUserInfo/:userId', userCtrl.getUserInfo);
//------------------------------Admin Routes---------------------------------//
router.get('/user/viewUnverifiedArticles', mw.isAuthenticated, mw.isAdmin, userCtrl.viewUnverifiedArticles);
router.get('/user/viewArticleToVerify/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.viewArticleToVerify);
router.get('/user/verifyArticle/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyArticle);
//-----------------------------Schedules Routes----------------------------------------------//
router.get('/schedule/getTeacherSchedule/:UserId', mw.isAuthenticated,scheduleCtrl.getTeacherSchedule);
router.get('/schedule/getChildSchedule/:ChildId',mw.isAuthenticated, scheduleCtrl.getChildSchedule);
router.post('/task/newTask', taskCtrl.createNewTask);
router.get('/task/getTasks/:childId', taskCtrl.getTasks);
router.get('/task/getTask/:taskId',mw.isAuthenticated,taskCtrl.getTask);

router.get('/task/getTeacher/:TeacherId', taskCtrl.getTeacher);
router.post('/task/newComment', mw.isAuthenticated,taskCtrl.createNewComment);
router.get('/task/getComments/:taskId', mw.isAuthenticated,taskCtrl.getComments);
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
//-----------------------------C1: Articles & TAGS Routes----------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.get('/articles/:id', mw.isAuthenticated, articleCtrl.getArticle);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);
router.get('/tags', mw.isAuthenticated, tagCtrl.getTags);
router.post('/tags', mw.isAuthenticated, mw.isAdmin, tagCtrl.addTag);
router.delete('/tags/:id', mw.isAuthenticated, mw.isAdmin, tagCtrl.deleteTag);
router.post('/articles/feedback', mw.isAuthenticated, articleCtrl.feedbackArticle);
router.post('/articles/comment', mw.isAuthenticated,  articleCtrl.commentArticle);
router.post('/articles/reply', mw.isAuthenticated,  articleCtrl.replyComment);


module.exports = router;
