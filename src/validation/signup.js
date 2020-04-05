// Export function that validates a data object
const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput({
  firstName = '',
  lastName = '',
  email = '',
  password = '',
  passwordConfirm = '',
} = {}) {
  const errors = {};

  if (Validator.isEmpty(firstName)) {
    errors.firstName = 'First Name field is required';
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
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(password, passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
