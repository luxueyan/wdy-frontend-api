const logger4 = require('./logger.js')
const glob = require('glob')
const router = require('koa-router')()
const jwt = require('koa-jwt')
const redisConn = require('./redis.js')

// Custom 401 handling if you don't want to expose koa-jwt errors to users
router.use(async(ctx, next) => {
  await next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 200
      ctx.body = { code: 401, message: '权限失效' }
    } else {
      throw err
    }
  })
})

// 权限验证
router.use(jwt({
  secret: process.env.SECRECT,
  // passthrough: true, // 是否需要token
  getToken(ctx) { // 获取token方式
    const req = ctx.request
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token']
    } else if (req.query && req.query.token) {
      return req.query.token
    }
    return null
  },
  isRevoked(ctx, payload) { // 判断token是否失效
    const isExpired = Date.now() / 1000 - payload.iat > 86400
    // console.log('-----', ctx.state, payload)
    return Promise.resolve(isExpired)
  }
}).unless({ path: ['/api/usermanage/v1/login'] }))

// 状态中间件
router.use(async(ctx, next) => {
  const req = ctx.request
  const redisInst = await redisConn() // 使用redis缓存接口
  if (redisInst) {
    const resp = await redisInst.getAsync(req.url)

    if (resp) {
      ctx.body = JSON.parse(resp)
      logger4.info('get data from redis cache')
    } else {
      await next()
      if (ctx.body && !ctx.body.resultCode) {
        ctx.body.resultCode = 'SUCCESS'
        ctx.body.resultMsg = '成功'
      }
      if (req.method === 'GET' && ctx.body.resultCode === 'SUCCESS') {
        await redisInst.set(req.url, JSON.stringify(ctx.body), 'EX', 10)
        logger4.info(req.url + 'get data from redis')
      }
    }
  }
})

// API路由注册
const files = glob.sync(`${__dirname}/**/*Api.js`)
files.forEach(f => {
  logger4.info(`process controller: ${f}...`)
  let routes = require(f)
  routes(router)
  // routes.forEach(r => {
  //   try {
  //     router[r.method || 'all'](r.api, r.fn)
  //     logger4.info(`Register ${r.method} url: ${r.api}`)
  //   } catch (e) {
  //     logger4.error(`Invalid url: ${r.api}`)
  //   }
  // })
})

module.exports = router
