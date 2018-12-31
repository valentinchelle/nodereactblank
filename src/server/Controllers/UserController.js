const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const db = require('../models/index.js');

const Op = Sequelize.Op;
/* USED FOR UPLOADING */
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }
});

class UserController {
  authenticate(req, res) {
    upload.single('image')(req, res, err => db.User.findOne({
      where: {
        email: req.body.email
      },
      raw: true
    }).then((user) => {
      if (!user) {
        return res.status(500).send({ error: 'Email' });
      }
      if (!bcrypt.compareSync(req.body.password || '', user.password)) {
        return res.status(500).send({ error: 'Password' });
      }
      // What will be transported by the token.
      const payload = {
        email: user.email,
        id: user.id,
        role: user.role,
        time: new Date()
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '6h'
      });
      res.send({ idToken: token, profile: payload, expiresIn: '18000' });
    }));
  }

  register(req, res) {
    upload.single('image')(req, res, err => db.User.findOne({
      where: {
        [Op.or]: [
          {
            email: req.body.email
          },
          {
            username: req.body.username
          }
        ]
      },
      raw: true
    }).then((exists) => {
      if (exists) {
        return res.send({
          success: false,
          message: 'Registration failed. User with the same email or username already registered.'
        });
      }

      const user = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5))
      };

      db.User.build(user)
        .save()
        .then(() => {
          res.status(200).send();
        });

      if (!err) return res.sendStatus(200).end();
    }));
  }

  silentAuth(req, res) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token;
    if (!token) {
      return res.status(401).json({ message: 'Must pass token' });
    }

    // Check token that was passed by decoding token using secret
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) throw err;
      console.log(user.id);
      // return user using the id from w/in JWTToken
      db.User.findOne({
        where: { id: user.id },
        raw: true
      }).then((user, err) => {
        if (err) throw err;

        const payload = {
          email: user.email,
          id: user.id,
          time: new Date()
        };

        res.send({ idToken: token, profile: payload, expiresIn: '18000' });
      });
    });
  }
}

module.exports = UserController;
