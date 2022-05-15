const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

//middleware
const { protect } = require("../middleware/authMiddleware");

//This shorter form creates cleaner code when there are requests with the same signature

router.route("/").get(protect, getGoals).post(protect, setGoal);
// Instead of // router.get("/", getGoals); && router.post("/", setGoal);

// router.get("/global", getGlobal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);
// Instead of // router.put("/:id", updateGoal); && router.delete("/:id", deleteGoal);

module.exports = router;
