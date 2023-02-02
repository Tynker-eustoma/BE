const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const compareHash = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

module.exports = { hashPassword, compareHash };
