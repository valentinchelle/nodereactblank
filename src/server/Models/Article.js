const Category = require('./Category');

const Article = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article', // name of Model
    {
      // fields
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.TEXT, is: ['^[a-z]{10,}$', 'i'] },
      image: { type: DataTypes.STRING }
    },
    {
      getterMethods: {}
    },
    {
      classMethods: {
        associate: (models) => {
          Article.belongsTo(models.Category, {
            as: 'category'
          });
        }
      }
    }
  );
  return Article;
};

module.exports = Article;
