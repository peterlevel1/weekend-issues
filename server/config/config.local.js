const configSequelize = require('./secret').db.sqlite;

module.exports = (appInfo) => {
  return {
    sequelize: {
      ...configSequelize,
    }
  };
}
