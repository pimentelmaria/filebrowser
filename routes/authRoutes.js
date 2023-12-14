// routes/authRoutes.js

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate Google OAuth
router.get('/login/google', passport.authenticate('google'));

// Route to handle the callback after Google OAuth
router.get('/oauth2/redirect/google',
  passport.authenticate('google', {
    failureRedirect: '/login',
    failureMessage: true
  }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router;
