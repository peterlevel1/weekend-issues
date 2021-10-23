module.exports = (options = {}) => {
  return async (ctx) => {
    console.log(ctx.request.ip);
  }
}
