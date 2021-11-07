// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBusinessCheck = require('../../../app/model/businessCheck');

declare module 'egg' {
  interface IModel {
    BusinessCheck: ReturnType<typeof ExportBusinessCheck>;
  }
}
