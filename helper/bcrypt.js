var bcrypt = require("bcryptjs");

function encrypt(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

function decrypt(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword); // true
}

module.exports = { encrypt, decrypt };
