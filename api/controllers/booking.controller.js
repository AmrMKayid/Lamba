var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Notification = mongoose.model('Notification');

module.exports.getId = function (req, res, next) {
  User.findOne({
    email: {
      $eq: req.params.email
    },
    role: {
      $eq: "Teacher"
    }
  }).exec(function (err, usr) {
    if (err) {
      return next(err);
    }
    if (!usr) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Id recieved successfully.',
      data: usr._id

    });
  });
};

module.exports.newNotif = function (req, res, next) {
  User.findById(req.body.recieving_user_id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'User was not found.',
        data: null
      });
    }
    Notification.create(req.body, function (err, notif) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Notification was created successfully.',
        data: notif
      });
    });
  });

};

module.exports.getBookings = function (req, res, next) {
  Notification.find({
    title: {
      $eq: "New Booking"
    },
    recieving_user_id: {
      $eq: req.decodedToken.user._id
    },
  }).exec(function (err, bookings) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Bookings recieved successfully.',
      data: bookings
    });
  });
};

module.exports.deleteNotif = function (req, res, next) {
  Notification.findOneAndRemove({
    description: {
      $eq: req.params.description
    }
  }).exec(function (err, deleted) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Booking Deleted Successfully.',
      data: deleted
    });
  });
};
