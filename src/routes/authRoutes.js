const express = require("express");
const {
  handleSignup,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(handleSignup);

router.route("/login").post(handleLogin);

router.route("/refresh").post(handleRefreshToken);

router.route("/logout").post(handleLogout);

module.exports = router;
