var bcrypt = require('bcryptjs');

// Function that takes a plain text string and returns a salt-hash encrypted string
module.exports.hashPassword = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return callback(err, null);
    }
    bcrypt.hash(password, salt, function(err, hash) {
      callback(err, hash);
    });
  });
};

// Function that takes a plain text string and a salt-hash, and checks if they match after encryption
module.exports.comparePasswordToHash = function(
  candidatePassword,
  hash,
  callback
) {
  bcrypt.compare(candidatePassword, hash, function(err, matches) {
    callback(err, matches);
  });
};
