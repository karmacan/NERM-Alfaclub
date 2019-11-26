////////////////////////////////////////
// SERVER

const express = require('express');
const server = express();
const port = 5000;

server.listen(port, () => { 
  console.log(`_dev_ App started on port ${port}!`);
});

////////////////////////////////////////
// DB

const config = require('config');
const mongoPath = config.get('mongoPath');

const mongoose = require('mongoose');
const opts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongoPath, opts)
  .then(() => { console.log('_dev_ DB connection success!') })
  .catch((err) => { console.log(`_dev_ ${err}`) });

////////////////////////////////////////
// ROUTES

const routerBase = '/api'; // router base adding to every router path
server.use(routerBase, require('./routes/router'));