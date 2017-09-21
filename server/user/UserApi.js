const jwt = require('jsonwebtoken')

module.exports = router => {
  router.post('/api/usermanage/v1/login', (ctx, next) => {
    ctx.body = {
      data: {
        token: jwt.sign(ctx.request.body, process.env.SECRECT)
      }
    }
  })
}
