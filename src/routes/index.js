const users = require('./api/users');
const search = require('./api/search');
const google = require('./auth/google');

module.exports = (app) => {
  app.use('/api/users', users);
  app.use('/api/search', search);
  app.use('/auth', google);
};
