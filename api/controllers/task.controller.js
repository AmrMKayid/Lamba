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


  const com = {
    Comment: req.body.Comment,
    userId: req.body.userId,
    userType: req.body.userType,
  }

  console.log(com)

  Comment.create(com, function(err, comment) {
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



module.exports.getComments = function(req, res, next) {
  Task.findById(req.params.taskId).exec(function(err, task) {
    if (err) {
      return next(err);
    }

    var ids = task.Comments;


    const comarr = [];


    for (var id of ids) {
      Comment.findById(id).exec(function(err, com) {
        comarr.push(com);
      });
    }

    res.status(201).json({
      err: null,
      msg: 'Comment was r successfully.',
      data: comarr
    });



  });

};
