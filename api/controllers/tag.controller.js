var mongoose = require('mongoose'),
  moment = require('moment'),
  jsdom = require("jsdom"),
  Validations = require('../utils/validations'),
  Tag = mongoose.model('Tag'),
  Article = mongoose.model('Article');

module.exports.addTag = function (req, res, next) {
  let valid = req.body.name &&
    Validations.isString(req.body.name);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: `You need to enter the tag's name: name(String)`,
      data: null
    });
  }

  Tag.create({ name: req.body.name }, (err, newTag) => {
    if (err) {
      if (err.code(11000)) {
        return res.status(422).json({
          err: null,
          msg: `Tag already exists`,
          data: null
        });
      } else {
        return next(err);
      }
    }
    return res.status(200).json({
      err: null,
      msg: 'Tag created successfully.',
      data: newTag
    });
  });
};

module.exports.deleteTag = function (req, res, next) {
  let tag_id = req.params.id;
  if (!tag_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(422).json({
      err: null,
      msg: `Invalid ID format`,
      data: null
    });
  }
  Tag.findByIdAndRemove(tag_id, (err, deletedTag) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!deletedTag) {
      return res.status(422).json({
        err: null,
        msg: `Tag ID doesn't exist`,
        data: null
      });
    }
    Article.update(
      {},
      { $pull: { tags: deletedTag._id } },
      { multi: true },
      (err, updatedArticles) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.status(200).json({
          err: null,
          msg: 'Tag deleted successfully.',
          data: deletedTag
        });
      }
    );
  });
};

module.exports.getTags = function (req, res, next) {
  Tag.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.status(200).json({
      err: null,
      msg: 'Tags retrieved successfully.',
      data: result
    });
  });
};