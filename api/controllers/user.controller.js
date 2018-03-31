var mongoose = require('mongoose'),
    Child = mongoose.model('Child'),
    Validations = require('../utils/validations'),
    User = mongoose.model('User');
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
  var valid =
    req.body.about &&
    Validations.isString(req.body.about) &&
    req.body.address&&
    req.body.address.city &&
    Validations.isString(req.body.adress.city) &&
    req.body.address.street &&
    Validations.isString(req. address.street) &&
    req.body.address.state &&
    Validations.isString(req.body.address.state) &&
    req.body.address.zip &&
    Validations.isNumber(req.body.address.zip) &&
    req.body.name&&
    req.body.name.firstName &&
    Validations.isString(req.body.name.firstName) &&
    req.body.name.lastName &&
    Validations.isString(req.body.name.lastName) &&
    req.body.phone&&
    Validations.isString(req.body.phone)&&
    req.body.fees &&
    Validations.isNumber(req.body.fees);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) , fees(Number) ,address(address) and about(String) are required fields.',
      data: null
    });
  }

  console.log("HIIIIIII");
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function (err, updateUser) {
    console.log(updateUser);
    if (err) {
      // console.log(err)
      return next(err);
    }
    if (!updateUser) {
      console.log("HIIIIIII222");
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
