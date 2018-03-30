var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  Comment = mongoose.model('Comment');



module.exports.createNewTask = function(req, res, next) {
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

module.exports.createNewComment = function(req, res, next) {
    Comment.create(req.body, function(err, comment) {
          if (err) {
            return next(err);
          }

          Task.findById(req.body.taskId).exec(function(err, task) {
            task.Comments.push(comment);
            task.save(function(err) {
              if (err) {
                return next(err);
              }
              res.status(201).json({
                err: null,
                msg: 'Comment was created successfully.',
                data: task
              });

            });


          });
        });
      };
