const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
// const index = require('./routes/index')
// const users = require('./routes/users')
const config = require('./config')
// error handler
onerror(app)
mongoose.Promise = require('bluebird') // 使用bluebird的promise而非mongoose包自带的
mongoose.connect(config.mongo.uri, config.mongo.options) // 连接数据库
require('./common/load.model')
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// auth middlewares
app.use(require('./middlewares/token.resolve'))
// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
require('./routes')(app)
module.exports = app
