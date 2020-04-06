const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const validateSignupInput = require('../../utils/validation/signup');
const validateLoginInput = require('../../utils/validation/login');
const generateJwtToken = require('../../utils/jwt');

const User = require('../../models/User');

router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }) // Promise-like, not actually a promise
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      }
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user)) // Send new user json response back
            .catch((err) => console.log(err));
        });
      });
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        generateJwtToken(user, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
