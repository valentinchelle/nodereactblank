const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const express = require('express');
const controllerUserAdminClass = require('../Controllers/AdminUserController');

const router = express.Router();
const controllerUserAdmin = new controllerUserAdminClass();
const checkAuth = require('../Middlewares/checkauth');

const checkAdmin = require('../Middlewares/checkadmin');
/* Put your routes here */

router.get('/listUsers/:offset/:limit/:username?', checkAdmin.checkAdmin, (req, res) => controllerUserAdmin.listUsers(req, res));
module.exports = router;
