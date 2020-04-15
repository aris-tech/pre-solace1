const bodyParser = require('body-parser');
const passport = require('passport');
const setupPassport = require('./config/passport');

function addMiddleware(app) {
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());
  setupPassport(passport);
}

module.exports = addMiddleware;
