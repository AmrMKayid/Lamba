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
    activityCtrl = require('../controllers/activity.controller'),
    notificationCtrl = require('../controllers/notification.controller'),
    requestCtrl = require('../controllers/request.controller'),

    mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
router.post('/auth/admin', mw.isAuthenticated, authCtrl.addAdmin);
//-----------------------------------User Routes-------------------------------------//
router.get('/user/getAllUsers', userCtrl.getAllUsers);
router.get('/user/getUserChildren/:userID', userCtrl.getUserChildren);
router.patch('/user/updateImage/:userID', userCtrl.updateImage);
router.get('/user/getChild/:childId', mw.isAuthenticated, userCtrl.getChildByID);
router.get('/admin/teachers_verfication',mw.isAuthenticated, mw.isAdmin, userCtrl.getPendingTeachers);
router.get('/admin/accept_teacher/:teacherID',mw.isAuthenticated, mw.isAdmin,  userCtrl.acceptTeacher);
router.get('/admin/decline_teacher/:teacherID',mw.isAuthenticated, mw.isAdmin,  userCtrl.declineTeacher);


router.get('/user/getMyTeachers/', mw.isAuthenticated, userCtrl.getMyTeachers);
router.get('/user/getMyStudents/', mw.isAuthenticated, userCtrl.getMyStudents);


router.patch('/user/updateUser/:userId', userCtrl.updateUser);
router.get('/user/getUserInfo/:userId', userCtrl.getUserInfo);
router.get('/user/getUserByID/:id', mw.isAuthenticated, userCtrl.getUser);
router.patch('/user/assignArticleToChild/:childID',mw.isAuthenticated,userCtrl.assignArticleToChild);
//------------------------------Admin Routes---------------------------------//
router.get('/user/viewUnverifiedArticles', mw.isAuthenticated, mw.isAdmin, userCtrl.viewUnverifiedArticles);
router.get('/user/verifyArticle/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyArticle);
//-----------------------------Schedules Routes----------------------------------------------//
router.get('/schedule/getTeacherSchedule/:UserId', mw.isAuthenticated,scheduleCtrl.getTeacherSchedule);
router.get('/schedule/getChildSchedule/:ChildId',mw.isAuthenticated, scheduleCtrl.getChildSchedule);
router.post('/task/newTask/',mw.isAuthenticated, taskCtrl.createNewTask);
router.get('/task/getTasks',mw.isAuthenticated, taskCtrl.getTasks);
router.get('/task/getTask/:taskId', mw.isAuthenticated, taskCtrl.getTask);
router.get('/task/getTeacher/:TeacherId', taskCtrl.getTeacher);
router.post('/task/newComment', mw.isAuthenticated,taskCtrl.createNewComment);
router.get('/task/getComments/:taskId', mw.isAuthenticated,taskCtrl.getComments);
router.get('/task/getChildTasks/:ChildId', mw.isAuthenticated,taskCtrl.getChildTasks);
router.patch('/schedule/updateTeacherSchedule/:SlotId/',mw.isAuthenticated,scheduleCtrl.updateTeacherSchedule);
router.patch('/schedule/updateChildSchedule/:SlotId/:ChildId',mw.isAuthenticated,scheduleCtrl.updateChildSchedule);

/*-----------------------------Store Routes-------------------------------------*/
router.post('/store/create', mw.isAuthenticated, storeCtrl.createItems);
router.post('/store/upload', storeCtrl.uploadItemPhoto);
router.get('/store/getItemsById', storeCtrl.getItemsById);

// TODO add mw.isAuthenticated
router.get('/store/countItmes', mw.isAuthenticated, storeCtrl.countItmes);
router.get('/store/view/:tuplesPerPage/:pageNumber', mw.isAuthenticated, storeCtrl.viewItems);
router.patch('/store/edit/:itemId', storeCtrl.editItems);
router.delete('/store/delete/:itemId', storeCtrl.deleteItems);
router.patch('/store/likeItems/:itemId', mw.isAuthenticated, storeCtrl.likeItems);
router.patch('/store/unlikeItems/:itemId', mw.isAuthenticated, storeCtrl.unlikeItems);
router.get('/uploads/store/:filename', storeCtrl.getImage);
router.get('/store/myitems/view/:itemId', mw.isAuthenticated, storeCtrl.getItem);

//-----------------------------C1: Articles & TAGS Routes----------------------------------------------//
router.get('/articles', mw.isAuthenticated, articleCtrl.getArticles);
router.get('/articles/:id', mw.isAuthenticated, articleCtrl.getArticle);
router.post('/articles', mw.isAuthenticated, mw.isNotChild, articleCtrl.createArticle);
router.get('/tags', mw.isAuthenticated, tagCtrl.getTags);
router.post('/tags', mw.isAuthenticated, mw.isAdmin, tagCtrl.addTag);
router.delete('/tags/:id', mw.isAuthenticated, mw.isAdmin, tagCtrl.deleteTag);
router.post('/articles/feedback', mw.isAuthenticated, articleCtrl.feedbackArticle);
router.post('/articles/comment', mw.isAuthenticated, articleCtrl.commentArticle);
router.post('/articles/reply', mw.isAuthenticated, articleCtrl.replyComment);
router.delete('/articles/:id', mw.isAuthenticated, articleCtrl.deleteArticle);
router.patch('/articles/:id', mw.isAuthenticated, articleCtrl.editArticle);

router.post('/articles/uploadArticleThumbnail',mw.isAuthenticated,articleCtrl.uploadArticleThumbnail)
router.get('/uploads/articlesThumbnails/:filename', articleCtrl.getImage);
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/*-----------------------------Activity Routes-------------------------------------*/
router.post('/activity/create', mw.isAuthenticated, activityCtrl.createActivities);
router.post('/activity/upload', activityCtrl.uploadActivityPhoto);
router.get('/activity/myActivities/view', activityCtrl.getActivitiesById);
//mw.isAuthenticated ??
router.get('/activity/countActivities', mw.isAuthenticated, activityCtrl.countActivities);
router.get('/activity/view/:tuplesPerPage/:pageNumber', mw.isAuthenticated, activityCtrl.viewActivities);
router.patch('/activity/edit/:activityId', activityCtrl.editActivities);
router.delete('/activity/delete/:activityId', activityCtrl.deleteActivities);
router.patch('/activity/goingActivities/:activityId', mw.isAuthenticated, activityCtrl.goingActivities);
router.get('/uploads/activity/:filename', activityCtrl.getImage);
router.get('/activity/myActivities/view/:activityId', mw.isAuthenticated, activityCtrl.getActivity);

 /*gets the unverified activities*/
router.get('/activity/viewUnverifiedActivities', mw.isAuthenticated, mw.isAdmin, activityCtrl.viewUnverifiedActivities);

router.post('/activity/comment/:activityId', mw.isAuthenticated, activityCtrl.addComment);




/*Notifications Routes*/
router.post('/notifications/create', mw.isAuthenticated, notificationCtrl.addNotification);
router.patch('/notifications/seen', mw.isAuthenticated, notificationCtrl.changeSeenStatus);
router.get('/notifications/get', mw.isAuthenticated, notificationCtrl.getNotifications);

//-----------------------------Teacher Session Routes----------------------------------------------//
router.get('/user/viewSessions',mw.isAuthenticated,userCtrl.viewSessions);
router.post('/user/addSession', mw.isAuthenticated, userCtrl.addSession);
router.delete('/user/deleteSession/:sessionId',mw.isAuthenticated,userCtrl.deleteSession);
router.patch('/user/updateSession/:sessionId',mw.isAuthenticated,userCtrl.updateSession);
//----------------------------User Verification Routes--------------------------------------------//
router.post('/user/requestVerification',mw.isAuthenticated,userCtrl.createVerificationForm);
router.get('/user/viewVerificationForms',mw.isAuthenticated,mw.isAdmin,userCtrl.viewVerificationForms);
router.get('/user/verifyUser/:userId',mw.isAuthenticated,mw.isAdmin,userCtrl.verifyUser);
router.delete('/user/deleteVerificationForm/:id',mw.isAuthenticated,mw.isAdmin,userCtrl.deleteVerificationForm);
//---------------------------- Requests Routes--------------------------------------------//
router.post('/request/create/:teacherId/:childId', mw.isAuthenticated, requestCtrl.addRequest);
router.get('/request/get', mw.isAuthenticated, requestCtrl.getRequests);



module.exports = router;
