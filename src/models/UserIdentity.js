const mongoose = require('mongoose');

// I think user auth schema should only have stuff related to auth
const UserIdentitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('userIdentities', UserIdentitySchema);
// module.exports = UserIdentity = mongoose.model( // what is this
