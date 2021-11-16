const path = require('path');
const options = require('../config/secret').sequelizeCli.options;

module.exports = {
  development: {
    ...options,
    storage: path.join(__dirname, './sqlite.db'),
  },
  test: {
    ...options,
    storage: path.join(__dirname, './sqlite_test.db'),
  },
  production: {
    ...options,
    storage: path.join(__dirname, './sqlite_prod.db'),
  }
};
