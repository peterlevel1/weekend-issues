'use strict';

const Sequelize = require('sequelize');

const { STRING, TEXT } = Sequelize;

module.exports = (app) => {
  const Article = app.model.define(
    'article', 
    getAttributes(), 
    getOptions()
  );

  return Article;
}

const getAttributes = () => ({
  title: {
    type: STRING,
  },
  content: {
    type: TEXT
  }
});

const getOptions = () => ({
  paranoid: true,
});

module.exports.getAttributes = getAttributes;
module.exports.getOptions = getOptions;
