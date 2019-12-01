const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const DBModelUser = require('../models/db/DBModelUser');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////
// USER
////////////////////////////////////////////////////////////////////////////////

postUsersChecks = [
  check('name', 'Name is empty!').not().isEmpty(),
  check('email', 'Invalid email format!').isEmail(),
  check('pass', 'Password is short!').isLength({min: 4})
];

////////////////////////////////////////
// POST USER (user data provided via req body)

router.post('/user', postUsersChecks, async (req, res) => {
  // Log post request body
  //console.log(req.body);
  
  // Check if req errors
  const validErrors = validationResult(req);
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

  //console.log(user.toString());

  // Save user to db
  await user.save();

  // Send result to client
  const jwtPayload = {userId: user.id};

  const config = require('config');
  const jwtPrivateKey = config.get('jwtPrivateKey');
  
  const jwtOpts = {expiresIn: 360000};

  jwt.sign(jwtPayload, jwtPrivateKey, jwtOpts, (err, token) => {
    if (err) { console.log(err); return; }
    return res.json({token}); // result send json tokened user id
  });
});

////////////////////////////////////////
// GET USER (user token provided via req header)

const verifyToken = require('../midware/router');

router.get('/user', verifyToken, async (req, res) => {
  console.log('Token varification completed!');
  const userId = req.userId;
  const user = await DBModelUser.findById(userId)/*without password*/.select('-pass');
  res.json(user)
});

module.exports = router;