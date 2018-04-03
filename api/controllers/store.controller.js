var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Item = mongoose.model('Item');
  jwt = require('jsonwebtoken');
  mw = require('../routes/middlewares'),
  fs = require('fs');




module.exports.createItems = async function(req, res, next) {

  // checks for the validity of all the required fields
  var valid = req.body.name && Validations.isString(req.body.name) &&
    req.body.description && Validations.isString(req.body.description) &&
    req.body.quantity && Number.isInteger(req.body.quantity) &&
    req.body.price && typeof req.body.price == "number" &&
    req.body.item_type && Validations.isString(req.body.item_type) &&
    req.body.picture_url && Validations.isString(req.body.picture_url);
  // returns error if not valid
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

  // Creates the new item object
  item = {
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    likes_user_id: [],
    buyers_id: [],
    item_type: req.body.item_type,
    item_condition: req.body.item_condition == undefined ? null : req.body.item_condition,
    picture_url: req.body.picture_url,
    seller_id: user_id,
    created_at: Date.now(),
    updated_at: Date.now()
  };
  // inserts the new object in the database
  Item.create(item, function(err, newItem) {
    if (err) {
      return res.status(422).json({
        err: null,
        msg: "Couldn't create item",
        data: null
      });
    }
    return res.status(200).json({
      err: null,
      msg: "Created Item successfully",
      data: newItem
    });

  });

}


// uploads a photo
module.exports.uploadItemPhoto = function(req, res, next) {
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
      msg: "Created Item successfully",
      filename: req.file.filename
    });

  });

  // Use the mv() method to place the file somewhere on your serve
}

// retrieves a collection of tuples based on the paramaters
module.exports.viewItems = function(req, res, next) {

  var valid = Validations.isNumber(req.params.tuplesPerPage) &&
    Validations.isNumber(req.params.pageNumber) &&
    parseInt(req.params.tuplesPerPage) <= 20;

  // returns error if not valid
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'One or More field(s) is missing or of incorrect type',
      data: null
    });
  }

  var limit = parseInt(req.params.tuplesPerPage);
  var pageNumber = parseInt(req.params.pageNumber);



  var query = Item.find().skip((pageNumber - 1) * limit).limit(limit);

  query.exec(function(err, items) {
    if (err) return err;
    console.log(items);
    return res.status(200).json({
      err: null,
      msg: "Items retrieved successfully",
      data: items
    });
  })

}



module.exports.editItems = function(req, res, next) {

  console.log("edit\n");
}



module.exports.deleteItems = function(req, res, next) {

  console.log("delete\n");
}


module.exports.buyItems = function(req, res, next) {
  console.log("buy\n");

}


module.exports.likeItems = function(req, res, next) {

  console.log("like\n");
}

module.exports.countItmes = function(req, res, next) {
  console.log("Count items");
  Item.count({}, function(err, count) {
    console.log("Total count = " + count);
    if (err) return err;
    return res.status(200).json({
      err: null,
      msg: "Items' count retrieved successfully",
      data: count
    });
  });
}

/*****************************************************************************
 *																			 *
 *                          private functions								 *
 *																			 *
 *****************************************************************************/

/**
 * Object -> Promise -> Boolean
 * returns a promise that has a boolean
 */
async function userExists(key) {
  const user = await User.findOne(key).exec();

}