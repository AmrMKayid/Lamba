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

            });

        });
    }

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

    });



module.exports.createNewComment = function(req, res, next) {




  const com = {
    Comment: req.body.Comment,
    userId: req.body.userId,
    userType: req.body.userType,
    name: req.body.name
  }

  Task.findById(req.body.taskId).exec(function(err, task) {

    var auth = false;


    if (req.body.userType === "Parent") {

      Child.findById(task.StudentId).exec(function(err, child) {

        if (err || !child) {
          auth = false;
        } else {
          if (child.parent_id === req.body.userId) {
            auth = true;
          } else {
            auth = false;
          }
        }
      });


    } else if (req.body.userType === "Teacher") {
      if (req.body.userId === task.TeacherId) {
        auth = true;
      }
    } else if (req.body.userType === "Child") {
      if (req.body.userId === task.StudentId) {
        auth = true;
      }
    }

    if (auth) {
      Comment.create(com, function(err, comment) {
        if (err) {
          return next(err);
        }
      });

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
      if(!task){
          return res
              .status(404)
              .json({err: null, msg: 'Task not found.', data: null});
      }
    User.findById(req.decodedToken.user._id).exec(function(err,user){
      if(err){
        return next(err);
      }
      if(!user){
          Child.findById(req.decodedToken.user._id).exec(function(err,child){
              if(err){
                  return next(err);
              }
              if(!child){
                  return res
                      .status(404)
                      .json({err: null, msg: 'Child not found.', data: null});
              }
              if(child._id !== task.ChildId){
                  return res
                      .status(401)
                      .json({err: null, msg: 'Unauthorized access.', data: null});
              }
              });
      }
      if(user.role === 'Parent'){
          Child.findById(task.ChildId).exec(function(err,child){
              if(err){
                  return next(err);
              }
              if(!child){
                  return res
                      .status(401)
                      .json({err: null, msg: 'Unauthorized access.', data: null});
              }
              if(child.parent_id !== user._id){
                  return res
                      .status(401)
                      .json({err: null, msg: 'Unauthorized access.', data: null});
              }
          });


      }
        if(user.role === 'Teacher') {
            user.students.findById(task.StudentId).exec(function (err, child2) {
                if (err) {
                    return next(err);
                }
                if (!child2) {
                    return res
                        .status(401)
                        .json({err: null, msg: 'This child is not in your list of students.', data: null});

                }
                ;

            });
        }
    });




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

module.exports.getTasks = function(req, res, next) {

    User.findById(req.decodedToken.user._id).exec(function(err,user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            Child.findById(req.decodedToken.user._id).exec(function (err, child) {
                if (err) {
                    return next(err);
                }
                if (!child) {
                    return res
                        .status(404)
                        .json({err: null, msg: 'Child not found.', data: null});
                }


                Task.find({
                    studentId: { //might need changing depending on saleh's schema
                        $eq: req.decodedToken.user._id
                    }
                }).exec(function(err, tasks) {
                    if (err) {
                        return next(err);
                    }
                  return  res.status(200).json({
                        err: null,
                        msg: 'Requests received successfully.',
                        data: tasks

                    });
                });

            });
        }
         Task.find({
                userId: { //might need changing depending on saleh's schema
                    $eq: req.decodedToken.user._id
                }
            }).exec(function(err, tasks) {
                if (err) {
                    return next(err);
                }
              return  res.status(200).json({
                    err: null,
                    msg: 'Requests received successfully.',
                    data: tasks

                });
            });

    });

};

module.exports.getChildTasks = function(req, res, next) {

    User.findById(req.decodedToken.user._id).exec(function(err,user) {
        if (err) {
            return next(err);
        }
        if (!user) {

            return res
                .status(404)
                .json({err: null, msg: 'User not found.', data: null});


        }

      if(req.decodedToken.user.role !== 'Parent'){
          return res
              .status(401)
              .json({err: null, msg: 'Unauthorized access.', data: null});

      }

        Task.find({
            studentId: { //might need changing depending on saleh's schema
                $eq: req.params.ChildId
            }
        }).exec(function(err, tasks) {
            if (err) {
                return next(err);
            }
            return  res.status(200).json({
                err: null,
                msg: 'Requests received successfully.',
                data: tasks

            });
        });


            });

};




module.exports.getTeacher = function(req, res, next) {
  let id = req.params.TeacherId;
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
