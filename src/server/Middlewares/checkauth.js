const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.headers.tokenauthorization;
  console.log(req.headers);
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.user = {
      login: decoded.login,
      id: decoded.id
    };

    next();
  });
};
module.exports = {
  checkAuth
};
