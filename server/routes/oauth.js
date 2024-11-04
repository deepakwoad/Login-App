const express = require("express");
const passport = require("passport");
const router = express.Router();

// @route    GET /api/oauth/google
// @desc     Redirect to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route    GET /api/oauth/google/callback
// @desc     Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to frontend or return JWT
    res.redirect("/dashboard"); // Redirect to your desired route
  }
);

module.exports = router;
