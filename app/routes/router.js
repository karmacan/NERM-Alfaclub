const express = require('express');
const router = express.Router();

const { check } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

////////////////////////////////////////
// USERS

postUsersChecks = [
  check('name', 'Name is empty!').not().isEmpty(),
  check('email', 'Invalid email format!').isEmail(),
  check('pass', 'Password is short!').isLength({min: 4})
];

router.post('/users', postUsersChecks, (req, res) => {
  //console.log(req.body);
  
  const validErrors = validationResult(req);
  if (validErrors) {
    return res.status(400).json({errors: validErrors.array()});
  }

  res.send('Users');
});

////////////////////////////////////////
// AUTH

router.get('/auth', (req, res) => {
  res.send('Auth');
});

////////////////////////////////////////
// USERS

router.get('/posts', (req, res) => {
  res.send('Posts');
});

module.exports = router;