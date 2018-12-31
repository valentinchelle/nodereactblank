const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const express = require('express');
const controllerClass = require('../Controllers/ArticleController');

const router = express.Router();
const controller = new controllerClass();

const checkAuth = require('../Middlewares/checkauth');

router.get('/retrieveArticles/', (req, res) => controller.getArticles(req, res));
router.get('/get-article/:id', (req, res) => controller.getArticle(req, res));
router.post('/post-article/', checkAuth.checkAuth, (req, res) => controller.postArticle(req, res));
module.exports = router;
