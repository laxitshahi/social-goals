const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

//This shorter form creates cleaner code when there are requests with the same signature
router.route("/").get(getGoals).post(setGoal);
// Instead of // router.get("/", getGoals); && router.post("/", setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);
// Instead of // router.put("/:id", updateGoal); && router.delete("/:id", deleteGoal);

module.exports = router;
