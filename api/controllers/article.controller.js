var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/validations'),
    User = mongoose.model('User'),
    Child = mongoose.model('Child'),    
    Article = mongoose.model('Article');


module.exports.getArticles = function (req, res, next) {
    Article.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Articles retrieved successfully.',
            data: result
        });
    });
};

module.exports.createArticle = function (req, res, next) {
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
    
    User.findById(req.decodedToken.user._id).exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        let article = {
            owner_id: req.decodedToken.user._id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags
        };

        Article.create(article, (err, newArticle) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                err: null,
                msg: 'Article created successfully.',
                data: newArticle.toObject()
            });
        });
    });
};