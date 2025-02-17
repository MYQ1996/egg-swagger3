# egg-swagger3
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-swagger2.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-swagger2
[travis-image]: https://img.shields.io/travis/CaanDoll/egg-swagger2.svg?style=flat-square
[travis-url]: https://travis-ci.org/CaanDoll/egg-swagger2
[codecov-image]: https://img.shields.io/codecov/c/github/CaanDoll/egg-swagger2.svg?style=flat-square
[codecov-url]: https://codecov.io/github/CaanDoll/egg-swagger2?branch=master
[david-image]: https://img.shields.io/david/CaanDoll/egg-swagger2.svg?style=flat-square
[david-url]: https://david-dm.org/CaanDoll/egg-swagger2
[snyk-image]: https://snyk.io/test/npm/egg-swagger2/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-swagger2
[download-image]: https://img.shields.io/npm/dm/egg-swagger2.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-swagger2

Not in the way of annotation to generate swagger doc by swagger 2.0.Fully support the swagger syntax configuration.Recommended for use in app/router.js

## Install

```bash
$ npm i egg-swagger3 --save
```
##
多个静态文件问题
## Usage

```js
// {app_root}/config/plugin.js
exports.swagger2 = {
  enable: true,
  package: 'egg-swagger3',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.swagger2 = {
  enable:false, // disable swagger , default true
  base: {
    /* default config,support cover
    schemes: [
        'http',
    ],
    host: '127.0.0.1:7001',
    basePath: '/',
    consumes: [
    'application/json',
    ],
    produces: [
    'application/json',
    ],
    */
    info: {
      description: 'This is a test swagger-ui html',
      version: '1.0.0',
      title: 'TEST',
      contact: {
        email: 'caandoll@aliyun.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    tags: [
      {
        name: 'admin',
        description: 'Admin desc',
      },
      {
        name: 'role',
        description: 'Role desc',
      },
    ],
    definitions:{
    // model definitions
    },
    securityDefinitions:{
    // security definitions
    }
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// {app_root}/app/router.js
 module.exports = app => {
   const { router, controller, swagger } = app;
   router.post('/login', controller.test.postLogin);
   swagger.post('/login', {
       tags: [
         'admin',
       ],
       summary: 'Login a admin',
       description: '',
       parameters: [
         {
           in: 'body',
           name: 'body',
           description: 'admin\'s username & password',
           required: true,
           schema: {
             type: 'object',
             required: [ 'username', 'password' ],
             properties: {
               username: {
                 type: 'string',
                 description: 'admin\'s username',
               },
               password: {
                 type: 'string',
                 description: 'admin\'s password',
               },
             },
           },
         },
       ],
       responses: {
         200: {
           description: 'SUCCEED',
           schema: {
             type: 'object',
             properties: {
               status: {
                 type: 'string',
                 description: 'status',
               },
               data: {
                 type: 'object',
                 description: 'data',
                 properties: {
                   token: {
                     type: 'string',
                     description: 'token',
                   },
                 },
               },
             },
           },
         },
       },
     });
   router.get('/roles', controller.test.getRoles);
   swagger.get('/roles', {
     tags: [
       'role',
     ],
     summary: 'search role by page',
     description: '',
     parameters: [
       {
         in: 'query',
         name: 'name',
         description: 'role\'s name',
       },
       {
         in: 'query',
         name: 'pageIndex',
         description: 'pageIndex',
       },
       {
         in: 'query',
         name: 'pageSize',
         description: 'pageSize',
       },
     ],
     responses: {
       200: {
          description: 'SUCCEED',
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                description: 'status',
              },
              datas: {
                type: 'array',
                description: 'result datas',
                properties: {
                  token: {
                    type: 'string',
                    description: 'token',
                  },
                },
              },
              pageIndex:{
                type: 'number',
                description: 'pageIndex',
              },
              pageSize:{
                type: 'number',
                description: 'pageSize',
              },
              totalCount:{
                type: 'number',
                description: 'totalCount',
              },
            },
          },
        },
     },
   });
 };
```
- Schema configuration can be linked to definitions in config through $ref
- [For more configuration, look at the Swagger Editor example](https://editor.swagger.io/)

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## Other

* [中文文档](README.zh_CN.md)
* [Swagger website](https://www.swagger.io/)

## License

[MIT](LICENSE)
