const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express()
const routes = require('./routes/index')
const dontenv = require('dotenv')
const passport = require('passport');
const errorHandler = require('errorhandler');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

dontenv.config({path: './config.env'})
const uri = process.env.MONGODB_URI
require('./helpers/passport');

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(passport.initialize());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use(
  bodyParser.json({
    extended: true,
    limit: '50mb',
  }),
);

app.use(cors());
app.use(helmet({contentSecurityPolicy: false}));
app.use(logger('dev'));

if (process.env.NODE_ENV !== 'production') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_, res) => {
  res.json({version: "0.1"})
})

app.use('/api', routes())

app.listen(4000, () => {
  console.log("Server running on localhost 4000");
})
