'use strict';

// load modules
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

var jsonParser = require("body-parser").json

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(jsonParser());

// CORS
var corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization']
  // origin: 'http://example.com',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fsjstd-restapi');

var db = mongoose.connection;

db.on('error', function (err){
    console.error('Connection error:', err);
});

db.once('open', function (){
    console.log('db connection successful')
});

// TODO setup your api routes here
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    error: {},
  });
  console.log(err.stack)
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
