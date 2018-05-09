var mongoose = require('mongoose'),
  Child = mongoose.model('Child'),
  User = mongoose.model('User'),
  Validations = require('../utils/validations'),
  Article = mongoose.model('Article'),
  Request = mongoose.model('Request'),
  Contact = mongoose.model('Contact'),
  Verification = mongoose.model('Verification'),
  Activity = mongoose.model('Activity');

module.exports.getAllUsers = function (req, res, next) {
  //Assuming that the first and last name shall be seperated with a space in the frontend.
  let firstName = req.query.first;
  let lastName = req.query.last;
  User.find({
    $and: [
      {
        $or: [{
          role: 'Parent'
        }, {
          role: 'Teacher'
        }]
      },
      {
        $and: [{
          'name.firstName':
            new RegExp(firstName, 'i')
        },
        {
          'name.lastName':
            new RegExp(lastName, 'i')
        }]
      },
      {
        mailActivated: 'true'
      }
    ]
  }).select({ 'name.firstName': 1, 'name.lastName': 1, photo: 1, _id: 1, role: 1 }).exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Users retrieved successfully.',
      data: users
    });
  })
};

module.exports.getUser = function (req, res, next) {
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(422).json({
      err: null,
      msg: 'id parameter must be a valid ObjectId.',
      data: null
    });
  }

  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    //Not found in users, search for him in children
    if (!user) {
      Child.findById(req.params.id).exec(function (err, child) {
        if (err) {
          return next(err);
        }
        user = child;
        if (!user) {
          return res.status(404).json({
            err: null,
            msg: 'User not found.',
            data: null
          });
        }
        return res.status(200).json({
          err: null,
          msg: 'Child retrieved successfully.',
          data: child
        });
      });
    } else {
      return res.status(200).json({
        err: null,
        msg: 'User retrieved successfully.',
        data: user
      });
    }
  });
}

module.exports.getUserByID = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userID)) {
    return res.status(422).json({
      err: null,
      msg: 'userID parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.params.userID).exec(function (err, user) {
    if (err) {
      return next(err);
    }

    res.status(200).json({
      err: null,
      msg: 'User retrieved successfully.',
      data: user
    });
  });
};

module.exports.getChildByID = function (req, res, next) {
  if (!Validations.isObjectId(req.params.childId)) {
    return res.status(422).json({
      err: null,
      msg: 'childID parameter must be a valid ObjectId.',
      data: null
    });
  }
  Child.findById(req.params.childId).exec(function (err, child) {
    if (err) {
      return next(err);
    }
    if (!child) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'childr not found.',
          data: null
        });
    }
    if (req.decodedToken.user.role === 'Parent') {

      if (child.parent_id != req.decodedToken.user._id) {

        return res
          .status(401)
          .json({
            err: null,
            msg: 'you are not authorized to view this child info',
            data: null
          });

      }
    } else {
      User.findById(req.decodedToken.user._id).exec(function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({
              err: null,
              msg: 'Teacher not found.',
              data: null
            });
        }
        if (user.students.indexOf(req.params.childId) === -1) {
          return res
            .status(401)
            .json({
              err: null,
              msg: 'you are not authorized to view this child info',
              data: null
            });
        }
      });
    }
    res.status(200).json({
      err: null,
      msg: 'Child retrieved successfully.',
      data: child
    });
  });
};


module.exports.getUserChildren = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userID)) {
    return res.status(422).json({
      err: null,
      msg: 'userID parameter must be a valid ObjectId.',
      data: null
    });
  }
  Child.find({
    parent_id: req.params.userID
  }).exec(function (err, children) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'children retrieved successfully.',
      data: children
    });
  });
};

module.exports.updateImage = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userID)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findByIdAndUpdate(
    req.params.userID, {
      $set: req.body
    }, {
      new: true
    }
  ).exec(function (err, updateUser) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!updateUser) {
      Child.findByIdAndUpdate(
        req.params.userID, {
          $set: req.body
        }, {
          new: true
        }
      ).exec(function (err, updateChild) {
        if (err) {
          return next(err);
        }
        if (!updateChild) {
          return res.status(404).json({
            err: null,
            msg: 'User not found.',
            data: null
          });
        }
        let tokenData = updateChild.toObject();
        delete tokenData.schedule;
        delete tokenData.favorites;
        delete tokenData.messages;
        delete tokenData.myItems;
        delete tokenData.interests;
        delete tokenData.joinedAt;
        delete tokenData.qualifications;
        delete tokenData.sessions;
        delete tokenData.cart;
        delete tokenData.gender;
        var token = jwt.sign({
          user: tokenData
        }, req.app.get('secret'), {
            expiresIn: '21d'
          });
        res.status(200).json({
          err: null,
          msg: 'Welcome',
          data: token
        });
      });
    } else {
      let tokenData = updateUser.toObject();
      delete tokenData.schedule;
      delete tokenData.favorites;
      delete tokenData.messages;
      delete tokenData.myItems;
      delete tokenData.interests;
      delete tokenData.joinedAt;
      delete tokenData.qualifications;
      delete tokenData.sessions;
      delete tokenData.cart;
      delete tokenData.gender;
      var token = jwt.sign({
        user: tokenData
      }, req.app.get('secret'), {
          expiresIn: '21d'
        });
      res.status(200).json({
        err: null,
        msg: 'Welcome',
        data: token
      });
    }
  });
};

module.exports.updateCoverImage = function (req, res, next) {

  User.findByIdAndUpdate(
    req.decodedToken.user._id, {
      $set: { coverPhoto: req.body.coverPhoto }
    }, {
      new: true
    }
  ).exec(function (err, updateUser) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!updateUser) {
      Child.findByIdAndUpdate(
        req.decodedToken.user._id, {
          $set: { coverPhoto: req.body.coverPhoto }
        }, {
          new: true
        }
      ).exec(function (err, updateChild) {
        if (err) {
          return next(err);
        }
        if (!updateChild) {
          return res.status(404).json({
            err: null,
            msg: 'User not found.',
            data: null
          });
        }

        let tokenData = updateChild.toObject();
        delete tokenData.schedule;
        delete tokenData.favorites;
        delete tokenData.messages;
        delete tokenData.myItems;
        delete tokenData.interests;
        delete tokenData.joinedAt;
        delete tokenData.qualifications;
        delete tokenData.sessions;
        delete tokenData.cart;
        delete tokenData.gender;

        var token = jwt.sign({
          user: tokenData
        }, req.app.get('secret'), {
            expiresIn: '21d'
          });
        res.status(200).json({
          err: null,
          msg: 'Welcome',
          data: token
        });
      });
    } else {
      let tokenData = updateUser.toObject();
      delete tokenData.schedule;
      delete tokenData.favorites;
      delete tokenData.messages;
      delete tokenData.myItems;
      delete tokenData.interests;
      delete tokenData.joinedAt;
      delete tokenData.qualifications;
      delete tokenData.sessions;
      delete tokenData.cart;
      delete tokenData.gender;
      var token = jwt.sign({
        user: tokenData
      }, req.app.get('secret'), {
          expiresIn: '21d'
        });
      res.status(200).json({
        err: null,
        msg: 'Welcome',
        data: token
      });
    }
  });
};

module.exports.getPendingTeachers = function (req, res, next) {
  User.find({
    role: {
      $eq: "Teacher"
    }
    ,
    isReviewed: {
      $eq: false
    }

  }).exec(function (err, requests) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'New Teachers Requests retrieved successfully.',
      data: requests
    });
  });
};

module.exports.acceptTeacher = function (req, res, next) {
  if (!Validations.isObjectId(req.params.teacherID)) {
    return res.status(422).json({
      err: null,
      msg: 'teacherId parameter must be a valid ObjectId.',
      data: null
    });
  }

  User.findByIdAndUpdate(
    req.params.teacherID, {
      $set: {
        isVerified: true,
        isReviewed: true
      }
    }, {
      new: true
    }
  ).exec(function (err, teacher) {
    if (err) {
      return next(err);
    }
    if (!teacher) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'Teacher not found.',
          data: null
        });
    }
    res.status(200).json({
      err: null,
      msg: 'Teacher was verified successfully.',
      data: teacher
    });
  });
};

module.exports.declineTeacher = function (req, res, next) {
  if (!Validations.isObjectId(req.params.teacherID)) {
    return res.status(422).json({
      err: null,
      msg: 'teacherId parameter must be a valid ObjectId.',
      data: null
    });
  }

  User.findByIdAndUpdate(
    req.params.teacherID, {
      $set: {
        isVerified: false,
        isReviewed: true
      }
    }, {
      new: true
    }
  ).exec(function (err, teacher) {
    if (err) {
      return next(err);
    }
    if (!teacher) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'Teacher not found.',
          data: null
        });
    }
    res.status(200).json({
      err: null,
      msg: 'Teacher declined successfully.',
      data: teacher
    });
  });
};

//Start yasmeen
//Show Articles needed to be verified
module.exports.viewUnverifiedArticles = function (req, res, next) {
  Article.find({
    approved: false
  }, 'title createdAt owner_id _id tags content thumbnail_url', (err, result) => {
    if (err) {
      return next(err);
    }
    //TODO: name nested inside owner_id, maybe change schema later on.
  }).populate('owner_id', 'name', 'User').exec((err, result) => {
    res.status(200).json({
      err: null,
      msg: 'Articles retrieved successfully.',
      data: result
    });
  });
};


//View Certain Article
module.exports.viewArticleToVerify = function (req, res, next) {
  if (!Validations.isObjectId(req.params.articleId)) {
    return res.status(422).json({
      err: null,
      msg: 'articleId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Article.findById(req.params.articleId).exec(function (err, article) {
    if (err) {
      return next(err);
    }
    if (!article) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'Article not found.',
          data: null
        });
    }
    res.status(200).json({
      err: null,
      msg: 'Article retrieved successfully.',
      data: article
    });
  });
};

//Verfiy Articles
module.exports.verifyArticle = function (req, res, next) {


  if (!Validations.isObjectId(req.params.articleId)) {
    return res.status(422).json({
      err: null,
      msg: 'articletId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Article.findByIdAndUpdate(req.params.articleId, {
    $set: {
      approved: true
    },
    $currentDate: {
      updatedAt: true
    }
  }, {
      new: true
    }).exec(function (err, article) {
      if (err) {
        return next(err);
      }
      if (!article) {
        return res
          .status(404)
          .json({
            err: null,
            msg: 'Article not found.',
            data: null
          });
      }
      res.status(200).json({
        err: null,
        msg: 'Article verified successfully.',
        data: null
      });

    });
};

//delete article upon admin rejection
module.exports.rejectArticle = function (req, res, next) {
  if (!Validations.isObjectId(req.params.articleId)) {
    return res.status(422).json({
      err: null,
      msg: 'Article id must be a valid object id',
      data: null
    });
  }
  if (req.decodedToken.user._id) {
    Article.findById(req.params.articleId, (err, retrievedArticle) => {
      if (err) {
        return next(err);
      }
      if (!retrievedArticle) {
        return res.status(404).json({
          err: null,
          msg: 'Article was not found.',
          data: null
        });
      }
      Article.findByIdAndRemove(req.params.articleId, (err, result) => {
        if (err) {
          return next(err);
        }
        if (!result) {
          return res.status(404).json({
            err: null,
            msg: 'Article was not found.',
            data: null
          });
        }

        Child.update(
          {},
          { $pull: { allowedArticles: result._id } },
          { multi: true },
          (err, updatedArticles) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            return res.status(200).json({
              err: null,
              msg: 'Article rejected and deleted successfully.',
              data: result
            });
          }
        );

      });
    });

  }
};
module.exports.getUserInfo = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.params.userId).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'User not found.',
          data: null
        });
    }
    res.status(200).json({
      err: null,
      msg: 'User retrieved successfully.',
      data: user
    });
  });
};

module.exports.updateUser = function (req, res, next) {

  if (req.decodedToken.user._id != req.params.userId) {
    return res.status(401).json({
      err: null,
      msg: 'Not authorized.',
      data: null
    });
  }
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }
  delete req.body.role;
  delete req.body.joinedAt;
  delete req.body.password;
  delete req.body.isVerified;
  delete req.body.isReviewed;

  let valid = req.body.name
    && req.body.name.firstName
    && req.body.name.lastName
    && Validations.isString(req.body.name.firstName)
    && Validations.isString(req.body.name.lastName);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Name cannot be empty!',
      data: null
    });
  }
  if (!(/^[a-zA-Z]+$/.test(req.body.name.firstName) && /^[a-zA-Z]+$/.test(req.body.name.lastName))) {
    return res.status(422).json({
      err: null,
      msg: 'Name is invalid (only English characters).',
      data: null
    });
  }


  User.findByIdAndUpdate(
    req.params.userId, {
      $set: req.body
    }, {
      new: true
    }
  ).exec(function (err, updateUser) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!updateUser) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'User not found.',
          data: null
        });
    }
    else {
      res.status(200).json({
        err: null,
        msg: 'Information is Updated!',
        data: null
      });
    }
  });
};


module.exports.assignArticleToChild = function (req, res, next) {
  if (!Validations.isObjectId(req.params.childID)) {
    return res.status(422).json({
      err: null,
      msg: 'chidId parameter and article_id parameter must be a valid ObjectId.',
      data: null
    });
  }
  Child.findById(req.params.childID, (err, child) => {
    if (err) {
      return next(err);
    }
    if (!child) {
      return res.status(404).json({
        err: null,
        msg: 'Child was not found.',
        data: null
      });
    }
    if (child.parent_id == req.decodedToken.user._id) {

      if (child.allowedArticles.includes(req.body.articleID)) {
        return res.status(200).json({
          err: null,
          msg: "The child is already assigned",
          data: child.allowedArticles
        });
      }

      child.allowedArticles.push(req.body.articleID);
      child.save(function (err, updatedChild) {
        if (err) {
          return next(err)
        }
        return res.status(200).json({
          err: null,
          msg: "Successfully assigned.",
          data: updatedChild.allowedArticles
        });
      });

    } else {
      return res.status(401).json({
        err: null,
        msg: 'your are not allowed to assign articles for this child',
        data: null
      });
    }

  });

};


//returns all the child's teachers
module.exports.getMyTeachers = function (req, res, next) {
  if (!Validations.isObjectId(req.params.ChildId)) {
    return res.status(422).json({
      err: null,
      msg: 'ChildId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Child.findById(req.params.ChildId).exec(function (err, user) {

    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'child not found.', data: null });
    }


    if (user._id != req.decodedToken.user._id && user.parent_id != req.decodedToken.user._id) {

      return res
        .status(401)
        .json({ err: null, msg: 'you are not authorized to view the teachers', data: null });


    }

    else {
      User.find({
        students: {
          $eq: req.params.ChildId
        }
      }).exec(function (err, teachers) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          err: null,
          msg: 'Requests received successfully.!',
          data: teachers

        });
      });
    }

  });

};


//returns all the teacher's students
module.exports.getMyStudents = function (req, res, next) {
  if (req.decodedToken.user.role !== 'Teacher') {
    return res.status(401).json({
      err: null,
      msg: 'You must be a teacher to perform this action.',
      data: null
    });
  }

  User.findById(req.decodedToken.user._id).populate({
    path: 'students',
    select: 'name photo _id',
    model: Child
  }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    ;
    res.status(200).json({
      err: null,
      msg: 'Children successfully retrieved.',
      data: result.students
    });


  })
};

module.exports.addStudent = function (req, res, next) {
  if (!Validations.isObjectId(req.params.childId)) {
    return res.status(422).json({
      err: null,
      msg: 'User parameter must be a valid ObjectId.',
      data: null
    });
  }
  else {
    Child.findById(req.params.childId).exec(function (err, child) {

      if (err) {
        return next(err);
      }
      if (!child) {
        return res
          .status(404)
          .json({ err: null, msg: 'child not found.', data: null });
      }
      else {
        Request.findOne({
          recievingTeacherId: req.decodedToken.user._id,
          childId: req.params.childId
        }, function (err, retrievedRequests) {
          if (err) {
            return next(err);
          }
          if (!retrievedRequests) {
            return res.status(422).json({
              err: null,
              msg:
                'you need a request from the parent to add this child',
              data: null
            });
          }
          else {
            User.findById(req.decodedToken.user._id).exec(function (err, user) {
              if (err) {
                return next(err);
              }
              if (!user) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'child not found.', data: null });
              }
              else {
                user.students.push(req.params.childId);
                user.save(function (err) {
                  if (err) {
                    return next(err);
                  }
                  res.status(200).json({
                    err: null,
                    msg: 'child added successfully.',
                    data: user.students
                  });

                });
              }
            });
          }
        });
      }
    });

  }
};

//start yasmeen
//teacher view sessions
module.exports.viewSessions = function (req, res, next) {

  User.findById(req.decodedToken.user._id).exec(function (err, user) {


    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    res.status(200).json({
      err: null,
      msg: 'Sessions retrieved successfully.',
      data: user.sessions
    });
  });
};
//teacher add session
module.exports.addSession = function (req, res, next) {
  if (req.decodedToken.user.role === 'Child') {
    return res.status(401).json({
      err: null,
      msg: "You don't have permissions to post (child account)",
      data: null
    });
  }
  var valid =
    req.body.title && Validations.isString(req.body.title) &&
    req.body.grade && Validations.isString(req.body.grade) &&
    req.body.location && Validations.isString(req.body.location) &&
    req.body.startDate &&
    req.body.endDate
  req.body.fees && Validations.isNumber(req.body.fees);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'please provide all the fields.',
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
    var newSession = user.sessions.create(req.body);
    user.sessions.push(newSession);
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Session was created successfully.',
        data: newSession
      });
    });
  });
};
//teacher delete session
module.exports.deleteSession = function (req, res, next) {
  if (!Validations.isObjectId(req.params.sessionId)) {
    return res.status(422).json({
      err: null,
      msg: 'sessionId parameter must be a valid ObjectId.',
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
    var session = user.sessions.id(req.params.sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ err: null, msg: 'Session not found.', data: null });
    }
    session.remove();
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Session was deleted successfully.',
        data: session
      });
    });
  });
};

////teacher update session
module.exports.updateSession = function (req, res, next) {
  if (!Validations.isObjectId(req.params.sessionId)) {
    return res.status(422).json({
      err: null,
      msg: 'sessionId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.title && Validations.isString(req.body.title) &&
    req.body.grade && Validations.isString(req.body.grade) &&
    req.body.location && Validations.isString(req.body.location) &&
    req.body.startDate &&
    req.body.endDate
  req.body.fees && Validations.isNumber(req.body.fees);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'please provide all the fields.',
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
    var session = user.sessions.id(req.params.sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ err: null, msg: 'Session not found.', data: null });
    }
    session.title = req.body.title;
    session.grade = req.body.grade;
    session.location = req.body.location;
    session.startDate = req.body.startDate;
    session.endDate = req.body.endDate;
    session.fees = req.body.fees;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Session was updated successfully.',
        data: session
      });
    });
  });
};
// create verifiecation form
module.exports.createVerificationForm = function (req, res, next) {

  if (req.decodedToken.user.role === 'Child') {
    return res.status(401).json({
      err: null,
      msg: "You don't have permissions to post (child account)",
      data: null
    });
  }
  var valid =
    req.body.contactEmail && Validations.isString(req.body.contactEmail) &&
    req.body.contactNumber && Validations.isString(req.body.contactNumber);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'contactEmail(String) and contactNumber(String) are required fields.',
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
    if (user.isVerified == true) {
      return res.status(403).json({
        err: null,
        msg: "You are already a verified user",
        data: null
      });
    }
    Verification.find({ owner_id: req.decodedToken.user._id }).exec(function (err, checkForm) {
      if (err) {
        return next(err);
      }
      if (checkForm.length == 0) {
        let form = {
          owner_id: req.decodedToken.user._id,
          contactEmail: req.body.contactEmail,
          contactNumber: req.body.contactNumber,
          firstName: req.decodedToken.user.name.firstName,
          lastName: req.decodedToken.user.name.lastName
        };
        Verification.create(form, (err, newform) => {
          if (err) {
            console.log(err)
            return next(err);
          }
          res.status(201).json({
            err: null,
            msg: 'Verification Form created successfully.',
            data: newform.toObject()
          });
        });
      } else {
        return res
          .status(422)
          .json({
            err: null,
            msg: 'You already applied for verification (still in reviewing process)',
            data: null
          });
      }
    });
  });
};

//view verification forms
module.exports.viewVerificationForms = function (req, res, next) {
  Verification.find({}).exec(function (err, forms) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Verification Forms retrieved successfully.',
      data: forms
    });
  });
};
//delete verification form
module.exports.deleteVerificationForm = function (req, res, next) {
  if (!Validations.isObjectId(req.params.id)) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid ID provided.',
      data: null
    });
  }
  if (req.decodedToken.user._id) {
    Verification.findById(req.params.id, (err, form) => {
      if (err) {
        return next(err);
      }
      if (!form) {
        return res.status(404).json({
          err: null,
          msg: 'Verification Form was not found.',
          data: null
        });
      }

      Verification.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
          return next(err);
        }
        if (!result) {
          return res.status(404).json({
            err: null,
            msg: 'Verification Form was not found.',
            data: null
          });
        }
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          err: null,
          msg: 'Verification Form deleted successfully.',
          data: result
        });
      });
    });
  }
};
//verify user
module.exports.verifyUser = function (req, res, next) {

  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findByIdAndUpdate(req.params.userId,
    {
      $set: { isVerified: true },
    },
    { new: true }
  ).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User verified successfully.',
      data: null
    });

  });
};

module.exports.getMyChildren = function (req, res, next) {
  if (req.decodedToken.user.role != 'Parent') {
    return res.status(401).json({
      error: null,
      msg: 'You have to be a parent to access your children!',
      data: null
    });
  }

  Child.find({
    parent_id: { $eq: req.decodedToken.user._id }
  }, '_id name',
    (err, result) => {
      if (err) {
        return next(err);
      }
    }).exec(function (err, children) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'children retrieved successfully.',
        data: children
      });
    });
};
//verify activity
module.exports.verifyActivity = function (req, res, next) {


  if (!Validations.isObjectId(req.params.activityId)) {
    return res.status(422).json({
      err: null,
      msg: 'activityId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Activity.findByIdAndUpdate(req.params.activityId,
    {
      $set: { isVerified: true },
      $currentDate: { updated_at: true }
    },
    { new: true }
  ).exec(function (err, activity) {
    if (err) {
      return next(err);
    }
    if (!activity) {
      return res
        .status(404)
        .json({ err: null, msg: 'Activity not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Activity verified successfully.',
      data: null
    });

  });
};

//delete activity upon admin rejection
module.exports.rejectActivity = function (req, res, next) {
  if (!Validations.isObjectId(req.params.activityId)) {
    return res.status(422).json({
      err: null,
      msg: 'Activity id must be a valid object id',
      data: null
    });
  }
  if (req.decodedToken.user._id) {
    Activity.findById(req.params.activityId, (err, retrievedActivity) => {
      if (err) {
        return next(err);
      }
      if (!retrievedActivity) {
        return res.status(404).json({
          err: null,
          msg: 'Activity was not found.',
          data: null
        });
      }
      Activity.findByIdAndRemove(req.params.activityId, (err, result) => {
        if (err) {
          return next(err);
        }
        if (!result) {
          return res.status(404).json({
            err: null,
            msg: 'Activity was not found.',
            data: null
          });
        }

        return res.status(200).json({
          err: null,
          msg: 'Activity rejected and deleted successfully.',
          data: result
        });
      });
    });

  }
};
//Admin view all admins
module.exports.viewAdmins = function (req, res, next) {
  User.find({ role: 'Admin' }).exec(function (err, admins) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Admins retrieved successfully.',
      data: admins
    });
  });
};



module.exports.getParent = function (req, res, next) {


  User.findById(req.params.parentId).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Parent retrieved successfully.',
      data: user
    });

  });

};

module.exports.contactUs = function (req, res, next) {
  if (!req.body.email || !req.body.name || !req.body.message) {
    return res.status(422).json({
      err: null,
      msg: 'Information missing',
      data: null
    });
  }
  let body = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  };
  Contact.create(body, (err, createdContact) => {
    if (err) return next(err);
    return res.status(200).json({
      err: null,
      msg: 'Message recorded successfully.',
      data: createdContact
    });
  });
}