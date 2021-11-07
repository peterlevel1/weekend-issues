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
  config.middleware = [ 'crossOrigin' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
        ignore: () => true,
      },
      // domainWhiteList: ['http://172.20.10.3'],
      domainWhiteList: ['*'],
    },

    cors: {
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      // origin: 'http://172.20.10.3',
      origin: '*',
    },

    crossOrigin: {
      ips: [
        '172.20.10.3'
      ],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
