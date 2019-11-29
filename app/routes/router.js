const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const DBModelUser = require('../models/db/DBModelUser');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

////////////////////////////////////////
// USERS

postUsersChecks = [
  check('name', 'Name is empty!').not().isEmpty(),
  check('email', 'Invalid email format!').isEmail(),
  check('pass', 'Password is short!').isLength({min: 4})
];

router.post('/users', postUsersChecks, async (req, res) => {
  //console.log(req.body);
  
  // Check if req errors
  const validErrors = validationResult(req);
  console.log('1 ' + validErrors.toString());
  if (!validErrors.isEmpty()) return res.status(400).json({errors: validErrors.array()});

  // Destruct req body
  const { name, email, pass } = req.body;

  // Check is user exists in db
  let user = await DBModelUser.findOne({email});
  if (user) return res.status(400).json({errors: [{msg: 'User already exists!'}]});

  // Encrypt password
  const encrypLevel = 10;
  const salt = await bcrypt.genSalt(encrypLevel);
  const encryptPass = await bcrypt.hash(pass, salt);

  // Get user gravatar
  const opts = {s: '256', d: 'mm', r: 'pg'};
  const avatar = gravatar.url(email, opts);

  // Create new user
  user = new DBModelUser({
    name,
    email,
    pass: encryptPass,
    avatar
  });

  console.log('2 ' + user.toString());

  // Save user to db
  await user.save();

  // 
  res.send('User registered!');
});

module.exports = router;