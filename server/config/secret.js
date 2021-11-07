const md5 = require('md5');
const path = require('path');

module.exports = {
  db: {
    mysql: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root0000',
      dialect: 'mysql',
    },
    sqlite: {
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database/sqlite.db')
    }
  },
  user: {
    root: {
      password: md5('root-1212').slice(0, 16),
    }
  }
};
