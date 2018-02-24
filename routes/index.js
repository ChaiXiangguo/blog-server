const router = require('koa-router')()

module.exports = function (app) {
  router.use('/api/user', require('../api/user').routes(), require('../api/user').allowedMethods())
  app.use(router.routes(), router.allowedMethods())
}
