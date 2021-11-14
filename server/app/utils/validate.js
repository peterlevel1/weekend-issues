
/**
 * 
 * e.g. 
 * definition: 
 * {
 *   username: {
 *     validate: {
 *       len: [1, 2],
 *       isEmail: true
 *     }
 *   }
 * }
 * 
 * data: 
 * {
 *   username: 'hello_world'
 * }
 * @param {Object} definition meta definition to be validated
 * @param {Object} data the data to be validated by the definition
 */
function validate(definition, data) {

}

exports.validator = validator;
exports.validate = validate;
