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
    chatCtrl = require('../controllers/chat.controller'),
    activityCtrl = require('../controllers/activity.controller'),
    notificationCtrl = require('../controllers/notification.controller'),
    favoritesCtrl = require('../controllers/favorites.controller'),
    requestCtrl = require('../controllers/request.controller'),
    bookingCtrl = require('../controllers/booking.controller'),
    reportCtrl = require('../controllers/report.controller'),
    mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
router.post('/auth/child', mw.isAuthenticated, mw.isNotChild, authCtrl.addChild);
router.get('/user/viewAdmins', mw.isAuthenticated, userCtrl.viewAdmins);
router.post('/auth/admin', mw.isAuthenticated, authCtrl.addAdmin);
//-----------------------------------User Routes-------------------------------------//
router.get('/user/getAllUsers', userCtrl.getAllUsers);
router.get('/user/getUserChildren/:userID', userCtrl.getUserChildren);
router.patch('/user/updateImage/:userID', userCtrl.updateImage);
router.patch('/user/updateCoverImage/:userID', userCtrl.updateCoverImage);
router.get('/user/getChild/:childId', mw.isAuthenticated, userCtrl.getChildByID);
router.get('/admin/teachers_verfication', mw.isAuthenticated, mw.isAdmin, userCtrl.getPendingTeachers);
router.get('/admin/accept_teacher/:teacherID', mw.isAuthenticated, mw.isAdmin, userCtrl.acceptTeacher);
router.get('/admin/decline_teacher/:teacherID', mw.isAuthenticated, mw.isAdmin, userCtrl.declineTeacher);


router.get('/user/getMyTeachers/:ChildId', mw.isAuthenticated, userCtrl.getMyTeachers);
router.get('/user/getMyStudents/', mw.isAuthenticated, userCtrl.getMyStudents);
router.post('/user/addStudent/:childId', mw.isAuthenticated, userCtrl.addStudent);

router.patch('/user/updateUser/:userId', mw.isAuthenticated, userCtrl.updateUser);
router.get('/user/getUserInfo/:userId', userCtrl.getUserInfo);
router.get('/user/getUserByID/:id', mw.isAuthenticated, userCtrl.getUser);
router.patch('/user/assignArticleToChild/:childID', mw.isAuthenticated, userCtrl.assignArticleToChild);
router.get('/user/myChildren', mw.isAuthenticated, userCtrl.getMyChildren);

//------------------------------Admin Routes---------------------------------//
router.get('/user/viewUnverifiedArticles', mw.isAuthenticated, mw.isAdmin, userCtrl.viewUnverifiedArticles);
router.get('/user/verifyArticle/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyArticle);
router.delete('/user/rejectArticle/:articleId', mw.isAuthenticated, mw.isAdmin, userCtrl.rejectArticle);
//-----------------------------Schedules Routes----------------------------------------------//
router.get('/schedule/getTeacherSchedule/:UserId', mw.isAuthenticated, scheduleCtrl.getTeacherSchedule);
router.get('/schedule/getChildSchedule/:ChildId', mw.isAuthenticated, scheduleCtrl.getChildSchedule);
router.post('/task/newTask/', mw.isAuthenticated, taskCtrl.createNewTask);
router.get('/task/getTasks', mw.isAuthenticated, taskCtrl.getTasks);
router.get('/task/getTask/:taskId', mw.isAuthenticated, taskCtrl.getTask);
router.get('/task/getTeacher/:TeacherId', taskCtrl.getTeacher);
router.post('/task/newComment', mw.isAuthenticated, taskCtrl.createNewComment);
router.get('/task/getComments/:taskId', mw.isAuthenticated, taskCtrl.getComments);
router.get('/task/getChildTasks/:ChildId', mw.isAuthenticated, taskCtrl.getChildTasks);
router.patch('/schedule/updateTeacherSchedule/:SlotId/', mw.isAuthenticated, scheduleCtrl.updateTeacherSchedule);
router.patch('/schedule/updateChildSchedule/:SlotId/:ChildId', mw.isAuthenticated, scheduleCtrl.updateChildSchedule);
router.get('/task/deleteTask/:taskID', mw.isAuthenticated, taskCtrl.markAsDone);
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
router.delete('/articles/:id', mw.isAuthenticated, articleCtrl.deleteArticle);
router.patch('/articles/:id', mw.isAuthenticated, articleCtrl.editArticle);

router.post('/articles/uploadArticleThumbnail', mw.isAuthenticated, articleCtrl.uploadArticleThumbnail)
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

router.post('/activity/registerChild', mw.isAuthenticated, activityCtrl.registerChild);
/*gets the unverified activities*/
router.get('/activity/verify', mw.isAuthenticated, mw.isAdmin, activityCtrl.viewUnverifiedActivities);

router.post('/activity/comment/:activityId', mw.isAuthenticated, activityCtrl.addComment);


/*Notifications Routes*/
router.post('/notifications/create', mw.isAuthenticated, notificationCtrl.addNotification);
router.patch('/notifications/seen', mw.isAuthenticated, notificationCtrl.changeSeenStatus);
router.get('/notifications/get', mw.isAuthenticated, notificationCtrl.getNotifications);

//-----------------------------Teacher Session Routes----------------------------------------------//
router.get('/user/viewSessions', mw.isAuthenticated, userCtrl.viewSessions);
router.post('/user/addSession', mw.isAuthenticated, userCtrl.addSession);
router.delete('/user/deleteSession/:sessionId', mw.isAuthenticated, userCtrl.deleteSession);
router.patch('/user/updateSession/:sessionId', mw.isAuthenticated, userCtrl.updateSession);
//----------------------------User Verification Routes--------------------------------------------//
router.post('/user/requestVerification', mw.isAuthenticated, userCtrl.createVerificationForm);
router.get('/user/viewVerificationForms', mw.isAuthenticated, mw.isAdmin, userCtrl.viewVerificationForms);
router.get('/user/verifyUser/:userId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyUser);
router.delete('/user/deleteVerificationForm/:id', mw.isAuthenticated, mw.isAdmin, userCtrl.deleteVerificationForm);

//----------------------------Favorites----------------------------------------------------------//
router.get('/user/favorites/resources', mw.isAuthenticated, favoritesCtrl.getFavArticles);
router.post('/user/favorites/resources/:articleId', mw.isAuthenticated, favoritesCtrl.addFavArticle);
router.delete('/user/favorites/resources/:articleId', mw.isAuthenticated, favoritesCtrl.removeFavArticle);

router.get('/user/favorites/activities', mw.isAuthenticated, favoritesCtrl.getFavActivities);
router.post('/user/favorites/activities/:activityID', mw.isAuthenticated, favoritesCtrl.addFavActivity);
router.delete('/user/favorites/activities/:activityID', mw.isAuthenticated, favoritesCtrl.removeFavActivity);

router.get('/user/favorites/items', mw.isAuthenticated, favoritesCtrl.getFavItems);
router.post('/user/favorites/items/:itemID', mw.isAuthenticated, favoritesCtrl.addFavItem);
router.delete('/user/favorites/items/:itemID', mw.isAuthenticated, favoritesCtrl.removeFavItem);
//----------------------------verify activity routes---------------------------------------------//
router.get('/user/verifyActivity/:activityId', mw.isAuthenticated, mw.isAdmin, userCtrl.verifyActivity);
router.delete('/user/rejectActivity/:activityId', mw.isAuthenticated, mw.isAdmin, userCtrl.rejectActivity);

//---------------------------- Requests Routes--------------------------------------------//
router.post('/request/create/:teacherId/:childId', mw.isAuthenticated, requestCtrl.addRequest);
router.get('/request/get', mw.isAuthenticated, requestCtrl.getRequests);
router.delete('/request/deleteRequest/:requestId', mw.isAuthenticated, requestCtrl.deleteRequest);

//---------------------------- Booking Routes--------------------------------------------//
router.get('/booking/getId/:email', mw.isAuthenticated, bookingCtrl.getId);
router.post('/booking/newNotif', mw.isAuthenticated, bookingCtrl.newNotif);
router.get('/booking/getBookings', mw.isAuthenticated, bookingCtrl.getBookings);
router.get('/booking/deleteNotif/:description', bookingCtrl.deleteNotif);

//---------------------------- Reports Routes--------------------------------------------//
router.post('/reports/newReport', mw.isAuthenticated, reportCtrl.newReport);
router.get('/reports/getReport', mw.isAuthenticated, reportCtrl.getReports);
router.patch('/reports/closeReport/:reportId', mw.isAuthenticated, reportCtrl.closeReport);

/*chat routes*/
router.get('/chat/:id', mw.isAuthenticated, chatCtrl.getChat);
router.get('/chat/', mw.isAuthenticated, chatCtrl.getAllChats);

module.exports = router;
