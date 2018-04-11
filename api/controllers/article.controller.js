var mongoose = require('mongoose'),
  moment = require('moment'),
  jsdom = require("jsdom"),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Child = mongoose.model('Child'),
  Tag = mongoose.model('Tag'),
  Article = mongoose.model('Article');

const { JSDOM } = jsdom;

module.exports.getArticle = function (req, res, next) {
  let article_id = req.params.id;
  if (req.decodedToken.user.username) {
    let id = req.decodedToken.user._id;
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
      let articlesIDs = child.allowedArticles;
      if (!articlesIDs.includes(article_id)) {
        return res.status(401).json({
          err: null,
          msg: 'You cannot view this article, it needs to be assigned to you first.',
          data: null
        });
      }
      findArticleById(article_id, res, next);
    });
  } else {
    findArticleById(article_id, res, next);
  }
};

module.exports.getArticles = function (req, res, next) {
  //If he's a child, no need for further checks since the token is coming from the server (using the secret)
  if (req.decodedToken.user.username) {
    let id = req.decodedToken.user._id;
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
      //Find all articles with the IDs in the child's profile, and only return back the ones approved
      let articlesIDs = child.allowedArticles;
      Article.find({
        _id: { $in: articlesIDs },
        approved: { $eq: true }
      }, 'title createdAt owner_id _id tags upvoters downvoters',
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
    Article.find({
      approved: true
    }, 'title createdAt owner_id _id tags upvoters downvoters', (err, result) => {
      if (err) {
        return next(err);
      }
      //TODO: name nested inside owner_id, maybe change schema later on.    
    }).populate('owner_id', 'name', 'User').exec((err, result) => {
      res.status(200).json({
        err: null,
        msg: 'Articles retrieved successfully.',
        data: result
      });
    });
  }
};

module.exports.createArticle = function (req, res, next) {

  if (req.decodedToken.user.role === 'Child') {
    return res.status(401).json({
      err: null,
      msg: "You don't have permissions to post (child account)",
      data: null
    });
  }
  var valid =
    req.body.title && Validations.isString(req.body.title) &&
    req.body.content && Validations.isString(req.body.content);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'title(String), owner_id(String), and content(String) are required fields.',
      data: null
    });
  }
  if (req.body.tags && !Validations.isArray(req.body.tags)) {
    return res.status(422).json({
      err: null,
      msg: 'tags must be an Array type.',
      data: null
    });
  }
  if (!req.body.tags) {
    req.body.tags = [];
  }
  let invalidTags = false;
  req.body.tags.forEach(element => {
    //Simulating a break statement.
    if (!element.match(/^[0-9a-fA-F]{24}$/)) {
      invalidTags = true;
    }
  });
  if (invalidTags) {
    return res.status(422).json({
      err: null,
      msg: 'one or more tags passed are invalid IDs',
      data: null
    });
  }

  User.findById(req.decodedToken.user._id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    Tag.find({
      '_id': {
        $in: req.body.tags
      }
    }, (err, retrievedTags) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      const content = transformHtml(req.body.content);
      let article = {
        owner_id: req.decodedToken.user._id,
        title: req.body.title,
        content,
        tags: null
      };
      if (retrievedTags.length !== req.body.tags.length) {
        return res.status(404).json({
          err: null,
          msg: 'Wrong tags passed. Article re-sent in response',
          data: article
        });
      }
      article.tags = retrievedTags.map(tag => tag._id);
      Article.create(article, (err, newArticle) => {
        if (err) {
          console.log(err)
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Article created successfully.',
          data: newArticle.toObject()
        });
      });
    });
  });
};

module.exports.feedbackArticle = function (req, res, next) {
  let valid = req.body.mode &&
    Validations.isString(req.body.mode) &&
    req.body.article_id &&
    Validations.isString(req.body.article_id);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'article_id(String), and mode(String) are required fields.',
      data: null
    });
  }
  let MODE = req.body.mode;
  if (MODE !== "upvote" && MODE !== "downvote") {
    return res.status(422).json({
      err: null,
      msg: 'mode(String) must be either "downvote" or "upvote".',
      data: null
    });
  }
  //He passed the middleware, thus authenticated. Get user's id
  let userID = req.decodedToken.user._id;
  Article.findById(req.body.article_id, (err, retrievedArticle) => {
    if (err) { return next(err); }
    if (!retrievedArticle) {
      return res.status(404).json({
        err: null,
        msg: 'Article was not found.',
        data: null
      });
    }

    if (MODE == "upvote") {
      upvote(retrievedArticle, userID, res, next);
    } else {
      downvote(retrievedArticle, userID, res, next);
    }
  });
}
////////////////////////////////////////////////////////// HELPERS

const upvote = function (article, id, res, next) {
  if (article.upvoters.includes(id)) {
    return res.status(200).json({
      err: null,
      msg: "Already upvoted",
      data: { upvoters: article.upvoters, downvoters: article.downvoters }
    });
  } else if (article.downvoters.includes(id)) {
    article.downvoters.splice(article.downvoters.indexOf(id), 1);
  }
  article.upvoters.push(id);
  article.save(function (err, updatedArticle) {
    if (err) { return next(err) }
    return res.status(200).json({
      err: null,
      msg: "Successfully upvoted.",
      data: { upvoters: updatedArticle.upvoters, downvoters: updatedArticle.downvoters }
    });
  });
}

const downvote = function (article, id, res, next) {
  if (article.downvoters.includes(id)) {
    return res.status(200).json({
      err: null,
      msg: "Already downvoted",
      data: { upvoters: article.upvoters, downvoters: article.downvoters }
    });
  } else if (article.upvoters.includes(id)) {
    article.upvoters.splice(article.upvoters.indexOf(id), 1);
  }
  article.downvoters.push(id);
  article.save(function (err, updatedArticle) {
    if (err) { return next(err); }
    return res.status(200).json({
      err: null,
      msg: "Successfully updated.",
      data: { upvoters: updatedArticle.upvoters, downvoters: updatedArticle.downvoters }
    });
  });
}


const findArticleById = function (article_id, res, next) {
  Article.findById(article_id,
    (err, result) => {
      if (err) {
        return next(err);
      }
      //FEATUREZ: Change el pending and stuff
      if (result.approved === false) {
        res.status(401).json({
          err: null,
          msg: 'Cannot retrieve this article.',
          data: result
        });
      }
      User.findById(result.owner_id, (err, ownerUser) => {
        if (err) {
          return next(err);
        }

        result._doc.name = ownerUser.name;
        res.status(200).json({
          err: null,
          msg: 'Article retrieved successfully.',
          data: result
        });
      });
    }).populate('comments.commenter', 'name', 'User').populate('comments.replies.replier', 'name', 'User');
}



//Transforms HTML generated by quill, adds bootstrap structure for embedded videos
const transformHtml = (html) => {
  const dom = new JSDOM(html);

  const document = dom.window.document;

  document.querySelectorAll('iframe').forEach(element => {
    element.classList.add('embed-responsive-item');
    element.classList.remove('ql-video');

    const parent = element.parentNode;
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('embed-responsive', 'embed-responsive-16by9');

    parent.replaceChild(wrapperDiv, element);
    wrapperDiv.appendChild(element);
  });
  let result = dom.serialize();
  return result.substring(25, result.length - 14);
};
//////////////////////////////////////COMMENTS////////////////////////////////////////
const comment = function (article, id, content, res, next) {
  let comment = {
    comment_content: content,
    commenter: id,
  }
  article.comments.push(comment);
  article.save(function (err, updatedArticle) {
    if (err) { return next(err) }
    return res.status(200).json({
      err: null,
      msg: "Comment is added successfully.",
      data: { comments: updatedArticle.comments }
    });
  });
};
const reply = function (article, userID, comment_id, reply, res, next) {
  let rep = {
    reply_content: reply,
    replier: userID
  }

  // article.update(
  //     { _id: article._id, "comments._id": comment_id},//, "comments._id":comment_id},
  //     { $push: { "comments.replies": rep } }
  // );
  // article.update({'comments._id': comment_id}, {$push: {'comments.0.replies': rep}});
  //article.comments.replies.push(rep);
  Article.updateOne(
    { "_id": article._id, 'comments._id': comment_id },
    { $push: { 'comments.$.replies': rep } }
  ).exec((err, result) => {
    res.status(200).json({
      err: null,
      msg: 'Articles retrieved successfully.',
      data: result
    });
  });
  // article.save(function (err, updatedArticle) {
  //     if (err) { return next(err) }
  //     return res.status(200).json({
  //         err: null,
  //         msg: "Reply is added successfully.",
  //         data: { comments: updatedArticle.comments}
  //     });
  // });
};
module.exports.commentArticle = function (req, res, next) {
  let valid = req.body.article_id &&
    Validations.isString(req.body.article_id) &&
    req.body.comment_content && Validations.isString(req.body.comment_content);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'article_id(String) and comment content(String) are required fields.',
      data: null
    });
  }

  let userID = req.decodedToken.user._id;
  Article.findById(req.body.article_id, (err, retrievedArticle) => {
    if (err) {
      return next(err);
    }
    if (!retrievedArticle) {
      return res.status(404).json({
        err: null,
        msg: 'Article was not found.',
        data: null
      });
    }
    comment(retrievedArticle, userID, req.body.comment_content, res, next);
  })
};
module.exports.replyComment = function (req, res, next) {
  let valid = req.body.article_id &&
    Validations.isString(req.body.article_id) &&
    req.body.comment_id &&
    Validations.isString(req.body.comment_id) &&
    req.body.reply &&
    Validations.isString(req.body.reply)
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'article_id(String), and comment_id(String) and reply content(String) are required fields.',
      data: null
    });
  }
  let userID = req.decodedToken.user._id;
  Article.findById(req.body.article_id, (err, retrievedArticle) => {
    if (err) {
      return next(err);
    }
    if (!retrievedArticle) {
      return res.status(404).json({
        err: null,
        msg: 'Article was not found.',
        data: null
      });
    }
    reply(retrievedArticle, userID, req.body.comment_id, req.body.reply, res, next);
  })
};
