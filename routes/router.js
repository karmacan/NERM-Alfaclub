const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('Users');
});

router.get('/auth', (req, res) => {
  res.send('Auth');
});

router.get('/profile', (req, res) => {
  res.send('Profile');
});

router.get('/posts', (req, res) => {
  res.send('Posts');
});

module.exports = router;