const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  //console.log(req.headers)
 // console.log(req.headers.connection)
  console.log(req.headers.authorization)
  const token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'bike5672', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = {
      userID: decoded.userID
    };

    next();
  });
};

module.exports = authMiddleware;
