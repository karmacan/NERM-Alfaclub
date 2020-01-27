
////////////////////////////////////////
// DB

process.env.NODE_CONFIG_DIR = './backend/config'; // set custom path for config dir

const config = require('config');
const mongoPath = config.get('mongoPath');

const mongoose = require('mongoose');
const opts = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(mongoPath, opts)
  .then(() => { console.log('_dev_ DB connection success!') })
  .catch((err) => { console.log(`_dev_ ${err}`) });

////////////////////////////////////////
// SERVER

const express = require('express');
const server = express();
const port = 5000;

////////////////////////////////////////
// ENABLE CORS (from frontend [localhost:3000] to backend [localhost:5000])

const cors = require('cors'); // allows to set cors res header (Access-Control-Allow-Origin)
server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // set cors res header to all (*)
  next();
});

////////////////////////////////////////
// ROUTES (API)

// Allows access to req.body within request handler (express.json() ~~ bodyparser.json())
server.use(express.json({extended: false})); // must be before router

// Separate router and set its router base (to every path)
const routerBase = '/api';
server.use(routerBase, require('./routes/api/router'));

////////////////////////////////////////
// HEROKU (production)

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  // Set frontend static folder
  server.use(exp.static('client/build'));
  // Serve frontend buld
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
  });
}

server.listen(port, () => {
  console.log(`_dev_ App started on port ${port}!`);
});