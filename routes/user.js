const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const { signupForm, signupUser, loginForm, loginUser, logoutUser } = require('../controllers/users');



// Sign Up
router.get("/signup", signupForm);

router.post("/signup", signupUser);

// Login
router.get("/login", loginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), loginUser);

// Logout
router.get("/logout", logoutUser)

module.exports = router;