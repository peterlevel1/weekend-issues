module.exports = (options = {}) => {
  return async (ctx, next) => {
    if (options?.ips?.includes(ctx.request.ip)) {
      ctx.set("Access-Control-Allow-Origin", '*');
      ctx.set("Access-Control-Allow-Headers", "content-type,x-requested-with");
      ctx.set("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

      // 让options尝试请求快速结束
      if (ctx.request.method.toLowerCase() == 'options') {
        ctx.status = 200;
        return;
      }
    }

    await next();
  }
}


