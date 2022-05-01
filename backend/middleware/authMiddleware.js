const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Middleware runs between the HTTP request and response, so you can modify data in the req param
const protect = asyncHandler(async (req, res, next) => {
  //middleware uses next() to move on to next middleware
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") //There is a 'bearer token' with format 'Bearer adflksdjfa(token)'
  ) {
    try {
      /*
     1. Get token from the header
     2. Verify Token
     3. Get user from token
     */

      //Get Token
      token = req.headers.authorization.split(" ")[1]; //Array with [Bearer, adflksdjfa(token)]

      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //returns decoded data (see userController.js, line 46+70)

      //Get User
      req.user = await User.findById(decoded.id).select("-password"); //see first comment for reasoning --> -password excludes the password field

      next(); //move on to the next middleware
    } catch (error) {
      console.log(error);
      res.status(401); //401: not authorized
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Token, not authorized");
  }
});

module.exports = { protect };
