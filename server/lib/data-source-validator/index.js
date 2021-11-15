const Sequelize = require('sequelize');
const validator = require('sequelize/lib/utils/validator-extras').validator;
const isBoolean = require('lodash/isBoolean');
const isRegExp = require('lodash/isRegExp');
const isNumber = require('lodash/isNumber');
const isObject = require('lodash/isObject');
const isString = require('lodash/isString');

const isAllUppercase = (value) => (/^[A-Z]+$/g.test(value));

class DataSourceValidator {
  constructor(attributes = {}, options = {}) {
    this.attributes = attributes;
    this.options = options;
    this.fieldNames = Object.keys(this.attributes);
    this.validator = validator;

    this.setFieldValidators();
  }

  setFieldValidators(fieldValidators = {}) {
    for (let i = 0; i < this.fieldNames.length; i += 1) {
      const fieldName = this.fieldNames[i];

      let attribute = this.attributes[fieldName] || {};

      // if (fieldName === 'age') {
      //   console.log(attribute.constructor.name);
      //   console.log("isAllUppercase(attribute.constructor.name)", isAllUppercase(attribute.constructor.name));
      //   console.log("typeof Sequelize[attribute.constructor.name] === 'function'", typeof Sequelize[attribute.constructor.name] === 'function');
      // }

      if (
        typeof attribute === 'function' || 
        (isAllUppercase(attribute.constructor.name) && typeof Sequelize[attribute.constructor.name] === 'function')
      ) {
        attribute = {
          type: attribute,
          validate: {}
        };
        // console.log('--- reset attribute ---', attribute);
      }

      const attrbuteValidator = Object.assign({}, attribute?.validate ?? attribute);

      attrbuteValidator._type = attribute.type;
      attrbuteValidator._allowNull = attribute.allowNull === undefined ? true : attribute.allowNull;

      fieldValidators[fieldName] = new FieldValidator(fieldName, attrbuteValidator, this.validator);
    }

    this.fieldValidators = fieldValidators;
  }

  async validate(dataSource = {}) {
    const errors = [];
    const fieldNames = Object.keys(dataSource);
    const promises = [];

    for (let i = 0; i < this.fieldNames.length; i += 1) {
      const fieldName = this.fieldNames[i];
      const fieldValidator = this.fieldValidators[fieldName];

      if (!fieldNames.includes(fieldName)) {
        if (!fieldValidator.attrbuteValidator._allowNull) {
          errors.push(`${fieldName}: allowNull is false, but value is missing`);
        }
        continue;
      }

      const value = dataSource[fieldName];

      
      const validatePromise = fieldValidator.validate(value);
      validatePromise.catch((err) => {
        errors.push(err);
      });

      promises.push(validatePromise);
    }

    await Promise.all(promises).catch(() => {});

    if (!errors.length) {
      return;
    }

    return errors.map(err => (err.message || err)).join(' | ');
  }
}

class FieldValidator {
  constructor(fieldName, attrbuteValidator, validator) {
    this.fieldName = fieldName;
    this.attrbuteValidator = attrbuteValidator;
    this.validator = validator;
    this.ruleNames = Object.keys(this.attrbuteValidator).filter(ruleName => !ruleName.startsWith('_'));
    this.setRuleValidators();
  }

  setRuleValidators(ruleValidators = {}) {
    for (let i = 0; i < this.ruleNames.length; i += 1) {
      const ruleName = this.ruleNames[i];
      const ruleValue = this.attrbuteValidator[ruleName];
      ruleValidators[ruleName] = new RuleValidator(ruleName, ruleValue, this.validator, this.fieldName);
    }

    this.ruleValidators = ruleValidators;
  }

  async validate(value) {
    if (value === undefined || value === null) {
      if (!this.attrbuteValidator._allowNull) {
        throw new Error(`${this.fieldName} - allowNull is false, but value is ${value}.`);
      }
      return;
    }

    const val = String(value);
    
    for (let i = 0; i < this.ruleNames.length; i += 1) {
      const ruleName = this.ruleNames[i];
      const ruleValidator = this.ruleValidators[ruleName];
      await ruleValidator.validate(val);
    }
  }
}

class RuleValidator {
  constructor(ruleName, ruleValue, validator, fieldName) {
    this.fieldName = fieldName;
    this.ruleName = ruleName;
    this.ruleValue = ruleValue;
    this.validator = validator;
    this.args = this.getArgs();
    this.msg = ruleValue.msg || '';
  }

  getArgs() {
    let args = this.ruleValue.args || this.ruleValue;
    if (!Array.isArray(args)) {
      if (isBoolean(args)) {
        args = [];
      } else if (isRegExp(args) || isObject(args) || isNumber(args) || isString(args)) {
        args = [args];
      } else {
        args = [];
      }
    }
    return [...args];
  }

  /**
   * @param {String} value the value to be tested
   */
  async validate(value) {
    const defaultValidatorFn = this.validator[this.ruleName];
    let fn = defaultValidatorFn;
    let ret;

    if (!fn) {
      if (typeof this.ruleValue !== 'function') {
        throw new Error(`${this.getErrorMsgPrefix(value)} no fn for value validating task.`);
      }

      fn = this.ruleValue;
    } else {
      fn = fn.bind(this.validator);
    }

    if (fn.constructor.name === 'AsyncFunction') {
      ret = await fn(value, ...this.args);
    } else {
      ret = fn(value, ...this.args);
    }

    if (!ret) {
      throw new Error(`${this.getErrorMsgPrefix(value)} validate failed`);
    }
  }

  getErrorMsgPrefix(value) {
    return `${this.fieldName}.${this.ruleName}: value is ${value},`
  }
}

module.exports = DataSourceValidator;
