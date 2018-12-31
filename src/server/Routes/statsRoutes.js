const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const express = require('express');
const controllerClass = require('../Controllers/StatController');

const router = express.Router();
const controller = new controllerClass();
const checkAdmin = require('../Middlewares/checkadmin');

/* Put your routes here */

router.post('/set-stat/', (req, res) => controller.setStat(req, res));
router.get('/get-stat/:name', checkAdmin.checkAdmin, (req, res) => controller.getStat(req, res));
router.get(
  '/get-stat-time/:name/:startdate/:enddate/:timescale',
  checkAdmin.checkAdmin,
  (req, res) => controller.getStatTimeInterval(req, res)
);
module.exports = router;
