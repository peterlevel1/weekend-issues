const fs = require('fs');
const path = require('path');
const os = require('os');
const uuidv4 = require('uuid').v4;

const DIR_TMP = path.join(__dirname, '../public/tmp');

exports.main = async (ctx) => {
  // ctx.logger.info('controller - upload.main: ctx.request.files.file', ctx.request.files.file);
  ctx.logger.info('controller - upload.main: typeof ctx.getFileStream', typeof ctx.getFileStream);
  ctx.logger.info('controller - upload.main: ctx.request.files', ctx.request.files);
  ctx.logger.info('controller - upload.main: ctx.request.body', ctx.request.body);
  ctx.logger.info('controller - upload.main: ctx.request', ctx.request);
  
  const fileStream = await ctx.getFileStream();
  
  const name = uuidv4();
  const filename = path.join(DIR_TMP, name);
  const writeStream = fs.createWriteStream(filename);

  fileStream.pipe(writeStream);

  ctx.body = {
    success: true,
    data: {
      url: `/tmp/${name}`,
    },
  }
};
