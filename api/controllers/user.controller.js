var mongoose = require('mongoose'),
  Child = mongoose.model('Child'),
  User = mongoose.model('User'),
  Validations = require('../utils/validations'),
  Article = mongoose.model('Article'),
  Verification = mongoose.model('Verification');

module.exports.getAllUsers = function (req, res, next) {
  User.find({ $or: [{ role: 'Parent' }, { role: 'Teacher' }] }).exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Users retrieved successfully.',
      data: users
    });
  });
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
  if (!Validations.isObjectId(req.params.childID)) {
    return res.status(422).json({
      err: null,
      msg: 'childID parameter must be a valid ObjectId.',
      data: null
    });
  }
  Child.findById(req.params.childID).exec(function (err, child) {
    if (err) {
      return next(err);
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


module.exports.getPendingTeachers = function (req, res, next) {
  User.find({
    isVerified: {
      $eq: false
    },
    role: {
      $eq: "Teacher"
    }
  }).exec(function (err, requests) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:
        'New Teachers Requests successfully.',
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
    req.params.teacherID,
    {
      $set: { isVerified: true }
    },
    { new: true }
  ).exec(function (err, teacher) {
    if (err) {
      return next(err);
    }
    if (!teacher) {
      return res
        .status(404)
        .json({ err: null, msg: 'Teacher not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Teacher was verified successfully.',
      data: teacher
    });
  });
};

//Start yasmeen
//Show Articles needed to be verified
module.exports.viewUnverifiedArticles = function (req, res, next) {
  Article.find({ approved: false }).exec(function (err, articles) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Unverified Articles retrieved successfully.',
      data: articles
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
  Article.findByIdAndUpdate(req.params.articleId,
    {
      $set: { approved: true },
      $currentDate: { updatedAt: true }
    },
    { new: true }
  ).exec(function (err, article) {
    if (err) {
      return next(err);
    }
    if (!article) {
      return res
        .status(404)
        .json({ err: null, msg: 'Article not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Article verified successfully.',
      data: null
    });

  });
};

//To Do (IF Admin doesn't like article and doesn't want to verify it)
module.exports.getUserInfo = function (req, res, next) {
  console.log(req.body)
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
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User retrieved successfully.',
      data: user
    });
  });
};
module.exports.updateUser = function (req, res, next) {
  if (!Validations.isObjectId(req.params.userId)) {
    return res.status(422).json({
      err: null,
      msg: 'userId parameter must be a valid ObjectId.',
      data: null
    });
  }
 
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function (err, updateUser) {
    console.log(updateUser);
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!updateUser) {
      //  console.log("HIIIIIII222");
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User was updated successfully.',
      data: updateUser
    });
  });
};
//teacher view sessions
module.exports.viewSessions= function (req, res, next) {

User.findById(req.decodedToken.user._id).exec(function(err, user) {


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
module.exports.addSession=function(req,res,next){
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
    req.body.fees && Validations.isNumber(req.body.fees) ;

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
  user.save(function(err) {
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
module.exports.deleteSession=function(req,res,next){
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
  user.save(function(err) {
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
module.exports.updateSession=function(req,res,next){
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
  req.body.fees && Validations.isNumber(req.body.fees) ;

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
session.title=req.body.title;
session.grade=req.body.grade;
session.location=req.body.location;
session.startDate=req.body.startDate;
session.endDate=req.body.endDate;
session.fees=req.body.fees;
user.save(function(err) {
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
module.exports.createVerificationForm=function (req, res, next) {

  if (req.decodedToken.user.role === 'Child') {
      return res.status(401).json({
          err: null,
          msg: "You don't have permissions to post (child account)",
          data: null
      });
  }
  if (req.decodedToken.user.isVerified== true){
    return res.status(403).json({
           err:null,
           msg: "You are already a verified user",
           data:null
    });
  }
  var valid =
      req.body.owner_id && Validations.isString(req.body.owner_id) &&
      req.body.contactEmail && Validations.isString(req.body.contactEmail)&&
      req.body.contactNumber && Validations.isString(req.body.contactNumber)
      req.body.firstName && Validations.isString(req.body.firstName)&&
      req.body.lastName && Validations.isString(req.body.lastName);
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
        Verification.find({owner_id:req.decodedToken.user._id}).exec(function(err,checkForm){
    if (err) {
      return next(err);
  }
  if (checkForm.length==0) {
          let form = {
              owner_id: req.decodedToken.user._id,
              contactEmail:req.body.contactEmail,
             contactNumber:req.body.contactNumber,
              firstName:req.decodedToken.user.name.firstName,
              lastName:req.decodedToken.user.name.lastName
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
        }else{
          console.log(checkForm);
          return res
          .status(422)
          .json({ err: null, msg: 'You already applied for verification (still in reviewing process)', data: null }); 
        }
      });
      });
};

//view verification forms
module.exports.viewVerificationForms = function (req, res, next) {
  Verification.find({ }).exec(function (err, forms) {
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
module.exports.deleteVerificationForm =function (req, res, next) {
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