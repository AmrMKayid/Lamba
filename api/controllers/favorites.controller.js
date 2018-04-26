var mongoose = require('mongoose'),
  Child = mongoose.model('Child'),
  User = mongoose.model('User'),
  Validations = require('../utils/validations'),
  Article = mongoose.model('Article'),
  Activity = mongoose.model('Activity');
Item = mongoose.model('Item');


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
      }, 'title createdAt _id tags thumbnail_url',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Articles retrieved successfully.',
            data: result
          });
        });
    });
  } else {
    User.findById(id, (err, user) => {
      if (err) {
        return next(err);
      }
      let articlesIDs = user.favorites.resources;
      Article.find({
        _id: { $in: articlesIDs },
        approved: { $eq: true }
      }, 'title createdAt owner_id _id tags upvoters downvoters thumbnail_url',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
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
      let childArticlesIDs = child.favorites.resources;
      if (childArticlesIDs.includes(articleID)) {
        return res.status(304).json({
          err: null,
          msg: 'Resource is already in your favorites',
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
        if (!child.allowedArticles.includes(article._id)) {
          return res.status(401).json({
            err: null,
            msg: 'This article is not allowed (Child account)',
            data: null
          });
        }
        child.favorites.resources.addToSet(article._id);
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

      let userArticlesIDs = user.favorites.resources;
      if (userArticlesIDs.includes(articleID)) {
        return res.status(304).json({
          err: null,
          msg: 'Resource is already in your favorites',
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

        user.favorites.resources.addToSet(article._id);
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
      let activitiesIDs = child.favorites.activities;
      Activity.find({
        _id: { $in: activitiesIDs }
      }, '_id name picture_url activity_type created_at',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Activities retrieved successfully.',
            data: result
          });
        });
    });
  } else {
    User.findById(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      let activitiesIDs = user.favorites.activities;
      Activity.find({
        _id: { $in: activitiesIDs }
      }, '_id name picture_url activity_type created_at',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Activities retrieved successfully.',
            data: result
          });
        });
    });
  }
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
      if (favoriteIDs.includes(activityID)) {
        return res.status(304).json({
          err: null,
          msg: 'Activity is already in your favorites',
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

        child.favorites.activities.addToSet(activity._id);
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

      if (user.favorites.activities.includes(activityID)) {
        return res.status(304).json({
          err: null,
          msg: 'Activity is already in your favorites',
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

        user.favorites.activities.addToSet(activity._id);
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
      let itemsIDs = child.favorites.items;
      Item.find({
        _id: { $in: itemsIDs }
      }, 'picture_url name likes price description item_type',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Items retrieved successfully.',
            data: result
          });
        });
    });
  } else {
    User.findById(id, (err, user) => {
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
      let itemsIDs = user.favorites.items;
      Item.find({
        _id: { $in: itemsIDs },
      }, 'picture_url name likes price description item_type',
        (err, result) => {
          if (err) {
            return next(err);
          }
        }).exec((err, result) => {
          res.status(200).json({
            err: null,
            msg: 'Items retrieved successfully.',
            data: result
          });
        });
    });
  }
};

module.exports.addFavItem = function (req, res, next) {
  let valid = req.params.itemID &&
    Validations.isObjectId(req.params.itemID);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid item ID passed.',
      data: null
    });
  }
  let itemID = req.params.itemID;
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
      let childItemIDs = child.favorites.items;
      if (childItemIDs.includes(itemID)) {
        return res.status(304).json({
          err: null,
          msg: 'Item is already in your favorites',
          data: null
        });
      }
      Item.findById(itemID, (err, item) => {
        if (err) {
          return next(err);
        }
        if (!item) {
          return res.status(404).json({
            err: null,
            msg: 'Item not found.',
            data: null
          });
        }
        child.favorites.items.addToSet(item._id);
        child.save(function (err, updatedChild) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Item added to favorites successfully',
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
      if (user.favorites.items.includes(itemID)) {
        return res.status(304).json({
          err: null,
          msg: 'Item is already in your favorites',
          data: null
        });
      }

      Item.findById(itemID, (err, item) => {
        if (err) {
          return next(err);
        }
        if (!item) {
          return res.status(404).json({
            err: null,
            msg: 'Item not found.',
            data: null
          });
        }

        user.favorites.items.addToSet(item._id);
        user.save(function (err, updatedUser) {
          if (err) return next(err);
          return res.status(200).json({
            err: null,
            msg: 'Item added to favorites successfully',
            data: updatedUser
          });
        });
      });
    });
  }
};

module.exports.removeFavItem = function (req, res, next) {
  let valid = req.params.itemID &&
    Validations.isObjectId(req.params.itemID);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid article ID passed.',
      data: null
    });
  }

  let itemID = req.params.itemID;
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
      child.favorites.items.splice(child.favorites.items.indexOf(itemID), 1);
      child.save(function (err, updatedChild) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Item deleted from favorites successfully',
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
      user.favorites.items.splice(user.favorites.items.indexOf(itemID), 1);
      user.save(function (err, updatedUser) {
        if (err) return next(err);
        return res.status(200).json({
          err: null,
          msg: 'Item deleted from favorites successfully',
          data: updatedUser
        });
      });
    });
  }
};