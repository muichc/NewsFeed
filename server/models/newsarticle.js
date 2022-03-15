'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newsArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  newsArticle.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    source: DataTypes.STRING,
    image: DataTypes.STRING,
    source: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'newsArticle',
  });
  return newsArticle;
};