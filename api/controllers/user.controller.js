var mongoose = require('mongoose'),
    Child = mongoose.model('Child'),
    User = mongoose.model('User');
//Start yasmeen
  //Show Articles needed to be verified
    module.exports.viewUnverifiedArticles=function (req, res, next) {
        Article.find({ approved:false }).exec(function(err, articles) {
            if (err) {
              return next(err);
            }
            res.status(200).json({
              err: null,
              msg: 'Unverified Articles retrieved successfully.',
              data: articles
            });
          });
        };
//View Certain Article 
 module.exports.viewArticleToVerify=function(req, res, next) {
    if (!Validations.isObjectId(req.params.articleId)) {
      return res.status(422).json({
        err: null,
        msg: 'articleId parameter must be a valid ObjectId.',
        data: null
      });
    }
    Article.findById(req.params.articleId).exec(function(err, article) {
      if (err) {
        return next(err);
      }
      if (!article) {
        return res
          .status(404)
          .json({ err: null, msg: 'Article not found.', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'Article retrieved successfully.',
        data: article
      });
    });
  };

 //Verfiy Articles
 module.exports.verifyArticles= function (req, res, next) {
    if (!Validations.isObjectId(req.params.articleId)) {
        return res.status(422).json({
          err: null,
          msg: 'articletId parameter must be a valid ObjectId.',
          data: null
        });
      }
      Article.findById(req.params.articleId).exec(function(err, article) {
        if (err) {
          return next(err);
        }
        if (!article) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
       var verify=true;

       article.approved=verify;

       article.updatedAt=moment().toDate();

       article.save(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          err: null,
          msg: 'Article verified successfully.',
          data: article
        });
      });
    });
      

 };