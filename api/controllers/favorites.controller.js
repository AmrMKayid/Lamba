var mongoose = require('mongoose'),
  Child = mongoose.model('Child'),
  User = mongoose.model('User'),
  Validations = require('../utils/validations'),
  Article = mongoose.model('Article'),
  Activity = mongoose.model('Activity');


module.exports.getFavArticles = function (req, res, next) {
  let id = req.decodedToken.user._id;
  if (req.decodedToken.user.username) {
    Child.findById(id, (err, child) => {
      if (err) {
        return next(err);
      }
      if (!child) {
        return res.status(404).json({
          err: null,
          msg: 'Child not found.',
          data: null
        });
      }
      let articlesIDs = child.favorites.resources;
      Article.find({
        _id: { $in: articlesIDs },
        approved: { $eq: true }
      }, 'title createdAt owner_id _id tags upvoters downvoters thumbnail_url',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).populate('owner_id', 'name', 'User').exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Articles retrieved successfully.',
            data: result
          });
        });
    });
  } else {
    User.findById(id, (err, user) => {
      let articlesIDs = user.favorites.resources;
      Article.find({
        _id: { $in: articlesIDs },
        approved: { $eq: true }
      }, 'title createdAt owner_id _id tags upvoters downvoters thumbnail_url',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).populate('owner_id', 'name', 'User').exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Articles retrieved successfully.',
            data: result
          });
        });
    });
  }
};

module.exports.addFavArticle = function (req, res, next) {

  let valid =
    req.params.articleId &&
    Validations.isObjectId(req.params.articleId);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid article ID passed.',
      data: null
    });
  }
  let articleID = req.params.articleId;
  if (req.decodedToken.user.username) {
    let childId = req.decodedToken.user._id;

    Child.findById(childId, (err, child) => {
      if (err) {
        return next(err);
      }
      if (!child) {
        return res.status(404).json({
          err: null,
          msg: 'Child not found.',
          data: null
        });
      }
      //Find all articles with the IDs in the child's profile, and only return back the ones approved
      let childArticlesIDs = child.favorites.resources;
      Article.findById(articleID, (err, article) => {
        if (err) {
          return next(err);
        }
        if (!article) {
          return res.status(404).json({
            err: null,
            msg: 'Article not found.',
            data: null
          });
        }
        if (!child.allowedArticles.includes(article._id)) {
          return res.status(401).json({
            err: null,
            msg: 'This article is not allowed (Child account)',
            data: null
          });
        }
        child.favorites.resources.push(article._id);
        child.save(function (err, updatedChild) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Resource added to favorites successfully',
            data: updatedChild
          });
        });
      });
    });
  } else {

    let userID = req.decodedToken.user._id;
    User.findById(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).json({
          err: null,
          msg: 'User not found.',
          data: null
        });
      }

      Article.findById(articleID, (err, article) => {
        if (err) {
          return next(err);
        }
        if (!article) {
          return res.status(404).json({
            err: null,
            msg: 'Article not found.',
            data: null
          });
        }

        user.favorites.resources.push(article._id);
        user.save(function (err, updatedUser) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Resource added to favorites successfully',
            data: updatedUser
          });
        });
      });
    });
  }
};

module.exports.removeFavArticle = function (req, res, next) {
  let valid =
    req.params.articleId &&
    Validations.isObjectId(req.params.articleId);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid article ID passed.',
      data: null
    });
  }

  let articleID = req.params.articleId;
  if (req.decodedToken.user.username) {
    let childId = req.decodedToken.user._id;
    Child.findById(childId, (err, child) => {
      if (err) {
        return next(err);
      }
      if (!child) {
        return res.status(404).json({
          err: null,
          msg: 'Child not found.',
          data: null
        });
      }
      //Find all articles with the IDs in the child's profile, and only return back the ones approved
      child.favorites.resources.splice(child.favorites.resources.indexOf(articleID), 1);
      child.save(function (err, updatedChild) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Resource deleted from favorites successfully',
          data: updatedChild
        });
      });
    });
  }
  else {
    let userID = req.decodedToken.user._id;
    User.findById(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).json({
          err: null,
          msg: 'User not found.',
          data: null
        });
      }
      user.favorites.resources.splice(user.favorites.resources.indexOf(articleID), 1);
      user.save(function (err, updatedUser) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Resource deleted from favorites successfully',
          data: updatedUser
        });
      });
    });
  }
};

////////////////////////////////////////////////////ACTIVITES//////////////////////////////////////////////////////////////////

module.exports.getFavActivities = function (req, res, next) {

};

module.exports.addFavActivity = function (req, res, next) {

  let valid =
    req.params.activityID &&
    Validations.isObjectId(req.params.activityID);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid activity ID passed.',
      data: null
    });
  }
  let activityID = req.params.activityID;
  let userID = req.decodedToken.user._id;
  if (req.decodedToken.user.username) {

    Child.findById(userID, (err, child) => {
      if (err) {
        return next(err);
      }
      if (!child) {
        return res.status(404).json({
          err: null,
          msg: 'Child not found.',
          data: null
        });
      }

      let favoriteIDs = child.favorites.activities;
      Activity.findById(activityID, (err, activity) => {
        if (err) {
          return next(err);
        }
        if (!activity) {
          return res.status(404).json({
            err: null,
            msg: 'Activity not found.',
            data: null
          });
        }

        child.favorites.activities.push(activity._id);
        child.save(function (err, updatedChild) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Activitiy added to favorites successfully',
            data: updatedChild
          });
        });
      });
    });
  } else {
    User.findById(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).json({
          err: null,
          msg: 'User not found.',
          data: null
        });
      }

      Activity.findById(activityID, (err, activity) => {
        if (err) {
          return next(err);
        }
        if (!activity) {
          return res.status(404).json({
            err: null,
            msg: 'Activity not found.',
            data: null
          });
        }

        user.favorites.activities.push(activity._id);
        user.save(function (err, updatedUser) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Activity added to favorites successfully',
            data: updatedUser
          });
        });
      });
    });
  }

};

module.exports.removeFavActivity = function (req, res, next) {

  let valid =
    req.params.activityID &&
    Validations.isObjectId(req.params.activityID);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid activity ID passed.',
      data: null
    });
  }

  let userID = req.decodedToken.user._id;
  let activityID = req.params.articleId;
  if (req.decodedToken.user.username) {
    Child.findById(userID, (err, child) => {
      if (err) {
        return next(err);
      }
      if (!child) {
        return res.status(404).json({
          err: null,
          msg: 'Child not found.',
          data: null
        });
      }
      child.favorites.activities.splice(child.favorites.activities.indexOf(activityID), 1);
      child.save(function (err, updatedChild) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Activity deleted from favorites successfully',
          data: updatedChild
        });
      });
    });
  }
  else {
    User.findById(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).json({
          err: null,
          msg: 'User not found.',
          data: null
        });
      }
      user.favorites.activities.splice(user.favorites.activities.indexOf(activityID), 1);
      user.save(function (err, updatedUser) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Activity deleted from favorites successfully',
          data: updatedUser
        });
      });
    });
  }

};

////////////////////////////////////////////////////ITEMS//////////////////////////////////////////////////////////////////////

module.exports.getFavItems = function (req, res, next) {
};

module.exports.addFavItem = function (req, res, next) {
};

module.exports.removeFavItem = function (req, res, next) {
};