'use strict';
const fsEx = require('./node_modules/fs-extra/lib');
const path = require('path');

module.exports = app => {
  app.beforeStart(() => {
    const { config, swagger, logger } = app;
    const _static = config.static;
    const staticPath = _static.dir;
    let swaggerPath = ''
    if (typeof staticPath === 'string') {
      swaggerPath = path.join(staticPath, 'swagger');
    } else {
      swaggerPath = path.join(staticPath[config.swagger2.path], 'swagger');
    }
    if (config.swagger2.enable === false) {
      fsEx.removeSync(swaggerPath);
      logger.info('swagger-ui was disabled');
    } else {
      // 1.拷贝模版文件
      fsEx.ensureDirSync(swaggerPath);

      try {
        fsEx.copySync(path.join(__dirname, 'template/swagger'), swaggerPath);
      } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
      }
      // 2.处理swagger json对象
      // --(1)获取合并后的base
      const base = config.swagger2.base;
      // --(2)获取合并后的paths
      base.paths = swagger.paths;
      // 3.生成json文件
      fsEx.writeJsonSync(path.join(swaggerPath, 'swagger.json'), base);
      logger.info(`swagger-ui url:${base.schemes[0]}://${base.host + _static.prefix}swagger/index.html`);
    }
  });
};
