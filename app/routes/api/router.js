const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const DBModelUser = require('../../models/db/DBModelUser');
const DBModelProfile = require('../../models/db/DBModelProfile');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////
// TOKENIZATION
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////
// SIGNUP [take data, give token] (user data provided via req body)

const userSignupChecks = [
  check('name', 'Name is empty!').not().isEmpty(),
  check('email', 'Invalid email format!').isEmail(),
  check('pass', 'Password is short!').isLength({min: 4})
];

router.post('/user/singup', userSignupChecks, async (req, res) => {
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
// LOGIN [take data, give token] (user data provided via req body)

const userLoginChecks = [
  check('email', 'Invalid email format!').isEmail(),
  check('pass', 'Password not provided!').exists()
];

router.post('/user/login', userLoginChecks, async (req, res) => {
  // Log post request body
  //console.log(req.body);
  
  // Check if req errors
  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()) return res.status(400).json({errors: validErrors.array()});

  // Destruct req body
  const { email, pass } = req.body;

  // Find user in db
  let user = await DBModelUser.findOne({email});
  if (!user) return res.status(400).json({errors: [{msg: 'User doesn\'t exist!'}]});

  // Match user password (provided plain with db encrypted)
  const isMatch = await bcrypt.compare(pass, user.pass);
  if (!isMatch) return res.status(400).json({errors: [{msg: 'Password doesn\'t match!'}]});

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

////////////////////////////////////////////////////////////////////////////////
// PRIVATE
////////////////////////////////////////////////////////////////////////////////

const verifyToken = require('../../midware/api/router');

////////////////////////////////////////
// GET USER SELF [take token, give user] (user token provided via req header)

router.get('/user/self', verifyToken, async (req, res) => {
  //console.log('Token varification completed!');
  const userId = req.userId;
  const user = await DBModelUser.findById(userId)/*without password*/.select('-pass');
  res.json(user);
});

////////////////////////////////////////
// POST PROFILE (create or update) [take token, give profile] (user token provided via req header)

const userProfileChecks = [
  check('profession', 'Profession wasn\'t provided!').not().isEmpty(),
  check('expLvl', 'Experience level wasn\'t provided!').not().isEmpty(),
  check('skills', 'Skills weren\'t provided!').not().isEmpty()
];

router.post('/user/profile', [verifyToken, userProfileChecks], async (req, res) => {
  //console.log(req.body);
  
  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()) return res.status(400).json({errors: validErrors.array()});

  // Body destruct
  const {
    profession,
    expLvl,
    skills,
    location,
    languages,
    webLinks
  } = req.body;

  // Build profile object
  const _profile = {};

  // Filed from header

  // USER
  _profile.user = req.userId;

  // Filed from body
  
  // PROFESSION
  if (profession) _profile.profession = profession;

  // EXP LVL
  if (expLvl) _profile.expLvl = expLvl;

  // SKILLS
  if (Array.isArray(skills)) {
    _profile.skills = skills;
  }
  else if (typeof skills === 'string') {
    _profile.skills = skills.split(',').map(skill => skill.trim());
  }

  // LANGUAGES
  if (Array.isArray(languages)) {
    _profile.languages = languages;
  }
  else if (typeof languages === 'string') {
    _profile.languages = languages.split(',').map(languages => languages.trim());
  }

  // LOCATION
  if (location) _profile.location = location;

  // WEB LINKS
  if (webLinks && webLinks.github) _profile.webLinks.github = webLinks.github;
  if (webLinks && webLinks.facebook) _profile.webLinks.facebook = webLinks.facebook;
  if (webLinks && webLinks.instagram) _profile.webLinks.instagram = webLinks.instagram;

  //console.log(_profile);

  // Insert profile to db

  let profile = await DBModelProfile.findOne({user: req.userId});

  if (!profile) {
    // Create profile
    profile = new DBModelProfile(_profile);
    await profile.save();
    console.log('Profile created!');
    return res.json(profile);
  }
  else {
    // Update profile
    profile = await DBModelProfile.findOneAndUpdate(
      {user: req.userId},
      {$set: _profile},
      {new: true}
    );
    console.log('Profile updated!');
    return res.json(profile);
  }
});

////////////////////////////////////////
// GET PROFILE [take token, give profile] (user token provided via req header)

router.get('/user/profile', verifyToken, async (req, res) => {
  const userId = req.userId;
  const profile = await DBModelProfile
    .findOne({user: userId})
    // Populate will expand model's origin field (user) with included fields from origin field's referenced model
    // Popolate have to be attached to findOne() request right after
    .populate(/*originField*/ 'user', /*includedFields*/ ['name', 'avatar']);
  
  if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})

  res.json(profile);
});

////////////////////////////////////////
// DELETE USER WITH PROFILE [take token] (user token provided via req header)

router.delete('/user/profile', verifyToken, async (req, res) => {
  try {
    // Remove user profile
    await DBModelProfile.findOneAndRemove({user: req.userId});
    // Remov user
    await DBModelUser.findOneAndRemove({_id: req.userId})

    return res.send('Delete user with profile complete!');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Delete user with profile server error!');
  }
});

////////////////////////////////////////
// PROFILE ADD JOB EXP [take token, return profile] (user token provided via req header)

const addJobExpChecks = [
  check('company', 'Title wasn\'t provided!').not().isEmpty(),
  check('position', 'Position wasn\'t provided!').not().isEmpty(),
  check('from', 'From date wasn\'t provided!').not().isEmpty()
];

router.put('/user/profile/job_exp', [verifyToken, addJobExpChecks], async (req, res) => {
  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()) return res.status(400).json({errors: validErrors.array()});
  
  const {
    company,
    position,
    from,
    to,
    current,
    desc
  } = req.body;

  const _jobExp = {
    company,
    position,
    from,
    to,
    current,
    desc
  };

  const profile = await DBModelProfile.findOne({user: req.userId});

  if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})

  profile.jobExp.unshift(_jobExp); // unshift == push first

  await profile.save();

  return res.json(profile);
});

////////////////////////////////////////
// PROFILE DELETE JOB EXP [take token, return profile] (user token provided via req header)

router.delete('/user/profile/job_exp/:job_exp_id', verifyToken, async (req, res) => {
  const profile = await DBModelProfile.findOne({user: req.userId});
  
  if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})

  // Retain only ids
  const jobExpIds = profile.jobExp.map(item => item._id);

  if (!jobExpIds) return res.status(400).json({errors: [{msg: 'No jobs for delete!'}]})

  // Get id index
  const targetIdIndex = jobExpIds.indexOf(req.params.job_exp_id);
  
  if (targetIdIndex == -1) return res.status(400).json({errors: [{msg: 'No target for delete!'}]})

  // Splice original
  profile.jobExp.splice(targetIdIndex, 1);

  await profile.save();

  return res.json(profile);
});

////////////////////////////////////////
// PROFILE ADD EDUCATION [take token, return profile] (user token provided via req header)

const addEducationChecks = [
  check('place', 'Place wasn\'t provided!').not().isEmpty(),
  check('majoringIn', 'Major wasn\'t provided!').not().isEmpty(),
  check('from', 'From date wasn\'t provided!').not().isEmpty()
];

router.put('/user/profile/education', [verifyToken, addEducationChecks], async (req, res) => {
  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()) return res.status(400).json({errors: validErrors.array()});
  
  const {
    place,
    majoringIn,
    from,
    to,
    current
  } = req.body;

  const _education = {
    place,
    majoringIn,
    from,
    to,
    current
  };

  const profile = await DBModelProfile.findOne({user: req.userId});

  if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})

  profile.education.unshift(_education); // unshift == push first

  await profile.save();

  return res.json(profile);
});

////////////////////////////////////////
// PROFILE DELETE EDUCATION [take token, return profile] (user token provided via req header)

router.delete('/user/profile/education/:education_id', verifyToken, async (req, res) => {
  const profile = await DBModelProfile.findOne({user: req.userId});
  
  if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})

  // Retain only ids
  const educationIds = profile.education.map(item => item._id);

  if (!educationIds) return res.status(400).json({errors: [{msg: 'No educations for delete!'}]})

  // Get id index
  const targetIdIndex = educationIds.indexOf(req.params.education_id);
  
  if (targetIdIndex == -1) return res.status(400).json({errors: [{msg: 'No target for delete!'}]})

  // Splice original
  profile.education.splice(targetIdIndex, 1);

  await profile.save();

  return res.json(profile);
});

////////////////////////////////////////////////////////////////////////////////
// PUBLIC
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////
// GET PROFILE [give one] (user id provided via req path param)

router.get('/profile/:user_id', async (req, res) => {
  try {
    let profile = await DBModelProfile
      .findOne({user: req.params.user_id})
      .populate(/*originField*/ 'user', /*includedFields*/ ['name', 'avatar']);
    
    if (!profile) return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]})  
    
    res.json(profile);
  } catch (err) {
    // Handling multiple errors (from async/await)
    console.log(err.message);
    if (err.kind == 'ObjectId') return res.status(400).json({errors: [{msg: 'Profile doesn\'t exist!'}]});
    else return res.status(500).send('Get profile by id server error!');
  }
});

////////////////////////////////////////
// GET PROFILES [give all]

router.get('/profiles', async (req, res) => {
  let profiles = await DBModelProfile
    .find()
    .populate(/*originField*/ 'user', /*includedFields*/ ['name', 'avatar']);
  res.json(profiles);
});

////////////////////////////////////////
// GET GITHUB REPOS [take github username]

// const request = require('request'); // replaced by node-fetch
const fetch = require('node-fetch');

router.get('/github/:username/repos', async (req, res) => {
  const config = require('config');
  const oauthGithubClientId = config.get('oauthGithubClientId');
  const oauthGithubClientSecret = config.get('oauthGithubClientSecret');

  const githubUsername = req.params.username;

  const urlParams = `?per_page=5&sort=created:asc&client_id=${oauthGithubClientId}&client_secret=${oauthGithubClientSecret}`;
  
  const url = `https://api.github.com/users/${githubUsername}/repos${urlParams}`;
  
  const opts = {
    // url,
    method: 'get',
    headers: {
      'user-agent': 'node.js'
    }
  }

  // request(opts, (error, response, bodyString) => {
  //   if (error) return res.status(500).send(error);
  //   if (response.statusCode === 404) return res.status(404).send('Github profile not found!');
  //   return res.json(JSON.parse(body));
  // });

  const response = await fetch(url, opts);
  if (response.status === 404) return res.status(404).send('Github profile not found!');
  const bodyJson = await response.json();
  return res.json(bodyJson);

});

module.exports = router;