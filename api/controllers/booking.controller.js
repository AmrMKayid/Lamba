var mongoose = require('mongoose'),
User = mongoose.model('User'),
Notification = mongoose.model('Notification');

module.exports.getId = function(req, res, next) {
    User.findOne({email: {
            $eq: req.params.email  
          }  
          }).exec(function(err, usr) {
            if (err) {
              return next(err);
            }
          res.status(200).json({
              err: null,
              msg:'Id recieved successfully.',
              data: usr._id         
                
              });
          });
};

module.exports.newNotif = function(req, res, next) {
    Notification.create(req.body, function(err, notif) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Notification was created successfully.',
        data: notif
      });
      console.log(notif)
    });
};

module.exports.getBookings = function(req,res,next){
  Notification.find({
    title: {
      $eq: "New Booking"
    },
    recieving_user_id: {
      $eq: req.decodedToken.user._id
    },
  }).exec(function(err, bookings) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:'Bookings recieved successfully.',
      data: bookings        
    });
  });
};