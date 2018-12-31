const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
  const token = req.headers.tokenauthorization;
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role
    };
    if (req.user.role >= 2) {
      next();
    }
    return res.status(500).send({ auth: false, message: 'You do not have the rights.' });
  });
};
module.exports = {
  checkAdmin
};
