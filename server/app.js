const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-body')
const logger = require('koa-logger')
const logger4 = require('./logger.js')
const sequelize = require('./db.js').sequelize
const router = require('./router.js')
const Boom = require('boom')
const swagger = require('swagger2')
const { validate, ui } = require('swagger2-koa')

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

// load YAML swagger file
// const document = swagger.loadDocumentSync('./swagger.yml');

const document = require('./swagger')

// validate document
if (!swagger.validateDocument(document)) {
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
}

// middlewares
app.use(bodyparser({ multipart: true }))
// app.use(validate(document)) // 不用验证这层了 维护太麻烦
app.use(ui(document, '/swagger')) // pathRoot必须指定，否则默认是/ ，所有api请求会被ui这个中间件所拦截
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
