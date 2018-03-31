var mongoose = require('mongoose'),
    Child = mongoose.model('Child'),
    User = mongoose.model('User');




    module.exports.getPendingTeachers = function(req, res, next) {
        User.find({
            isVerified: {
            $eq: false
          }
        }).exec(function(err, requests) {
          if (err) {
            return next(err);
          }
          res.status(200).json({
            err: null,
            msg:
              'New Teachers Requests retrieved successfully.',
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
            $set: {isVerified : true}
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