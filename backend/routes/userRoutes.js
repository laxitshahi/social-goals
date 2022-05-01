const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

//middleware
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

/* 
Alternative syntax if there multiple http requests with the same route
- router.route("/").post(registerUser);
- router.route("/login").post(loginUser);
- router.route("/me").get(protect, getMe);
 */

module.exports = router;
