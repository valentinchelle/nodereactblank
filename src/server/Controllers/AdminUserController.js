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

class AdminUserController {
  listUsers(req, res) {
    const username = '';
    if (req.params.username != undefined) {
      username = req.params.username;
    }
    console.log(username);
    const offset = 0 || req.params.offset;
    const limit = 0 || req.params.limit;
    db.User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt'],
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${username}%`
            }
          },
          {
            email: {
              [Op.like]: `%${username}%`
            }
          }
        ]
      }
    }).then((results) => {
      res.status(200).send(results);
    });
  }

  register(req, res) {
    upload.single('image')(req, res, err => db.User.findOne({
      where: {
        email: req.body.email
      },
      raw: true
    }).then((exists) => {
      if (exists) {
        return res.send({
          success: false,
          message: 'Registration failed. User with this email already registered.'
        });
      }

      const user = {
        email: req.body.email,
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
}

module.exports = AdminUserController;
