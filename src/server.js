const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const userIdentities = require('./routes/api/userIdentities');

const app = express();

function addMiddleware(app) {
  // Parse url-encoded body(key/value pairs typically found in a form, url-encoded means like the pairs found in string query)
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  // Parse json
  app.use(bodyParser.json());
  // Adds properties to let you figure out if the user is authenticated or not
  app.use(passport.initialize());
}
addMiddleware(app);
require('./config/passport')(passport);
function addRoutes(app) {
  // place this in routes\index.js
  app.use('/api/userIdentities', userIdentities);
}
addRoutes(app);

const connectionString = require('./config/keys').mongoUri;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is up and running on port ${port}!`),
);
