const path = require('path');
const config = require('../config/secret').db.sqlite;

module.exports = {
  development: {
    ...config,
    database: 'wi_dev',
  },
  test: {
    ...config,
    database: 'wi_test',
  },
  production: {
    ...config,
    database: 'wi_prod',
  }
};
