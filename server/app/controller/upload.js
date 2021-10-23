const fs = require('fs');
const path = require('path');
const os = require('os');
const uuidv4 = require('uuid').v4;

const DIR_TMP = path.join(__dirname, '../public/tmp');

exports.main = async (ctx) => {
  const fileStream = await ctx.getFileStream();
  const name = `${uuidv4()}-${fileStream.filename}`;
  const filenameAbs = path.join(DIR_TMP, name);
  const writeStream = fs.createWriteStream(filenameAbs);

  fileStream.pipe(writeStream);

  ctx.body = {
    success: true,
    data: {
      pathname: `/public/tmp/${name}`,
    },
  }
};
