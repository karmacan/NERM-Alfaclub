const express = require('express');

const server = express();

const port = 5000;

server.listen(port, () => { 
  console.log(`Server started on port ${port}!`);
});

server.get('/', (req, res) => {
  res.send('Hello!');
});