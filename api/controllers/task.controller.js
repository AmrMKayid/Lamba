var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task'),
  Comment = mongoose.model('Comment'),
  Child = mongoose.model('Child');

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


  Task.findById(req.body.taskId).exec(function(err, task) {


    const com = {
        comment: req.body.comment,
        userId: req.body.userId,
        userType: req.body.userType,
        name: req.body.name
      }


    var auth = false;

    if (req.body.userType === "Parent") {
        auth = true;
      // Child.findById(task.studentId).exec(function(err, child) {
      //
      //   if (err || !child) {
      //     auth = false;
      //     console.log("I am here false");
      //
      //   } else {
      //     if (child.parent_id === req.body.userId) {
      //
      //
      //       auth = true;
      //
      //     } else {
      //       auth = false;
      //     }
      //   }
      // });
    } else if (req.body.userType === "Teacher") {
      if (req.body.userId === task.userId) {
        auth = true;
      }
    } else if (req.body.userType === "Child") {
      if (req.body.userId === task.studentId) {
        auth = true;
      }
    }


    if (auth) {


      Comment.create(com, function(err, comment) {
        if (err) {
          return next(err);
        }
        task.comments.push(comment);




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
    } else {
      res.status(401).json({
        err: null,
        msg: 'Not Auth.',
        data: task
      });
    }


  });

};


module.exports.getComments = function(req, res, next) {
  Task.findById(req.params.taskId).exec(function(err, task) {
    if (err) {
      return next(err);
    }

    var ids = task.comments;


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


module.exports.getTask = function(req, res, next) {
  Task.findById(req.params.taskId).exec(function(err, task) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Requests recieved successfully.',
      data: task
    });
  });
};


module.exports.getTasks = function(req, res, next) {
  Task.find({
    StudentId: {
      $eq: req.params.childId
    }
  }).exec(function(err, request) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Requests recieved successfully.',
      data: request

    });
  });
};

module.exports.getTeacher = function(req, res, next) {
  let id = req.params.userId;
  User.findById(id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Requests recieved successfully.',
      data: user.name
    });
  });
};
