exports.index = async (ctx) => {
  const { page, size } = ctx.query;

  const result = await ctx.app.model.Article.findAndCountAll({
    offset: (~~page - 1) * (~~size),
    limit: size
  });

  ctx.body = {
    success: true,
    data: result.rows,
    pagination: {
      total: result.count,
      size,
      page,
    }
  };
};

exports.show = async (ctx) => {
  const { id } = ctx.params;

  const article = await ctx.app.model.Article.findByPk(id);

  ctx.body = {
    success: true,
    data: article,
  };
};

exports.create = async (ctx) => {
  const { title, content } = ctx.request.body;

  const article = await ctx.app.model.Article.create({
    title,
    content
  });

  ctx.body = {
    success: true,
    data: article,
  };
};

exports.update = async (ctx) => {
  const { id, title, content } = ctx.request.body;

  const article = await ctx.app.model.Article.findByPk(id);
  if (!article) {
    ctx.body = {
      success: false,
      message: `no article for id:${id}`,
    };
    return;
  }

  article.title = title;
  article.content = content;
  await article.save();

  ctx.body = {
    success: true,
    data: article,
  };
};

exports.destroy = async (ctx) => {
  const { id } = ctx.request.body;

  const result = await ctx.app.model.Article.destroy({
    where: {
      id
    }
  });

  console.log('controller.article.destroy - result: ', result);

  ctx.body = {
    success: true,
  };
};
