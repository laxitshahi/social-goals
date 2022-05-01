//asyncHandler allows you to use errorHandler instead of try + catch with await
const asyncHandler = require("express-async-handler");
const Goal = require("../models/userModel"); //import Models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

/* @POST
Desc    Regsiter a new user
@route  POST /api/users
@access Public --> You can't access a protected route without being logged in, and you can login in without being registered
*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user already exists
  const userExists = await User.findOne({ email }); //User is the exported name from the 'userModel'

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    //201 status code means OK + resource was created
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //the decoded payload contains the id, generated @, expiration
    });
  } else {
    res.status(500);
    throw new Error("Invalid User Data");
  }
  // res.status(200).json({ message: "User has been registered" });
});

/* @POST
Desc    Login User
@route  POST /api/users/login
@access Public 
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // console.log(user.id);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), //the decoded payload contains the id, generated @, expiration
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // res.status(200).json({ message: "User Logged in" });
});

/* @GET 
Desc    GET user data
@route  GET /api/users/me 
@access Private
*/
const getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id); //no need to do this since the user.id is set in the middleware (authMiddleware)
  res.status(200).json(req.user);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
