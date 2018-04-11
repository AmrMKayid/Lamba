var mongoose = require('mongoose'),
  	moment = require('moment'),
  	Validations = require('../utils/validations'),
 	User = mongoose.model('User'),
 	Item = mongoose.model('Item');
	jwt = require('jsonwebtoken');
	mw = require('../routes/middlewares'),
 	path = require('path'),
	User = mongoose.model('User');
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
    likes: 0,
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
        err: err,
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
    return res.status(200).json({
      err: null,
      msg: "Items retrieved successfully",
      data: items
    });
  })

}


module.exports.getItemsById = function(req, res, next) {
  const authorization = req.headers.authorization;
  const secret = req.app.get('secret');
  decoded = jwt.verify(authorization, secret);
  console.log( decoded.user._id )
  Item.find({seller_id: decoded.user._id}).exec(function(err, Items) {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      err: null,
      msg: 'finished successfully',
      data: Items
    });
  });

  }



module.exports.editItems = function(req, res, next) {
  var valid =  req.body.name && Validations.isString(req.body.name) &&
     req.body.description && Validations.isString(req.body.description) &&
     req.body.quantity && Number.isInteger(req.body.quantity) &&
     req.body.price &&  isNumber(req.body.price) && req.body.item_type &&
     Validations.isString(req.body.item_type) &&
     req.body.picture_url &&   Validations.isString(req.body.picture_url);

  if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'Updated fields must have a valid type',
        data: null
      });
    }
    req.body.updatedAt = moment().toDate();

    Item.findByIdAndEdit(
      req.params.itemId,
      {
        $set: req.body
      },
      { new: true }
    ).exec(function (err, updatedProduct) {
      if (err) {
        return next(err);
      }
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ err: null, msg: 'Update Failed', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'Product was updated successfully.',
        data: updatedProduct
      });
    });

  // console.log("edit\n");
};


module.exports.deleteItems = function(req, res, next) {

    Item.findByIdAndRemove(req.params.itemId).exec(function (
      err,
      deletedProduct
    ) {
      if (err) {
        return next(err);
      }
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ err: null, msg: 'Delete failed', data: null });
      }
      fs.unlink(path.resolve('api/uploads/' + deletedProduct.picture_url));
      res.status(200).json({
        err: null,
        msg: 'Scuccess',
        data: deletedProduct
      });
    });
  };


module.exports.likeItems = function(req, res, next) {
  let user = req.decodedToken.user._id;

  Item.findByID(
    req.params.itemId,
    (err,retrievedItem) =>{
      if (err) {
        return next(err);
      }
    if(retrievedItem.likes_user_id.includes(user)){
      return res.status(422).json({
        err: null,
        msg: "Item already liked",
        data: null
      });
    }
    else{
      retrievedItem.likes_user_id.push(user);
      retrievedItem.likes = retrievedItem.likes +1; }


      return res.status(200).json({
        err: null,
        msg: 'Item was liked successfully.',
        data: retrievedItem
      });

  });

}

module.exports.unlikeItems = function(req, res, next) {
  let user = req.decodedToken.user._id;

  Item.findById(
    req.params.itemId,
    (err,retrievedItem) =>{
      if (err) {
        return next(err);
      }
    if(!retrievedItem.likes_user_id.includes(user)){
      return res.status(422).json({
        err: null,
        msg: "cannot unlike",
        data: null
      });
    }
    else{
      retrievedItem.likes_user_id.pop(user);
      retrievedItem.likes =retrievedItem.likes- 1; }


      return res.status(200).json({
        err: null,
        msg: 'Item was unliked.',
        data: retrievedItem
      });

  });

}

module.exports.countItmes = function(req, res, next) {

  Item.count({}, function(err, count) {

    if (err) return err;
    return res.status(200).json({
      err: null,
      msg: "Items' count retrieved successfully",
      data: count
    });
  });
}

/**
  * sends an image for the item
  */
module.exports.getImage = function(req, res, next) {

	return res.status(200).sendFile(path.resolve('api/uploads/' + req.params.filename));

}


/**
  * sends an image for the item
  */
module.exports.getItem = function(req, res, next) {

	if(!req.params.itemId)
	{
		  return res.status(422).json({
			  err: 'Empty id field',
			  msg: 'You have to provide an Item Id',
			  data: null
		  });
	}
	
	Item.findById(req.params.itemId, function(err,retrievedItem){
		  if (err) {
				 return res.status(404).json({
				  err: 'Retrieved 0 items from the database',
				  msg: 'Error while retrieving item from the database',
				  data: null
			  });
		  }

		 if(!retrievedItem)
		 {
			 return res.status(404).json({
				  err: 'Retrieved 0 items from the database',
				  msg: 'Error while retrieving item from the database',
				  data: null
			  });
		 }
			
		  const authorization = req.headers.authorization;
		  const secret = req.app.get('secret');
		  decoded = jwt.verify(authorization, secret);
		  var user_id = decoded.user._id;
		  User.findById(retrievedItem.seller_id, function(err, retrievedUser){
				 if (err)
				 {
					 return res.status(404).json({
					  err: 'Retrieved 0 items from the database',
					  msg: 'Error while retrieving item from the database',
					  data: null
				  });
		 	 	}

				 if(!retrievedUser)
				 {
					 return res.status(404).json({
						  err: 'Retrieved 0 items from the database',
						  msg: 'Error while retrieving item from the database',
						  data: null
					  });
				 }
			 var seller = {

							email: retrievedUser.email,
							name: retrievedUser.name,
							phone: retrievedUser.phone,
							_id: retrievedUser._id
							};
			 return res.status(200).json({
				  err: null,
				  msg: 'Retrieved 1 item',
				  data: retrievedItem,
				  owner: retrievedItem.seller_id == user_id,
				  seller: seller
			  });
		 });
		
		
	});

}





/*****************************************************************************
 *																			                                     *
 *                          private functions								                 *
 *																			                                     *
 *****************************************************************************/

/**
 * Object -> Promise -> Boolean
 * returns a promise that has a boolean
 */
async function userExists(key) {
  const user = await User.findOne(key).exec();

}
