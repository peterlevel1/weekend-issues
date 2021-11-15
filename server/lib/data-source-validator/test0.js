const Sequelize = require('sequelize');
const DataSourceValidator = require('./index');

const { STRING } = Sequelize;

const dv = new DataSourceValidator({
  age: {
    type: STRING(10),
    validate: {
      min: 2
    }
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      len: [3, 5]
    }
  },
  email: {
    isEmail: true
  },
  uid: {
    isInt: true,
  },
  province: {
    is: /^ZheJiang|HeiLongJiang$/
  },
  city: {
    allowNull: false,
    validate: {
      validateCityName(value) {
        return value === 'HangZhou';
      }
    }
  }
});

// console.log('dv', dv);
;(async () => {
  const ret = await dv.validate({
    age: 1.2,
    username: 'asasa',
    email: 'bbb@163.com',
    uid: 2,
    province: 'ZheJiang',
    city: 'HangZhou'
  });
  console.log('ret', ret);
})();
