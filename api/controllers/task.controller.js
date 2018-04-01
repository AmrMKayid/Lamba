var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  Comment = mongoose.model('Comment');
  User = mongoose.model('User')


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
    name: req.body.name
  }


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

module.exports.getStudents = function(req, res, next) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
}



module.exports.getComments = function(req, res, next) {
  Task.findById(req.params.taskId).exec(function(err, task) {
    if (err) {
      return next(err);
    }

    var ids = task.Comments;




    Comment.find({
      _id: {
        $in: ids
      }
    }).exec(function(err, com) {
      res.status(201).json({
        err: null,
        msg: 'Comment was r successfully.',
        data: com
      });
    });






  });

};
