/**
 *  Model Articles
 * @param {*} sequelize
 * @param {*} DataTypes
 */
const Article = require('./Article');

const Category = (sequelize, DataTypes) => sequelize.define(
  'Category', // name of Model
  {
    // fields
    title: DataTypes.STRING,
    description: DataTypes.STRING
  },
  {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Article);
      }
    }
  }
);

module.exports = Category;
