var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task'),
  Comment = mongoose.model('Comment'),
  Child = mongoose.model('Child'),
    Validations = require('../utils/validations');



module.exports.createNewTask = function(req, res, next) {
    if (!Validations.isObjectId(req.params.ChildId)) {
        return res.status(422).json({
            err: null,
            msg: 'ChildId parameter must be a valid ObjectId.',
            data: null
        });
    };

    Child.findById(req.params.ChildId).exec(function(err, child) {
        if (err) {
            return next(err);
        }
        if (!child) {
            return res
                .status(404)
                .json({err: null, msg: 'Child not found.', data: null});
        }


        User.findById(req.decodedToken.user._id).exec(function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res
                    .status(404)
                    .json({err: null, msg: 'User not found.', data: null});
            }
            if (user.role === 'Parent' && req.decodedToken.user._id !== child.parent_id) {

                return res
                    .status(401)
                    .json({err: null, msg: 'Unauthorized action.', data: null});
            }
            else if(user.role === 'Teacher'){
                user.students.findById(req.params.ChildId).exec(function(err, child2) {
                    if (err) {
                        return next(err);
                    }
                    if (!child2) {
                        return res
                            .status(401)
                            .json({err: null, msg: 'This child is not in your list of students.', data: null});


                        Task.create(req.body, function(err, task) {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            res.status(201).json({
                                err: null,
                                msg: 'Task was created successfully.',
                                data: task
                            });
                        });
                    };
                });
            }})})}

