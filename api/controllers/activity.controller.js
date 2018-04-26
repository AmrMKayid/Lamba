var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Activity = mongoose.model('Activity');
jwt = require('jsonwebtoken');
mw = require('../routes/middlewares'),
  path = require('path'),
  User = mongoose.model('User');
fs = require('fs');


module.exports.createActivities = async function(req, res, next) {

  // checks validity of fields
  var valid = req.body.name && Validations.isString(req.body.name) &&
    req.body.description && Validations.isString(req.body.description) &&
    req.body.place && Validations.isString(req.body.place) &&
    req.body.price && typeof req.body.price == "number" &&
    req.body.activity_type && Validations.isString(req.body.activity_type) &&
    req.body.picture_url && Validations.isString(req.body.picture_url);
  // error if not valid
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'One or More field(s) is missing or of incorrect type',
      data: null
    });
  }




  // gets the logged in user id
  const authorization = req.headers.authorization;
  const secret = req.app.get('secret');
  decoded = jwt.verify(authorization, secret);
  var user_id = decoded.user._id;
  var isVerified = decoded.user.isVerified;
  if (!isVerified) {
    return res.status(422).json({
      err: null,
      msg: 'not verified',
      data: null
    });
  }

  activity = {
    name: req.body.name,
    description: req.body.description,
    place: req.body.place,
    price: req.body.price,
    going_user_id: [],
    comments: [],
    activity_type: req.body.activity_type,
    picture_url: req.body.picture_url,
    host_id: user_id,
    host_firstName: decoded.user.name.firstName,
    host_lastName: decoded.user.name.lastName,
    isVerified: false,
    created_at: Date.now(),
    updated_at: Date.now()
  };
  // inserts the new object in the database
  Activity.create(activity, function(err, newActivity) {
    if (err) {
      return res.status(422).json({
        err: err,
        msg: "Couldn't create activity",
        data: null
      });
    }
    return res.status(200).json({
      err: null,
      msg: "Created activity successfully",
      data: newActivity
    });

  });

}


// uploads a photo
module.exports.uploadActivityPhoto = function(req, res, next) {
  if (!req.file) {
    return res.status(422).json({
      err: null,
      msg: "Couldn't upload image",
      data: null
    });
  }
  var token = req.headers['authorization'];
  if (!token) {
    fs.unlink(req.file.path);
    return res.status(401).json({
      error: null,
      msg: 'You have to login first!',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
    if (err) {

      fs.unlink(req.file.path);
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null
      });
    }
    return res.status(200).json({
      err: null,
      msg: "Created activity successfully",
      filename: req.file.filename
    });
  });
}

// retrieves a collection of tuples based on the paramaters
module.exports.viewActivities = function(req, res, next) {

  // var valid = Validations.isNumber(req.params.tuplesPerPage) &&
  //   Validations.isNumber(req.params.pageNumber) &&
  //   parseInt(req.params.tuplesPerPage) <= 20;
  //
  // // returns error if not valid
  // if (!valid) {
  //   return res.status(422).json({
  //     err: null,
  //     msg: 'One or More field(s) is missing or of incorrect type',
  //     data: null
  //   });
  // }


  // var limit = parseInt(req.params.tuplesPerPage);
  // var pageNumber = parseInt(req.params.pageNumber);


  var query = Activity.find({
    isVerified: true
  });

  // .skip((pageNumber - 1) * limit).limit(limit);

  query.exec(function(err, activities) {
    if (err) return err;
    return res.status(200).json({
      err: null,
      msg: "Activities retrieved successfully",
      data: activities
    });
  })

}


module.exports.getActivitiesById = function(req, res, next) {
  console.log("get in controller");
  const authorization = req.headers.authorization;
  const secret = req.app.get('secret');
  decoded = jwt.verify(authorization, secret);
  Activity.find({
    host_id: decoded.user._id
  }).exec(function(err, Activities) {
    if (err) {
      console.log(err)
    }
    return res.status(200).json({
      err: null,
      msg: 'finished successfully',
      data: Activities
    });
  });

}


module.exports.getThisActivity = function(req, res, next) {

  var id = req.params.Id;
  Activity.find({
    _id: id
  }).exec(function(err, Activities) {
    if (err) {
      console.log(err)
    }
    return res.status(200).json({
      err: null,
      msg: 'finished successfully',
      data: Activities
    });
  });

}


module.exports.editActivities = function(req, res, next) {

  req.body.updatedAt = moment().toDate();

  Activity.findByIdAndUpdate(
    req.params.activityId, {
      $set: req.body
    }, {
      new: true
    }
  ).exec(function(err, updatedActivity) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Activity was updated successfully.',
      data: updatedActivity
    });
  });

};


module.exports.deleteActivities = function(req, res, next) {

  Activity.findByIdAndRemove(req.params.activityId).exec(function(err,
    deletedActivity) {
    if (err) {
      return next(err);
    }
    if (!deletedActivity) {
      return res
        .status(404)
        .json({
          err: null,
          msg: 'Delete failed',
          data: null
        });
    }
    fs.unlink(path.resolve('api/uploads/' + deletedActivity.picture_url));
    res.status(200).json({
      err: null,
      msg: 'Scuccess',
      data: deletedActivity
    });
  });
};


module.exports.goingActivities = function(req, res, next) {


  const authorization = req.headers.authorization;
  const secret = req.app.get('secret');
  decoded = jwt.verify(authorization, secret);
  var user_id = decoded.user._id;

  Activity.findById(req.body._id, function(err, retrievedActivity) {

    if (retrievedActivity.going_user_id.includes(user_id) || err) {
      return res.status(422).json({
        err: null,
        msg: "Already going to activity",
        data: null
      });
    }

    retrievedActivity.going_user_id.push(user_id);

    Activity.findByIdAndUpdate(retrievedActivity._id, retrievedActivity, function(err, activity) {
      // console.log(activity);
      return res.status(200).json({
        err: null,
        msg: 'Activity going successfully.',
        data: activity
      });
    });


  });

}




module.exports.countActivities = function(req, res, next) {
  console.log("Mayar...controller");

  Activity.count({}, function(err, count) {

    if (err) return err;
    return res.status(200).json({
      err: null,
      msg: "Activities count retrieved successfully",
      data: count
    });
  });
}

/**
 * sends an image for the activity
 */
module.exports.getImage = function(req, res, next) {

  return res.status(200).sendFile(path.resolve('api/uploads/' + req.params.filename));

}


module.exports.getActivity = function(req, res, next) {

  if (!req.params.activityId) {
    return res.status(422).json({
      err: 'Empty id field',
      msg: 'You have to provide an activity Id',
      data: null
    });
  }

  Activity.findById(req.params.activityId, function(err, retrievedActivity) {
    if (err) {
      return res.status(404).json({
        err: 'Retrieved 0 activity from the database',
        msg: 'Error while retrieving activity from the database',
        data: null
      });
    }

    if (!retrievedActivity) {
      return res.status(404).json({
        err: 'Retrieved 0 activity from the database',
        msg: 'No record was found in the database',
        data: null
      });
    }

    const authorization = req.headers.authorization;
    const secret = req.app.get('secret');
    decoded = jwt.verify(authorization, secret);
    var user_id = decoded.user._id;
    User.findById(retrievedActivity.host_id, function(err, retrievedUser) {
      if (err) {
        return res.status(404).json({
          err: 'Retrieved 0 activity from the database',
          msg: 'Error while retrieving activity from the database',
          data: null
        });
      }

      if (!retrievedUser) {
        return res.status(404).json({
          err: 'Retrieved 0 activities from the database',
          msg: 'Error while retrieving activity from the database',
          data: null
        });
      }
      if (!retrievedActivity.isVerified) {
        return res.status(404).json({
          err: "Item Not Found",
          msg: "The item you are looking for was not found",
          data: null
        });
      }
      var host = {

        email: retrievedUser.email,
        name: retrievedUser.name,
        phone: retrievedUser.phone,
        _id: retrievedUser._id
      };
      return res.status(200).json({
        err: null,
        msg: 'Retrieved 1 activity',
        data: retrievedActivity,
        owner: retrievedActivity.host_id == user_id,
        host: host
      });
    });


  });

}

module.exports.viewUnverifiedActivities = function(req, res, next) {


  Activity.find({
    isVerified: false
  }, function(err, Activity) {
    if (err) {
      return res.status(404).json({
        err: 'Retrieved 0 activity from the database',
        msg: 'Error while retrieving activity from the database',
        data: null
      });

    }

    if (!Activity) {
      return res.status(404).json({
        err: 'Retrieved 0 activities from the database',
        msg: 'Error while retrieving activity from the database',
        data: null
      });
    }
    return res.status(200).json({
      err: null,
      msg: 'Retrieved unverified activities',
      data: Activity
    });


  });
}

module.exports.registerChild = function(req, res, next) {
  var valid = req.body.activityID && Validations.isString(req.body.activityID) &&
    req.body.childId && Validations.isString(req.body.childId);


  // error if not valid
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Invalid Post paramaters',
      data: null
    });
  }

  let activityId = req.body.activityID;
  let childId = req.body.childId;

  Activity.findById(activityId).exec((err, activity) => {
    if (err) {
      return res.status(422).json({
        err: null,
        msg: 'Invalid Activity',
        data: null
      });
    }


    User.findById(childId).exec((err, child) => {
      if (err) {
        return res.status(422).json({
          err: null,
          msg: 'Invalid Child',
          data: null
        });
      }

      if (activity.going_user_id.includes(childId)) {
        return res.status(422).json({
          err: null,
          msg: 'Child is already registered for this activity',
          data: null
        });
      }

      activity.going_user_id.push(childId);

      Activity.findByIdAndUpdate(
        activityId, {
          $set: activity
        }, {
          new: true
        }
      ).exec(function(err, updatedActivity) {
        if (err) {
          return next(err);
        }
        if (!updatedActivity) {
          return res
            .status(404)
            .json({
              err: null,
              msg: 'Registering Child Failed',
              data: null
            });
        }

        return res.status(200).json({
          err: null,
          msg: 'Registered child successfully!',
          data: activity.going_user_id
        });

      });


    });

  });

}



module.exports.addComment = function(req, res, next) {
  /*TODO: Abdelkareem*/

  /*Comment =  {
  	commment: "assaf",
  	user_id:  user_id,
  	created_at: timestapm
  	updated_at

  };*/

}

async function userExists(key) {
  const user = await User.findOne(key).exec();

}
