'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/upload', controller.upload.main);
  router.post('/api/form/business-check.json', controller.form.businessCheck);

  router.get('/api/articles', 'article.index');
  router.get('/api/article/:id', 'article.show');
  router.post('/api/article', 'article.create');
  router.put('/api/article', 'article.update');
  router.delete('/api/article', 'article.destroy');

};
