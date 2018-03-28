var mongoose = require('mongoose'),
  moment = require('moment');

// Helper functions for doing all kind of validations on the request body inputs
module.exports.isString = function(str) {
  return typeof str === 'string';
};

module.exports.isNumber = function(num) {
  return !isNaN(num);
};

module.exports.isBoolean = function(bool) {
  return (
    bool === true ||
    bool === false ||
    toString.call(bool) === '[object Boolean]'
  );
};

module.exports.isDate = function(date) {
  return moment.isDate(date) || moment.isMoment(date);
};

module.exports.isObject = function(obj) {
  return typeof obj === 'object';
};

module.exports.isArray = function(arr) {
  return Array.isArray(arr);
};

module.exports.isObjectId = function(id) {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports.matchesRegex = function(str, regex) {
  return regex.test(str);
};
