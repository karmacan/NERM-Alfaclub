
////////////////////////////////////////
// DB

process.env.NODE_CONFIG_DIR = './app/config'; // set custom path for config dir

const config = require('config');
const mongoPath = config.get('mongoPath');

const mongoose = require('mongoose');
const opts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongoPath, opts)
  .then(() => { console.log('_dev_ DB connection success!') })
  .catch((err) => { console.log(`_dev_ ${err}`) });

////////////////////////////////////////
// SERVER

const express = require('express');
const server = express();
const port = 5000;

server.listen(port, () => { 
  console.log(`_dev_ App started on port ${port}!`);
});

////////////////////////////////////////
// ROUTES

server.use(express.json({extened: false})); // must be before router

const routerBase = '/api'; // router base adding to every router path
server.use(routerBase, require('./routes/router'));