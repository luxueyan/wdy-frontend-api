const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('koa-logger')
const logger4 = require('./logger.js')
const sequelize = require('./db.js').sequelize
const router = require('./router.js')
const Boom = require('boom')

// mysql connect authenticate
sequelize.authenticate()
  .then(() => {
    seq = sequelize
    logger4.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger4.error('Unable to connect to the database:', err)
  })

// error handler
onerror(app)

// middlewares
app.use(bodyparser)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'jade'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger4.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// router
app.use(router.routes(), router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

module.exports = app
