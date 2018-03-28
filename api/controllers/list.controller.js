var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User');

module.exports.getLists = function(req, res, next) {
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
      msg: 'Lists retrieved successfully.',
      data: user.lists
    });
  });
};

module.exports.getList = function(req, res, next) {
  if (!Validations.isObjectId(req.params.listId)) {
    return res.status(422).json({
      err: null,
      msg: 'listId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }

    res.status(200).json({
      err: null,
      msg: 'List retrieved successfully.',
      data: list
    });
  });
};

module.exports.createList = function(req, res, next) {
  var valid = req.body.name && Validations.isString(req.body.name);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) is a required field.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    var newListName = req.body.name.trim().toLowerCase();
    var listNameExists = user.lists.some(function(list) {
      return list.name == newListName;
    });
    if (listNameExists) {
      return res.status(409).json({
        err: null,
        msg:
          'A list with the same name "' +
          newListName +
          '" already exists, please try another name.',
        data: null
      });
    }
    // Security Check
    delete req.body.tasks;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    var newList = user.lists.create(req.body);
    user.lists.push(newList);
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'List was created successfully.',
        data: newList
      });
    });
  });
};

module.exports.updateListName = function(req, res, next) {
  if (!Validations.isObjectId(req.params.listId)) {
    return res.status(422).json({
      err: null,
      msg: 'listId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid = req.body.name && Validations.isString(req.body.name);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) is a required field.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }

    var newListName = req.body.name.trim().toLowerCase();
    var listNameExists = user.lists.some(function(list) {
      return list.name == newListName && list._id != req.params.listId;
    });
    if (listNameExists) {
      return res.status(409).json({
        err: null,
        msg:
          'A list with the same name "' +
          newListName +
          '" already exists, please try another name.',
        data: null
      });
    }

    list.name = newListName;
    list.updatedAt = moment().toDate();

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'List name was updated successfully.',
        data: list
      });
    });
  });
};

module.exports.createTask = function(req, res, next) {
  if (!Validations.isObjectId(req.params.listId)) {
    return res.status(422).json({
      err: null,
      msg: 'listId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.description &&
    Validations.isString(req.body.description) &&
    (req.body.dueDate ? Validations.isDate(req.body.dueDate) : true);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'description(String) is a required field, dueDate(Date) is optional but has to be a valid date, done(Boolean) is optional but has to be a valid boolean.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }
    // Security Check
    delete req.body.done;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    var task = list.tasks.create(req.body);
    list.tasks.push(task);

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Task was created successfully.',
        data: task
      });
    });
  });
};

module.exports.updateTask = function(req, res, next) {
  if (
    !Validations.isObjectId(req.params.listId) &&
    Validations.isObjectId(req.params.taskId)
  ) {
    return res.status(422).json({
      err: null,
      msg: 'listId and taskId parameters must be valid ObjectIds.',
      data: null
    });
  }
  var valid =
    req.body.description &&
    Validations.isString(req.body.description) &&
    (req.body.dueDate ? Validations.isDate(req.body.dueDate) : true) &&
    (req.body.done ? Validations.isBoolean(req.body.done) : true);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'description(String) is a required field, dueDate(Date) is optional but has to be a valid date, done(Boolean) is optional but has to be a valid boolean.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }

    var task = list.tasks.id(req.params.taskId);
    if (!task) {
      return res
        .status(404)
        .json({ err: null, msg: 'Task not found.', data: null });
    }
    task.description = req.body.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.done = req.body.done !== null ? req.body.done : task.done;
    task.updatedAt = moment().toDate();

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Task was updated successfully.',
        data: task
      });
    });
  });
};

module.exports.deleteTask = function(req, res, next) {
  if (
    !Validations.isObjectId(req.params.listId) &&
    Validations.isObjectId(req.params.taskId)
  ) {
    return res.status(422).json({
      err: null,
      msg: 'listId and taskId parameters must be valid ObjectIds.',
      data: null
    });
  }

  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }

    var task = list.tasks.id(req.params.taskId);
    if (!task) {
      return res
        .status(404)
        .json({ err: null, msg: 'Task not found.', data: null });
    }
    task.remove();

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Task was deleted successfully.',
        data: task
      });
    });
  });
};

module.exports.deleteList = function(req, res, next) {
  if (!Validations.isObjectId(req.params.listId)) {
    return res.status(422).json({
      err: null,
      msg: 'listId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    var list = user.lists.id(req.params.listId);
    if (!list) {
      return res
        .status(404)
        .json({ err: null, msg: 'List not found.', data: null });
    }
    list.remove();
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'List was deleted successfully.',
        data: list
      });
    });
  });
};
