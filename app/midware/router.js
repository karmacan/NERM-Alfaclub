const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function verifyToken(req, res, next) {
  // Get token from req
  const token = req.header('user-token'); // user token assinged in url request header (in other way it could be assing for example in url request param)

  // Check if no token
  if (!token) return res.status(401).json({msg: 'Token was not provided!'});

  try {
    // Verify token (throws err if not verified)
    const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
    
    // Add user to req
    req.userId = decodedToken.userId;

    next();
  }
  catch (err) {
    return res.status(401).json({msg: 'Token is not valid!'});
  }
}