const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const express = require('express');
const controllerClass = require('../Controllers/UserController');

const router = express.Router();
const controller = new controllerClass();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://chellestudio.eu.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: '9D67HO7ZTytYPaz8DgPfBUjxs058SY3M', // Client id
  issuer: 'https://chellestudio.eu.auth0.com/',
  algorithms: ['RS256']
});

router.post('/register/', (req, res) => controller.register(req, res));
router.post('/login/', (req, res) => controller.authenticate(req, res));
router.post('/silentAuth/', (req, res) => controller.silentAuth(req, res));

module.exports = router;
