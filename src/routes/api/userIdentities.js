const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

const UserIdentity = require('../../models/UserIdentity');

router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  UserIdentity.findOne({ email: req.body.email }) // Promise-like, not actually a promise
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      }
      const newUser = new UserIdentity({
        name: req.body.name,
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

  UserIdentity.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          },
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
