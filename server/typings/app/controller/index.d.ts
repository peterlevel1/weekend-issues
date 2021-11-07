// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportForm = require('../../../app/controller/form');
import ExportHome = require('../../../app/controller/home');
import ExportUpload = require('../../../app/controller/upload');

declare module 'egg' {
  interface IController {
    form: ExportForm;
    home: ExportHome;
    upload: ExportUpload;
  }
}
