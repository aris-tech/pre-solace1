const jwt = require('jsonwebtoken');
const config = require('../config');

function generateJwtToken(user, cb) {
  const payload = {
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
  };

  jwt.sign(
    payload,
    config.secretOrKey,
    {
      expiresIn: 31556926, // 1 year in seconds
    },
    cb,
  );
}

module.exports = generateJwtToken;
