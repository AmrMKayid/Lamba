var mongoose = require('mongoose'),
Report = mongoose.model('Report');

module.exports.newReport = function(req, res, next) {
    Report.create(req.body, function(err, report) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Report was created successfully.',
        data: report
      });
    });
};

module.exports.getReports = function(req,res,next){
    Report.find({
        isClosed: {
            $eq: false
          }
    }).exec(function(err, report) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg:'Report recieved successfully.',
        data: report        
      });
    });
};

module.exports.closeReport = function(req,res,next){
    Report.findByIdAndUpdate(
        req.params.reportId, {
          $set: req.body
        }, {
          new: true
        }
      ).exec(function(err, report) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg:'Report edited successfully.',
        data: report
      });
    });
};