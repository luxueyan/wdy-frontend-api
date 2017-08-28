const logger4 = require('./logger.js')
const glob = require('glob')
const router = require('koa-router')()

// 状态中间件
router.use(async(ctx, next) => {
  await next()
  if (ctx.body && !ctx.body.resultCode) {
    ctx.body.resultCode = 'SUCCESS'
    ctx.body.resultMsg = '成功'
  }
})

// API路由注册
const files = glob.sync(`${__dirname}/**/*Api.js`)
files.forEach(f => {
  logger4.info(`process controller: ${f}...`)
  let routes = require(f)
  routes.forEach(r => {
    try {
      router[r.method || 'all'](r.api, r.fn)
      logger4.info(`Register ${r.method} url: ${r.api}`)
    } catch (e) {
      logger4.error(`Invalid url: ${r.api}`)
    }
  })
})

module.exports = router
