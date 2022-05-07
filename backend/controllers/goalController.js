const asyncHandler = require("express-async-handler");
//asyncHandler allows you to use errorHandler instead of try + catch with await

//import Models
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
/* @GET
Desc    Gets Goals
@route  GET /api/goals 
@access Private (with auth)
*/
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); //the value of _id(object) can be accessed using id(string)
  if (goals.length === 0) {
    res.status(400);
    // throw new Error("No goals available");
  }
  res.status(200).json(goals);
});

/* @POST
Desc    Post Goal
@route  POST /api/goal
@access Private (with auth)
*/
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

/* @PUT
Desc    Update Goal
@route  PUT /api/goals/:id
@access Private (with auth)
*/
const updateGoal = asyncHandler(async (req, res) => {
  // const goal = await Goal.findById(req.params.id); //go back //no need to do this since the user.id is set in the middleware (authMiddleware)

  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist.");
  }

  const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  //Ensure the goal and user id match for the user making the request
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201);

  res.status(200).json(updatedGoal);
});

/* @DELETE
Desc    Delete Goal
@route  DELETE /api/goals/:id
@access Private (with auth)
*/
const deleteGoal = asyncHandler(async (req, res) => {
  //assign that specifc "goal" to goal const
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist.");
  }

  // const user = await User.findById(req.user.id);  //no need to do this since the user.id is set in the middleware (authMiddleware)

  if (!req.user) {
    res.status(401);
    throw new Error("User not found.");
  }

  //Ensure the goal and user id match for the user making the request
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //no need to find by id, just remove the goal
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
