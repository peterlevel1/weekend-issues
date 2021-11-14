'use strict';

// const validator = require('sequelize/lib/utils/validator-extras').validator;
// const ValidationError = require('./validation-error');
// const DataTypes = require('sequelize/lib/data-types');

// const ValidationErrorItem = ValidationError.ValidationErrorItem;
// const { promisify } = require('util');
// const _ = require('lodash');
// const Utils = require('./utils');

const _ = require('lodash');
const Utils = require('./utils');
const sequelizeError = require('./errors');
const DataTypes = require('./data-types');
// const BelongsTo = require('./associations/belongs-to');
const validator = require('./utils/validator-extras').validator;
const { promisify } = require('util');

/**
 * Instance Validator.
 *
 * @param {Instance} modelInstance The model instance.
 * @param {object} options A dictionary with options.
 *
 * @private
 */
class DataSourceValidator {
  // definitions: to be validated
  constructor(attributes = {}) {
  // constructor(modelInstance, options = {}) {
    // options = {
    //   // assign defined and default options
    //   // hooks: true,
    //   ...options
    // };

    this.fields = Object.keys(attributes);

    // if (options.fields && !options.skip) {
    //   options.skip = _.difference(keys, options.fields);
    // } else {
    //   options.skip = options.skip || [];
    // }
    // this.options = options;
    // this.modelInstance = modelInstance;

    this.attributes = attributes;

    this.validators = this.fields.reduce((memo, key) => {
      const attribute = attributes[key];
      memo[key] = attribute?.validate ?? attribute;
      return memo;
    }, {});

    /**
     * Exposes a reference to validator.js. This allows you to add custom validations using `validator.extend`
     *
     * @name validator
     * @private
     */
    this.validator = validator;

    /**
     *  All errors will be stored here from the validations.
     *
     * @type {Array} Will contain keys that correspond to attributes which will
     *   be Arrays of Errors.
     * @private
     */
    this.errors = [];

    /**
     * @type {boolean} Indicates if validations are in progress
     * @private
     */
    this.inProgress = false;
  }

  /**
   * The main entry point for the Validation module, invoke to start the dance.
   * 
   * @param {Object} dataSource the data source to be validated
   * @returns {Promise}
   * @public
   */
  async validate(dataSource) {
    if (this.inProgress) throw new Error('Validations already in progress.');

    this.inProgress = true;

    // await Promise.all([
    //   this._perAttributeValidators(),
    //   this._customValidators()
    // ]);
    await this._perAttributeValidators(dataSource);

    if (this.errors.length) {
      // throw new sequelizeError.ValidationError(null, this.errors);
      throw new ValidationError(null, this.errors);
    }
  }

  // /**
  //  * Invoke the Validation sequence and run validation hooks if defined
  //  *   - Before Validation Model Hooks
  //  *   - Validation
  //  *   - On validation success: After Validation Model Hooks
  //  *   - On validation failure: Validation Failed Model Hooks
  //  *
  //  * @returns {Promise}
  //  * @private
  //  */
  // async validate() {
  //   // return await (this.options.hooks ? this._validateAndRunHooks() : this._validate());
  //   return this._validate();
  // }

  // /**
  //  * Invoke the Validation sequence and run hooks
  //  *   - Before Validation Model Hooks
  //  *   - Validation
  //  *   - On validation success: After Validation Model Hooks
  //  *   - On validation failure: Validation Failed Model Hooks
  //  *
  //  * @returns {Promise}
  //  * @private
  //  */
  // async _validateAndRunHooks() {
  //   const runHooks = this.modelInstance.constructor.runHooks.bind(this.modelInstance.constructor);
  //   await runHooks('beforeValidate', this.modelInstance, this.options);

  //   try {
  //     await this._validate();
  //   } catch (error) {
  //     const newError = await runHooks('validationFailed', this.modelInstance, this.options, error);
  //     throw newError || error;
  //   }

  //   await runHooks('afterValidate', this.modelInstance, this.options);
  //   return this.modelInstance;
  // }

  /**
   * Will run all the validators defined per attribute (built-in validators and custom validators)
   *
   * @returns {Promise<Array>}
   * @private
   */
  async _perAttributeValidators(dataValues = {}) {
    // promisify all attribute invocations
    const validators = [];

    const keys = Object.keys(dataValues);

    for (var i = 0; i < this.fields.length; i += 1) {
      const field = this.fields[i];

      if (!keys.includes(file)) {
        continue;
      }

      const value = dataValues[field];

      validators.push(this._singleAttrValidate(value, field));
    }
    _.forIn(this.modelInstance.rawAttributes, (rawAttribute, field) => {
      if (!this.fields.includes(field)) {
        return;
      }

      // const value = this.modelInstance.dataValues[field];
      const value = dataValues[field];

      // if (value instanceof Utils.SequelizeMethod) {
      //   return;
      // }

      // if (!rawAttribute._autoGenerated && !rawAttribute.autoIncrement) {
      //   // perform validations based on schema
      //   this._validateSchema(rawAttribute, field, value);
      // }

      // if (Object.prototype.hasOwnProperty.call(this.modelInstance.validators, field)) {
      //   validators.push(this._singleAttrValidate(value, field, rawAttribute.allowNull));
      // }
    });

    return await Promise.all(validators);
  }

  // /**
  //  * Will run all the custom validators defined in the model's options.
  //  *
  //  * @returns {Promise<Array>}
  //  * @private
  //  */
  // async _customValidators() {
  //   const validators = [];
  //   _.each(this.modelInstance.constructor.options.validate, (validator, validatorType) => {
  //     if (this.options.skip.includes(validatorType)) {
  //       return;
  //     }

  //     const valprom = this._invokeCustomValidator(validator, validatorType)
  //       // errors are handled in settling, stub this
  //       .catch(() => {});

  //     validators.push(valprom);
  //   });

  //   return await Promise.all(validators);
  // }

  /**
   * Validate a single attribute with all the defined built-in validators and custom validators.
   *
   * @private
   *
   * @param {*} value Anything.
   * @param {string} field The field name.
   * @param {boolean} allowNull Whether or not the schema allows null values
   *
   * @returns {Promise} A promise, will always resolve, auto populates error on this.error local object.
   */
  async _singleAttrValidate(value, field, allowNull) {
    // // If value is null and allowNull is false, no validators should run (see #9143)
    // if ((value === null || value === undefined) && !allowNull) {
    //   // The schema validator (_validateSchema) has already generated the validation error. Nothing to do here.
    //   return;
    // }

    // Promisify each validator
    const validators = [];
    // 字段的validate对象: this.modelInstance.validators[field]
    _.forIn(this.modelInstance.validators[field], (test, validatorType) => {

      if (validatorType === 'isUrl' || validatorType === 'isURL' || validatorType === 'isEmail') {
        // Preserve backwards compat. Validator.js now expects the second param to isURL and isEmail to be an object
        if (typeof test === 'object' && test !== null && test.msg) {
          test = {
            msg: test.msg
          };
        } else if (test === true) {
          test = {};
        }
      }

      // Custom validators should always run, except if value is null and allowNull is false (see #9143)
      if (typeof test === 'function') {
        validators.push(this._invokeCustomValidator(test, validatorType, true, value, field));
        return;
      }

      // If value is null, built-in validators should not run (only custom validators have to run) (see #9134).
      if (value === null || value === undefined) {
        return;
      }

      const validatorPromise = this._invokeBuiltinValidator(value, test, validatorType, field);
      // errors are handled in settling, stub this
      validatorPromise.catch(() => {});
      validators.push(validatorPromise);
    });

    return Promise
      .all(validators.map(validator => validator.catch(rejection => {
        const isBuiltIn = !!rejection.validatorName;
        this._pushError(isBuiltIn, field, rejection, value, rejection.validatorName, rejection.validatorArgs);
      })));
  }

  /**
   * Prepare and invoke a custom validator.
   *
   * @private
   *
   * @param {Function} validator The custom validator.
   * @param {string} validatorType the custom validator type (name).
   * @param {boolean} optAttrDefined Set to true if custom validator was defined from the attribute
   * @param {*} optValue value for attribute
   * @param {string} optField field for attribute
   *
   * @returns {Promise} A promise.
   */
  async _invokeCustomValidator(validator, validatorType, optAttrDefined, optValue, optField) {
    let isAsync = false;

    const validatorArity = validator.length;
    // check if validator is async and requires a callback
    let asyncArity = 1;
    let errorKey = validatorType;
    let invokeArgs;
    if (optAttrDefined) {
      asyncArity = 2;
      invokeArgs = optValue;
      errorKey = optField;
    }
    if (validatorArity === asyncArity) {
      isAsync = true;
    }

    if (isAsync) {
      try {
        if (optAttrDefined) {
          // return await promisify(validator.bind(this.modelInstance, invokeArgs))();
          return await promisify(validator.bind(this, invokeArgs))();
        }
        return await promisify(validator.bind(this))();
      } catch (e) {
        return this._pushError(false, errorKey, e, optValue, validatorType);
      }
    }

    try {
      return await validator.call(this, invokeArgs);
    } catch (e) {
      return this._pushError(false, errorKey, e, optValue, validatorType);
    }
  }

  /**
   * Prepare and invoke a build-in validator.
   *
   * @private
   *
   * @param {*} value Anything.
   * @param {*} test The test case.
   * @param {string} validatorType One of known to Sequelize validators.
   * @param {string} field The field that is being validated
   *
   * @returns {object} An object with specific keys to invoke the validator.
   */
  async _invokeBuiltinValidator(value, test, validatorType, field) {
    // Cast value as string to pass new Validator.js string requirement
    const valueString = String(value);
    // check if Validator knows that kind of validation test
    if (typeof validator[validatorType] !== 'function') {
      throw new Error(`Invalid validator function: ${validatorType}`);
    }

    const validatorArgs = this._extractValidatorArgs(test, validatorType, field);

    if (!validator[validatorType](valueString, ...validatorArgs)) {
      throw Object.assign(new Error(test.msg || `Validation ${validatorType} on ${field} failed`), { validatorName: validatorType, validatorArgs });
    }
  }

  /**
   * Will extract arguments for the validator.
   *
   * @param {*} test The test case.
   * @param {string} validatorType One of known to Sequelize validators.
   * @param {string} field The field that is being validated.
   *
   * @private
   */
  _extractValidatorArgs(test, validatorType, field) {
    let validatorArgs = test.args || test;
    const isLocalizedValidator = typeof validatorArgs !== 'string' && (validatorType === 'isAlpha' || validatorType === 'isAlphanumeric' || validatorType === 'isMobilePhone');

    if (!Array.isArray(validatorArgs)) {
      if (validatorType === 'isImmutable') {
        // validatorArgs = [validatorArgs, field, this.modelInstance];
        throw new Error(`${field}: validator type is isImmutable, which is not supported`);
      } else if (isLocalizedValidator || validatorType === 'isIP') {
        validatorArgs = [];
      } else {
        validatorArgs = [validatorArgs];
      }
    } else {
      validatorArgs = validatorArgs.slice(0);
    }
    return validatorArgs;
  }

  // /**
  //  * Will validate a single field against its schema definition (isnull).
  //  *
  //  * @param {object} rawAttribute As defined in the Schema.
  //  * @param {string} field The field name.
  //  * @param {*} value anything.
  //  *
  //  * @private
  //  */
  _validateSchema(rawAttribute, field, value) {
    //   if (rawAttribute.allowNull === false && (value === null || value === undefined)) {
    //     const association = Object.values(this.modelInstance.constructor.associations).find(association => association instanceof BelongsTo && association.foreignKey === rawAttribute.fieldName);
    //     if (!association || !this.modelInstance.get(association.associationAccessor)) {
    //       const validators = this.modelInstance.validators[field];
    //       const errMsg = _.get(validators, 'notNull.msg', `${this.modelInstance.constructor.name}.${field} cannot be null`);

    //       this.errors.push(new sequelizeError.ValidationErrorItem(
    //         errMsg,
    //         'notNull Violation', // sequelizeError.ValidationErrorItem.Origins.CORE,
    //         field,
    //         value,
    //         this.modelInstance,
    //         'is_null'
    //       ));
    //     }
    //   }

    if (rawAttribute.type instanceof DataTypes.STRING || rawAttribute.type instanceof DataTypes.TEXT || rawAttribute.type instanceof DataTypes.CITEXT) {
      if (Array.isArray(value) || _.isObject(value) && !(value instanceof Utils.SequelizeMethod) && !Buffer.isBuffer(value)) {
        this.errors.push(new sequelizeError.ValidationErrorItem(
          `${field} cannot be an array or an object`,
          'string violation', // sequelizeError.ValidationErrorItem.Origins.CORE,
          field,
          value,
          this.modelInstance,
          'not_a_string'
        ));
      }
    }
  }

  /**
   * Signs all errors retaining the original.
   *
   * @param {boolean}       isBuiltin   - Determines if error is from builtin validator.
   * @param {string}        errorKey    - name of invalid attribute.
   * @param {Error|string}  rawError    - The original error.
   * @param {string|number} value       - The data that triggered the error.
   * @param {string}        fnName      - Name of the validator, if any
   * @param {Array}         fnArgs      - Arguments for the validator [function], if any
   *
   * @private
   */
  _pushError(isBuiltin, errorKey, rawError, value, fnName, fnArgs) {
    const message = rawError.message || rawError || 'Validation error';
    const error = new ValidationErrorItem(
      message,
      'Validation error', // ValidationErrorItem.Origins.FUNCTION,
      errorKey,
      value,
      this.modelInstance,
      fnName,
      isBuiltin ? fnName : undefined,
      isBuiltin ? fnArgs : undefined
    );

    error[DataSource.RAW_KEY_NAME] = rawError;

    this.errors.push(error);
  }
}

class AttributeValidator {
  constructor(attribute = {}) {
    this.attribute = attribute;
  }

  validate(value) {

  }
}


/**
 * The error key for arguments as passed by custom validators
 *
 * @type {string}
 * @private
 */
DataSource.RAW_KEY_NAME = 'original';

module.exports = DataSource;
module.exports.DataSource = DataSource;
module.exports.default = DataSource;
