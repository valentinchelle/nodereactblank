const path = require('path');
const multer = require('multer');
const db = require('../models/index.js');
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

class ArticleController {
  getArticles(req, res) {
    db.Article.findAll().then((articles) => {
      const qs = articles.map(q => ({
        id: q.id,
        title: q.title,
        description: q.content,
        image: q.image
      }));
      res.send(qs);
    });
  }

  // get a given article
  getArticle(req, res) {
    db.Article.findAll({
      where: {
        id: req.params.id
      }
    }).then((articles) => {
      if (articles.length > 1) return res.status(500).send();
      if (articles.length === 0) return res.status(404).send();
      res.send(articles[0]);
    });
  }

  // insert a new article
  postArticle(req, res) {
    upload.single('image')(req, res, (err) => {
      /* Now do where ever you want to do */
      const { title, description } = req.body;
      const uploadedFile = req.file;
      db.Article.build({ title, content: description, image: uploadedFile.path })
        .save()
        .then(() => {
          res.status(200).send();
        });

      if (!err) return res.sendStatus(200).end();
    });
  }
}

module.exports = ArticleController;
