/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634957884622_4622';

  // add your middleware config here
  config.middleware = [ 'cor' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

    security: {
      csrf: {
        ignore: () => true,
      },
      cor: {
        list: [
          'http://172.20.10.4:8000'
        ],
      },
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
