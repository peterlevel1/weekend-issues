const md5 = require('md5');
const key = require('../../config/secret').key;

exports.encryptPassword = (value) => {
  return md5(value + '.' + key);
}
