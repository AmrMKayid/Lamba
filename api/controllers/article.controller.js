var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/validations'),
    User = mongoose.model('User'),
    Child = mongoose.model('Child'),
    Article = mongoose.model('Article');


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
            },
                (err, result) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({
                        err: null,
                        msg: 'Articles retrieved successfully.',
                        data: result
                    });
                });
        });
    } else {
        Article.find({ approved: true }, (err, result) => {
            if (err) {
                return next(err);
            }
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