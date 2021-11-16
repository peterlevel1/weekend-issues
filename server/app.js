'use strict';

// 启动自定义
// 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）
// 配置文件加载完成（configDidLoad）
// 文件加载完成（didLoad）
// 插件启动完毕（willReady）
// worker 准备就绪（didReady）
// 应用启动完成（serverDidReady）
// 应用即将关闭（beforeClose）

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
  }

  async willReady() {
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
  }

  async didReady() {
    // 请将您的 app.ready 中的代码置于此处。
    await this.app.model.sync();
  }
}

module.exports = AppBootHook;
