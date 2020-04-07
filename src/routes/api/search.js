const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const searchResults = [
      {
        name: 'test1',
      },
      {
        name: 'test2',
      },
      {
        name: 'work on this a bit later',
      },
    ];

    return res.json(searchResults);
  },
);

module.exports = router;
