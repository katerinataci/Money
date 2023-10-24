const jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports.authenticate = (req, res, next) => {
    console.log(req)
  jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET, (err, payload) => {
    if (err) { 
      return res.status(400).json({verified: false});
    } else {
      console.log(payload);
      next();
    }
  });
}