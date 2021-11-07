// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCrossOrigin = require('../../../app/middleware/cross-origin');

declare module 'egg' {
  interface IMiddleware {
    crossOrigin: typeof ExportCrossOrigin;
  }
}
