const mongoose = require('mongoose');

// I think user auth schema should only have stuff related to auth
// todo: add first/last name, optional alias
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  providerId: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('users', UserSchema);
// module.exports = User = mongoose.model( // what is this
