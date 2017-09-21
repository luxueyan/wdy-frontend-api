const redis = require('redis')
const bluebird = require('bluebird')
const redisConfig = require('config').get('redis')
const logger4 = require('./logger.js')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
let redisInst = null // redis 实例

function redisCreate(opt, cb) {
  const client = redis.createClient(opt)
  bluebird
  client.on('connect', () => {
    logger4.info('redis connect success')
    cb(null, client)
  })
  client.on('error', err => {
    cb(err, null)
  })
}

module.exports = function redisConn() {
  if (redisInst) return Promise.resolve(redisInst)
  else {
    return new Promise((resolve, reject) => {
      redisCreate(redisConfig, (err, client) => {
        if (err) reject(err)
        redisInst = client
        resolve(client)
      })
    })
  }
}
