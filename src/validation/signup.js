// Export function that validates a data object
const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput({
  name = '',
  email = '',
  password = '',
  passwordConfirm = '',
} = {}) {
  const errors = {};

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  // todo: Add extension isPassword() function

  if (Validator.isEmpty(passwordConfirm)) {
    errors.passwordConfirm = 'Confirm password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
