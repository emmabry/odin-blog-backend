const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    
    try {
      // Verify the token
      const decoded = jwt.verify(bearerToken, 'secretkey');
      req.user = decoded.user;
      // Next middleware
      next();
    } catch (err) {
      // Token is invalid
      res.sendStatus(403);
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = {
  verifyToken
};