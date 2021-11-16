const path = require('path');
const options = require('../config/secret').sequelizeCli.options;

module.exports = {
  development: {
    ...options,
    database: 'wi_dev',
  },
  test: {
    ...options,
    database: 'wi_test',
  },
  production: {
    ...options,
    database: 'wi_prod',
  }
};
