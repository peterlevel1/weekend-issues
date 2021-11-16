'use strict';

const Sequelize = require('sequelize');

const { STRING, TEXT } = Sequelize;

module.exports = (app) => {
  const Article = app.model.define('article', module.exports.getAttributes());

  return Article;
}

module.exports.getAttributes = () => ({
  title: {
    type: STRING,
    unique: true,
  },
  content: {
    type: TEXT
  }
});
