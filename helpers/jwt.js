const jwt = require("jsonwebtoken");
const Favorite = process.env.JWT_SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, Favorite);
};

const verifyToken = (token) => {
  return jwt.verify(token, Favorite);
};

module.exports = { signToken, verifyToken };
