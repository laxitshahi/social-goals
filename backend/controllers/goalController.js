const asyncHandler = require("express-async-handler");
//asyncHandler allows you to use errorHandler instead of try + catch with await
/* @GET
Desc    Gets Goals
@route  GET /api/goals
@access Private (with auth)
*/
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goal" });
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
  res.status(200).json({ message: "Set Goal" });
});

/* @PUT
Desc    Update Goal
@route  PUT /api/goals/:id
@access Private (with auth)
*/
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

/* @DELETE
Desc    Delete Goal
@route  DELETE /api/goals/:id
@access Private (with auth)
*/
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
