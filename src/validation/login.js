const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput({
  email = '',
  password = '',
} = {}) {
  const errors = {};

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  // todo: Add extension isPassword() function

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
