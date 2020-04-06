const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateJwtToken = require('../../utils/jwt');

// Redirect to google login page
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    generateJwtToken(req.user, (err, token) => {
      res.cookie('auth', token);
      res.redirect('/home');
    });
  },
);

module.exports = router;
