const Sequelize = require('sequelize');
const defaults = require('lodash/defaults');
const cloneDeep = require('lodash/cloneDeep');

const { STRING } = Sequelize;

const fields = {};

// allowNull=true
// defaultValue=null

fields.username = {
  type: STRING(30),
  allowNull: false,
};

fields.password = {
  type: STRING(20),
  allowNull: false,
  validate: {
    min: 6,
    max: 20
  }
};

fields.phone = {
  type: STRING(11),
  validate: {
    isPhone: true,
  }
};

fields.email = {
  type: STRING(30),
  validate: {
    isEmail: true,
  }
};

const fieldController = {
  getField(name) {
    const field = fields[name];

    if (!field) {
      throw new Error(`no field for ${name}`);
    }

    return cloneDeep(defaults({ allowNull: true }, field));
  },

  getFields(names = []) {
    return names.reduce((memo, name) => ({ ...memo, [name]: fieldController.getField(name) }), {});
  },

  validateFields(fields = {}) {
    const names = Object.keys(fields);

    for (let i = 0; i <= names.length; i += 1) {
      const name = names[i];
      const value = fields[name];
      const field = fieldController.getField(name);
      
    }
  }
};

module.exports = fieldController;
