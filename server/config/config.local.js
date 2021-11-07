const configSequelize = require('./secret').sequelize;

module.exports = (appInfo) => {
  return {
    sequelize: {
      ...configSequelize,
      database: 'wi-dev',
    }
  };
}
