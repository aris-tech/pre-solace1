const express = require('express');
const router = express.Router();
const passport = require('passport');

// Redirect to google login page
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(req.user);
  },
);

module.exports = router;
