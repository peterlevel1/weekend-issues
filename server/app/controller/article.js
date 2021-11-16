exports.index = async (ctx) => {};

exports.show = async (ctx) => {
  const { id } = ctx.params;

  const article = await ctx.app.model.Article.findOne({
    where: {
      id,
    }
  });

  ctx.body = {
    success: true,
    data: article,
    message: '',
  };  
};

exports.create = async (ctx) => {
  const { title, content } = ctx.request.body;

  const result = await ctx.app.model.Article.create({
    title,
    content
  });

  ctx.body = {
    success: true,
    data: result,
    message: '',
  };
};

exports.update = async (ctx) => {
  const { id, title, content } = ctx.request.body;

  const article = await ctx.app.model.Article.findOne({
    where: {
      id,
    }
  });

  article.title = title;
  article.content = content;
  await article.save();

  ctx.body = {
    success: true,
    data: article,
    message: '',
  };
};

exports.destroy = async (ctx) => {
  const { id } = ctx.params;

  const article = await ctx.app.model.Article.findOne({
    where: {
      id,
    }
  });

  ctx.body = {
    success: true,
    data: article,
    message: '',
  };
};
