const express = require('express');
const mongoose = require('mongoose');
const addRoutes = require('./routes/index');
const addMiddleware = require('./middleware');
const connectionString = require('./config').mongoUri;

// -- Configure App --
const app = express();
addMiddleware(app);
addRoutes(app);

// -- Configure connection to MongoDB --
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

// -- Host server --
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is up and running on port ${port}!`),
);
